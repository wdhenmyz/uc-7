































/* importa o pg e o express
const express = require('express');
const {Pool} = require('pg');

// importa o path
const path = require('path');

// cria uma aplicação express
const app = express();

// define a porta 
const port = 3000;

const { POOL } = require('./conection');

// informa o acesso ao pg
const pool = new Pool({
    user: POOL.user,
    host: POOL.host,
    database: POOL.database,
    password: POOL.password,
    port: POOL.port,
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
    try {
        const { payload } = req.body;

        if (!payload || !Array.isArray(payload.data)) {
            return res.status(400).send('Invalid request body');
        }

        const insertVeiculos = async (entry) => {
            const values = [entry.placa, entry.proprietario, entry.tipo, entry.entrada, entry.saida, entry.valor];
            const queryText = 'INSERT INTO veiculos (placa, proprietario, tipo, entrada, saida, valor) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
            const result = await pool.query(queryText, values);
            return result.rows[0];
        };

        const results = await Promise.all(payload.data.map(insertVeiculos));

        res.status(201).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao cadastrar o veículo');
    }
});

app.listen(port, () => {
    console.log(`Servidor iniciado na porta http://localhost:${port}`);
})
*/
