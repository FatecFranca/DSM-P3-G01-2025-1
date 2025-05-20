require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
const mongoUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017';
const dbName = 'bookhub';

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static('uploads'));

let db;

// Conectar ao MongoDB
MongoClient.connect(mongoUrl)
  .then(client => {
    console.log('Conectado ao MongoDB');
    db = client.db(dbName);
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

app.post('/api/clientes', async (req, res) => {
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

// Rota para cadastrar novo livro
app.post('/api/livros', upload.single('capa'), async (req, res) => {
  try {
    console.log('Body:', req.body);
    console.log('File:', req.file);
    const livroData = { ...req.body, capa: req.file ? req.file.filename : null };
    const collection = db.collection('livros');
    const resultado = await collection.insertOne(livroData);
    res.status(201).json({ ...livroData, _id: resultado.insertedId });
  } catch (error) {
    console.error('Erro ao cadastrar livro:', error);
    res.status(500).json({ error: 'Erro ao processar cadastro do livro' });
  }
});

// Rota para listar todos os livros cadastrados
app.get('/api/livros', async (req, res) => {
  try {
    const collection = db.collection('livros');
    const livros = await collection.find().toArray();
    res.json(livros);
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
