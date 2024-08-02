const express = require('express');
const { Pool } = require('pg');

const path = require('path');

const app = express();

const port = 3000;

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'Loja_nova',
    password: 'BemVindo!',
    port: 5432,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


app.post('/produto', async(req, res) => {
    const { nome, fabricante, modelo, ano, descricao, quantidade, preco } = req.body;

    const queryText = 'INSERT INTO produto (nome, fabricante, modelo, ano, descricao, quantidade, preco) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [nome, fabricante, modelo, ano, descricao, quantidade, preco];

    try {
        const result = await pool.query(queryText, values);
        res.status(201).json(result.rows[0]);
    }catch (err){
        res.status(500).send('Erro interno ao processar solicitação');
    }
});

app.get('/produto', async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM produto');
        res.json(result.rows);
    } catch (err) {
        res.status(400).send(err)
    }
});

app.post('/cliente', async(req, res) => {
    const { nome, data_nascimento, numero_telefone, endereco, sexo} = req.body;

    const queryText = 'INSERT INTO cliente (nome, data_nascimento, numero_telefone, endereco, sexo) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [nome, data_nascimento, numero_telefone, endereco, sexo];

    try {
        const result = await pool.query(queryText, values);
        res.status(201).json(result.rows[0]);
    }catch (err){
        res.status(500).send('Erro interno ao processar solicitação');
    }
});

app.get('/cliente', async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cliente');
        res.json(result.rows);
    } catch (err) {
        res.status(400).send(err)
    }
});

app.post('/funcionario', async(req, res) => {
    const { nome, data_nascimento, numero_telefone, endereco, sexo, funcao } = req.body;

    const queryText = 'INSERT INTO funcionario (nome, data_nascimento, numero_telefone, endereco, sexo, funcao) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [nome, data_nascimento, numero_telefone, endereco, sexo, funcao];

    try {
        const result = await pool.query(queryText, values);
        res.status(201).json(result.rows[0]);
    }catch (err){
        res.status(500).send('Erro interno ao processar solicitação');
    }
});

app.get('/funcionario', async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cliente');
        res.json(result.rows);
    } catch (err) {
        res.status(400).send(err)
    }
});

app.listen(port, () => {
    console.log(`Servidor iniciado na porta http://localhost:${port}`);
});