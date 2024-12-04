const express = require('express');
const app = express();

// Middleware para JSON
app.use(express.json());

// CONFIGURAÇÃO DAS ROTAS 

// pegar todos os usuários
const usuarios = require('../preload/usuários');
app.use(usuarios);

// Configuração da rota GET para login
const login = require('../preload/login');
app.use(login);

// Endpoint GET para buscar todos os veículos cadastrados
const entrada = require('../preload/carregar_Entrada');
app.use(entrada);

// Rota GET para buscar todos os veículos da coleção 'saida'
const saida = require('../preload/carregar_Saida');
app.use(saida);

// Rota GET para buscar um veículo pelo ID
const veiculoId = require('../preload/veiculo_id');
app.use(veiculoId);

// Rota GET para buscar um veículo pelos parâmetros de consulta
const consultarCarros = require('../preload/consultar_Carros');
app.use(consultarCarros);



// Rota POST para cadastrar um novo veículo
const cadastrarEntrada = require('../preload/cadastrar_entrada');
app.use(cadastrarEntrada);

// Rota POST para mover dados para a coleção 'saida'
const cadastrarSaida = require('../preload/cadastrar_Saida');
app.use(cadastrarSaida);



// Rota DELETE para excluir um veículo
const deletarEntrada = require('../preload/deletar_veiculo');
app.use(deletarEntrada);

// Rota DELETE para apagar todos os documentos da coleção `saida`
const deletarSaida = require('../preload/deletar_Saida');
app.use(deletarSaida);


// Rota PATCH para registrar a saída do veículo
const registrarSaida = require('../preload/registrar_saida');
app.use(registrarSaida);

module.exports = app;