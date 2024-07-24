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
    database: 'banco',
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

//rota para cadastrar um veículo
app.post('/veiculos', async(req,res) => {
    const {marca,modelo,ano} = req.body;

    const queryText = 'INSERT INTO veiculos (marca, modelo , ano) VALUES ($1, $2, $3) RETURNING *';
    const values = [marca,modelo,ano]

    try {
        const result = await pool.query(queryText,values);
        res.status(201).json(result.rows[0]);
    } catch (err){
        res.status(500).send('Erro ao cadastrar o veículo');
    }
});

// rota para consultar os veículos
app.get('/veiculos', async(req,res) => {
    try {
        const result = await pool.query('SELECT * FROM veiculos');
        res.json(result.rows);
    } catch (err) {
        res.status(400).send(err)
    }
});

app.listen(port, () => {
    console.log(`Servidor iniciado na porta http://localhost:${port}`);
})

