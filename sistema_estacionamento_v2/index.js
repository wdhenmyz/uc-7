const express = require('express');
const app = express();
const estacionamento = require('./data/estacionamento');
const diario = require('./data/diario')

const PORT = 3000

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// retorna todos os veículos
app.get('/estacionar', (req, res) => {
    res.json(estacionamento);
});

// cria um novo veículo
app.post('/estacionar', (req, res) => {
    const novoVeiculo = req.body;
    // Melhor prática: Gerar ID único
    novoVeiculo.id = Date.now();
    estacionamento.push(novoVeiculo);
    res.status(201).json(novoVeiculo);
});

// retorna os veículos no array diário
app.get('/diario', (req, res) => {
    res.json(diario)
})