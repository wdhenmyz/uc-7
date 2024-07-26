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
    database: 'loja',
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


// rotas de cadastro
//rota para cadastrar um produto
app.post('/loja', async(req,res) => {
    const {nome, fabricante, modelo, ano, descricao, preco} = req.body;

    const queryText = 'INSERT INTO produtos (nome, fabricante , modelo, ano, descricao, preco) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [nome, fabricante, modelo, ano, descricao, preco]

    try {
        const result = await pool.query(queryText,values);
        res.status(201).json(result.rows[0]);
    } catch (err){
        res.status(500).send('Erro ao cadastrar os produtos');
    }
});

//rota para cadastrar um funcionário
app.post('/loja', async(req,res) => {
    const {nome, nascimento, celular, endereco, sexo, funcao} = req.body;

    const queryText = 'INSERT INTO funcionarios (nome, nascimento, celular, endereco, sexo, funcao) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [nome, nascimento, celular, endereco, sexo, funcao]

    try {
        const result = await pool.query(queryText,values);
        res.status(201).json(result.rows[0]);
    } catch (err){
        res.status(500).send('Erro ao cadastrar o funcionario');
    }
});

//rota para cadastrar um cliente
app.post('/loja', async(req,res) => {
    const {nome, nascimento, celular, endereco, sexo} = req.body;

    const queryText = 'INSERT INTO clientes (nome, nascimento, celular, endereco, sexo, ) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [nome, nascimento, celular, endereco, sexo]

    try {
        const result = await pool.query(queryText,values);
        res.status(201).json(result.rows[0]);
    } catch (err){
        res.status(500).send('Erro ao cadastrar o cliente');
    }
});
// fim das rotas de cadastro


app.listen(port, () => {
    console.log(`Servidor iniciado na porta http://localhost:${port}`);
})
