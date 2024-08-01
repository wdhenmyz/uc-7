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

app.post('/veiculos', async(req,res) => {
    const {payload} = req.body;

    const queryText = 'INSERT INTO veiculos (placa, proprietario, tipo, entrada, saida, valor) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [payload]; 

    try {
        const result = await pool.query(queryText,values);
        res.status(201).json(result.rows[0]);
    } catch (err){
        res.status(500).send('Erro ao cadastrar o veículo');
    }
})

app.listen(port, () => {
    console.log(`Servidor iniciado na porta http://localhost:${port}`);
})
