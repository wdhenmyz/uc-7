function adicionarVeiculoNaTabela(novoVeiculo) {
    const tabela = document.getElementById('parkingTableBody');
    const linha = document.createElement('tr');

    linha.innerHTML = `
        <td>${novoVeiculo.placa}</td>
        <td>${novoVeiculo.tipo}</td>
        <td>${novoVeiculo.dono}</td>
        <td>${novoVeiculo.entrada}</td>
        <td>${novoVeiculo.saida}</td>
        <td>${novoVeiculo.valor}</td>
    `;

    tabela.appendChild(linha);
}

async function carregarVeiculos() {
    try {
        const response = await fetch(`http://localhost:3000/diario`);
        const veiculos = await response.json();
        veiculos.forEach(adicionarVeiculoNaTabela);
    } catch (error) {
        console.error('Erro ao carregar os veículos: ', error);
    }
}

// Chamar a funcionalidade para carregar os veículos estacionados
window.onload = carregarVeiculos;