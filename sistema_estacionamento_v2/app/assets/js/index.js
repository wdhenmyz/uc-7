document.getElementById('parkingForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    // coleta os dados do formulário
    const placa = document.getElementById('plate').value;
    const dono = document.getElementById('owner').value;
    const tipo = document.querySelector('input[name="value-radio"]:checked')?.value;

    if (!tipo) {
        alert('Por favor, selecione o tipo de veículo');
        return;
    }

    const novoVeiculo = {
        placa: placa,
        dono: dono,
        tipo: tipo,
        entrada: new Date().toLocaleString()
    };

    // envia os dados para o servidor
    try {
        const response = await fetch(`http://localhost:3000/estacionar`, { // Substitua 3000 pela porta correta
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoVeiculo)
        });

        if (response.ok) {
            alert('Veículo estacionado com sucesso!');
            adicionarVeiculoNaTabela(novoVeiculo);
            document.getElementById('parkingForm').reset();
        } else {
            alert('Erro ao estacionar o veículo');
        }

    } catch (error) {
        console.error('Erro: ', error);
    }
});

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
        <td><button onclick="removerVeiculo(botao)">Registrar saída</button></td>
    `;

    tabela.appendChild(linha);
}

async function carregarVeiculos() {
    try {
        const response = await fetch(`http://localhost:3000/estacionar`);
        const veiculos = await response.json();
        veiculos.forEach(adicionarVeiculoNaTabela);
    } catch (error) {
        console.error('Erro ao carregar os veículos: ', error);
    }
}

// Chamar a funcionalidade para carregar os veículos estacionados
window.onload = carregarVeiculos;


// remover veículos e enviar para o diário
function removerVeiculo(botao) {
    const linha = botao.parentElement.parentElement; // Obtenha a linha da tabela onde o botão foi clicado
    const placa = linha.cells[0].innerText; // Coleta a placa do veículo
    const tipo = linha.cells[1].innerText; // Coleta o tipo do veículo
    const dono = linha.cells[2].innerText; // Coleta o nome do dono
    const entrada = linha.cells[3].innerText; // Coleta a data de entrada

    // Coleta a data e hora de saída atual
    const saida = new Date().toLocaleString();

    // Cria o objeto do veículo com os dados necessários
    const veiculoComSaida = {
        placa: placa,
        tipo: tipo,
        dono: dono,
        entrada: entrada,
        saida: saida,
        valor: calcularValor(entrada, saida) // Função para calcular o valor da estadia
    };

    // Envia os dados para o servidor para adicionar ao array diário
    fetch(`http://localhost:3000/diario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(veiculoComSaida)
    })
    .then(response => {
        if (response.ok) {
            alert('Veículo registrado no diário com sucesso!');
            linha.remove(); // Remove a linha da tabela de veículos estacionados
        } else {
            alert('Erro ao registrar a saída do veículo');
        }
    })
    .catch(error => {
        console.error('Erro: ', error);
    });
}

// Função para calcular o valor baseado na diferença entre entrada e saída
function calcularValor(entrada, saida) {
    const dataEntrada = new Date(entrada);
    const dataSaida = new Date(saida);
    const horas = Math.ceil((dataSaida - dataEntrada) / (1000 * 60 * 60)); // Diferência em horas
    const taxaPorHora = 5; // Supondo uma taxa de R$5 por hora
    return horas * taxaPorHora;
}

