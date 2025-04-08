const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(cors())
app.use(bodyParser.json())


app.post('/api/clientes', async (req, res) => {
  try {
    
    const emailExistente = await prisma.cliente.findUnique({
      where: { email: req.body.email }
    })
    
    if (emailExistente) {
      return res.status(400).json({ error: 'Email já cadastrado' })
    }

    
    const cpfExistente = await prisma.cliente.findUnique({
      where: { cpf: req.body.cpf }
    })
    
    if (cpfExistente) {
      return res.status(400).json({ error: 'CPF já cadastrado' })
    }

    
    const cliente = await prisma.cliente.create({
      data: req.body
    })

    res.status(201).json(cliente)
  } catch (error) {
    console.error('Erro ao criar cliente:', error)
    res.status(500).json({ error: 'Erro ao processar cadastro' })
  }
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})