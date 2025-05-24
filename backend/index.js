import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
// Prisma Client import para output customizado
import prismaGenerated from './generated/prisma/index.js';
const { PrismaClient } = prismaGenerated;
import { MongoClient } from 'mongodb';

const upload = multer({ dest: 'uploads/' });
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta uploads
// Corrige path para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB para clientes e avaliações
const mongoUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017';
const dbName = 'bookhub';
let db;
MongoClient.connect(mongoUrl)
  .then(client => {
    console.log('Conectado ao MongoDB');
    db = client.db(dbName);
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

app.post('/api/clientes', async (req, res) => {
  if (!db) {
    return res.status(503).json({ error: 'Banco de dados não conectado. Tente novamente em instantes.' });
  }
  try {
    const collection = db.collection('clientes');
    // Verificar se o email já existe
    const emailExistente = await collection.findOne({ email: req.body.email });
    if (emailExistente) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    // Verificar se o CPF já existe
    const cpfExistente = await collection.findOne({ cpf: req.body.cpf });
    if (cpfExistente) {
      return res.status(400).json({ error: 'CPF já cadastrado' });
    }
    // Inserir novo cliente
    const resultado = await collection.insertOne(req.body);
    res.status(201).json({ ...req.body, _id: resultado.insertedId });
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({ error: 'Erro ao processar cadastro' });
  }
});

// Rota para buscar cliente por e-mail (login)
app.get('/api/clientes', async (req, res) => {
  if (!db) {
    return res.status(503).json({ error: 'Banco de dados não conectado. Tente novamente em instantes.' });
  }
  try {
    const collection = db.collection('clientes');
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'Email é obrigatório' });
    const user = await collection.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

// Rota para cadastrar novo livro usando Prisma
app.post('/api/livros', upload.single('capa'), async (req, res) => {
  try {
    // Aceita campos do frontend e converte para o model Livro
    const titulo = req.body.titulo || req.body.nome || 'Livro sem título';
    const autor = req.body.autor || 'Autor desconhecido';
    const editora = req.body.editora || 'Editora desconhecida';
    const isbn = req.body.isbn || String(Date.now()); // Gera um ISBN fake se não vier
    const ano = req.body.ano ? parseInt(req.body.ano) : new Date().getFullYear();
    const genero = req.body.genero || req.body.categoria || 'Outros';
    const preco = req.body.preco ? parseFloat(req.body.preco) : 0;
    const quantidade = req.body.quantidade ? parseInt(req.body.quantidade) : 1;
    const sinopse = req.body.sinopse || req.body.descricao || '';
    const capa = req.file ? req.file.filename : '';

    // Validação mínima
    if (!titulo || !autor || !editora || !isbn || !genero || !preco) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
    }

    const livro = await prisma.livro.create({
      data: {
        titulo,
        autor,
        editora,
        isbn,
        ano,
        genero,
        preco,
        quantidade,
        sinopse,
        capa,
      },
    });
    res.status(201).json(livro);
  } catch (error) {
    console.error('Erro ao cadastrar livro:', error);
    res.status(500).json({ error: 'Erro ao processar cadastro do livro', details: error.message });
  }
});

// Rota para listar todos os livros cadastrados usando Prisma
app.get('/api/livros', async (req, res) => {
  try {
    const livros = await prisma.livro.findMany();
    res.json(livros);
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

// Rota para buscar livro por id (Prisma ou MongoDB)
app.get('/api/livros/:id', async (req, res) => {
  const { id } = req.params;
  // Tenta buscar pelo Prisma (id padrão)
  try {
    let livro = await prisma.livro.findUnique({ where: { id } });
    if (!livro) {
      // Se não encontrar, tenta buscar pelo _id (caso MongoDB)
      livro = await prisma.livro.findFirst({ where: { id } });
    }
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
    res.json(livro);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar livro', details: error.message });
  }
});

// Rota para avaliações de livros
app.get('/api/livros/:id/avaliacoes', async (req, res) => {
  try {
    const collection = db.collection('avaliacoes');
    const avaliacoes = await collection.find({ livroId: req.params.id }).toArray();
    res.json(avaliacoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar avaliações' });
  }
});

app.post('/api/livros/:id/avaliacoes', async (req, res) => {
  try {
    const collection = db.collection('avaliacoes');
    const avaliacao = {
      livroId: req.params.id,
      texto: req.body.texto,
      data: new Date()
    };
    await collection.insertOne(avaliacao);
    res.status(201).json(avaliacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar avaliação' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

