// importa o pg e o express
const express = require('express');
const {Pool} = require('pg');

// importa o path
const path = require('path');

// cria uma aplicação express
const app = express();

// define a porta 
const port = 3000;

// informa o acesso ao pg
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'vagarapida',
    password: 'BemVindo!',
    port: 5432,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// rota para html principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// rota para cadastrar os veículos
app.post('/veiculos', async (req, res) => {
    const { payload } = req.body;

    const queryText = 'INSERT INTO veiculos (placa, proprietario, tipo, entrada, saida, valor) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    
    try {
        const results = [];

        for (const entry of payload.data) {
            const values = [entry.placa, entry.proprietario, entry.tipo, entry.entrada, entry.saida, entry.valor];
            const result = await pool.query(queryText, values);
            results.push(result.rows[0]);
        }

        res.status(201).json(results);
    } catch (err) {
        res.status(500).send('Erro ao cadastrar o veículo');
    }
});

app.listen(port, () => {
    console.log(`Servidor iniciado na porta http://localhost:${port}`);
})
