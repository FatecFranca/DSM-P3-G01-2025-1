const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'bookhub';

app.use(cors());
app.use(bodyParser.json());

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
