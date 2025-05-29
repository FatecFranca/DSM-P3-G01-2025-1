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
import fs from 'fs';

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

// Função para upload para o Google Drive
async function uploadToDrive(filePath, fileName) {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'backend/drive-credentials.json', // ajuste o caminho se necessário
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });
  const drive = google.drive({ version: 'v3', auth });
  const fileMetadata = {
    name: fileName,
    parents: ['1W1c4GrXCvslcR8zziKeaNdS3ZaraMZBJ'], // ID da sua pasta no Drive
  };
  const media = {
    mimeType: 'image/jpeg', // ou o tipo correto
    body: fs.createReadStream(filePath),
  };
  const response = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id,webContentLink',
  });
  return response.data.webContentLink;
}

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
      genero = req.body.genero || req.body.categoria || 'Outros',
      preco = 0,
      quantidade = 1,
      sinopse = req.body.descricao || req.body.sinopse || '',
    } = req.body;

    let capaUrl = '';
    if (req.file) {
      // Salva o nome do arquivo local para servir via /uploads
      capaUrl = req.file.filename;
      // Opcional: tente enviar para o Drive, mas não dependa disso para cadastrar
      try {
        await uploadToDrive(req.file.path, req.file.originalname);
      } catch (err) {
        console.warn('Falha ao enviar para o Google Drive:', err.message);
      }
    }

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
        capa: capaUrl
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
    let livro = await prisma.livros.findUnique({ where: { id } });
    if (!livro) livro = await prisma.livros.findFirst({ where: { isbn: id } });
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
    res.json(livro);
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
        nota: req.body.nota || null
      }
    });
    res.status(201).json(avaliacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar avaliação', details: error.message });
  }
});

// --- NOVO: Cadastro de autor ---
app.post('/api/autores', upload.single('foto'), async (req, res) => {
  try {
    const { nome } = req.body;
    let foto = '';
    if (req.file) {
      foto = `/uploads/${req.file.filename}`;
    }
    // Salva o autor no banco de dados
    const autor = await prisma.autor.create({
      data: { nome, foto }
    });
    res.status(201).json(autor);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar autor', details: error.message });
  }
});

// Listar autores
app.get('/api/autores', async (req, res) => {
  try {
    const autores = await prisma.autor.findMany();
    res.json(autores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar autores', details: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
