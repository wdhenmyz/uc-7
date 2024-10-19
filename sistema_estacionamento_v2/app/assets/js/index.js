const express = require('express');
const PORT = 3000;

document.getElementById('parkingForm').addEventListener('submit', async function (e) {
    e.preventDefault(); //impedir o envio do formulário

    // coleta os dados do formulário
    const placa = document.getElementById('plate').value;
    const dono = document.getElementById('owner').value;
    const tipo = document.querySelector('input[name="value-radio"]:checked')?.value;

    if (!tipo) {
        alert('por favor, selecione o tipo de veículo');
        return;
    }

    const novoVeiculo = {
        placa: placa,
        dono: dono,
        tipo: tipo,
        entrada: new Date().toLocaleString()
    }

    // envia os dados para o servidor
    try {
        const response = await fetch(`http://localhost:${PORT}/estacionar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoVeiculo)
        });

        if (response.ok) {
            alert('veículo estacionado com sucesso!');
            adicionarVeiculoNaTabela(novoVeiculo);
            document.getElementById('parkingForm').reset();
        } else {
            alert('Erro ao estacionar o veículo');
        }

    } catch (error) {
        console.error('Erro: ', error)
    }
})

function adicionarVeiculoNaTabela(novoVeiculo) {
    const tabela = document.getElementById('parkingTableBody');
    const linha = document.createElement('tr');

    linha.innerHTML = `
        <td>${novoVeiculo.placa}</td>
        <td>${novoVeiculo.tipo}</td>
        <td>${novoVeiculo.dono}</td>
        <td>${novoVeiculo.entrada}</td>
        <td></td>
        <td></td>
        <td><button onlick="removerVeiculo(this)">registrar saida</button></td>
    `;

    tabela.appendChild(linha);
}

// função para carregar os veículos estacionados
async function carregarVeiculos() {
    try {
        const response = await fetch('http://localhost:${PORT}/estacionados');
        const veiculos = await response.json();
        veiculos.forEach(adicionarVeiculoNaTabela)
    } catch (error) {
        console. error('Erro ao carregar os veículos: ', error)
    }
}

// chamar a funcionalidade para carregar os veículos estacionados
window.onload = carregarVeiculos