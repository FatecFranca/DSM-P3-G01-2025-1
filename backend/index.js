import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const upload = multer({ dest: 'uploads/' });
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Corrige __dirname para ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rota para cadastrar cliente
app.post('/api/clientes', async (req, res) => {
  try {
    const { nome, email, senha, cpf, logradouro, num_casa, complemento, bairro, cidade, uf, cep, celular } = req.body;

    // Corrigido: usa prisma.clientes (minúsculo e plural, igual ao schema.prisma)
    const emailExistente = await prisma.clientes.findFirst({ where: { email } });
    if (emailExistente) return res.status(400).json({ error: 'Email já cadastrado' });

    const cpfExistente = await prisma.clientes.findFirst({ where: { cpf } });
    if (cpfExistente) return res.status(400).json({ error: 'CPF já cadastrado' });

    const cliente = await prisma.clientes.create({
      data: { nome, email, senha, cpf, logradouro, num_casa, complemento, bairro, cidade, uf, cep, celular }
    });

    res.status(201).json(cliente);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({ error: 'Erro ao processar cadastro' });
  }
});

// Buscar cliente por e-mail
app.get('/api/clientes', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email é obrigatório' });

  try {
    // Corrigido: usa prisma.clientes
    const user = await prisma.clientes.findFirst({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário', details: error.message });
  }
});

// Cadastro de livro
app.post('/api/livros', upload.single('capa'), async (req, res) => {
  try {
    const {
      titulo = req.body.nome || 'Livro sem título',
      autor = 'Autor desconhecido',
      editora = 'Editora desconhecida',
      isbn = String(Date.now()),
      ano = new Date().getFullYear(),
      genero = req.body.categoria || 'Outros',
      preco = 0,
      quantidade = 1,
      sinopse = req.body.descricao || '',
    } = req.body;

    const capa = req.file ? req.file.filename : '';

    const livro = await prisma.livros.create({
      data: {
        titulo,
        autor,
        editora,
        isbn,
        ano: parseInt(ano),
        genero,
        preco: parseFloat(preco),
        quantidade: parseInt(quantidade),
        sinopse,
        capa
      },
    });

    res.status(201).json(livro);
  } catch (error) {
    console.error('Erro ao cadastrar livro:', error);
    res.status(500).json({ error: 'Erro ao processar cadastro do livro', details: error.message });
  }
});

// Listar livros
app.get('/api/livros', async (req, res) => {
  try {
    const livros = await prisma.livros.findMany();
    res.json(livros);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

// Buscar livro por ID ou ISBN
app.get('/api/livros/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Verifica se o id é um ObjectId válido (24 caracteres hexadecimais)
    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
      // Tenta buscar por ISBN se não for um ObjectId válido
      const livro = await prisma.livros.findFirst({ where: { isbn: id } });
      if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
      return res.json(livro);
    } else {
      let livro = await prisma.livros.findUnique({ where: { id } });
      if (!livro) livro = await prisma.livros.findFirst({ where: { isbn: id } });
      if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
      return res.json(livro);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar livro', details: error.message });
  }
});

// Avaliações
app.get('/api/livros/:id/avaliacoes', async (req, res) => {
  try {
    const avaliacoes = await prisma.Avaliacao.findMany({ where: { livroId: req.params.id } });
    res.json(avaliacoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar avaliações' });
  }
});

app.post('/api/livros/:id/avaliacoes', async (req, res) => {
  try {
    const avaliacao = await prisma.Avaliacao.create({
      data: {
        livroId: req.params.id,
        texto: req.body.texto,
        nota: req.body.nota || null,
        data: new Date()
      }
    });
    res.status(201).json(avaliacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar avaliação' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
