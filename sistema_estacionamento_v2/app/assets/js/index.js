const port = require('../../../port')
const PORT = port.PORT;

document.getElementById('parkingForm').addEventListener('submit', async function (e) {
    e.preventDefault(); //impedir o envio do formulário

    // coleta os dados do formulário
    const plate = document.getElementById('plate').value;
    const owner = document.getElementById('onwer').value;
    const tipo = document.getElementById('input[name="value-radio"]:checked').value;
    if (!tipo) {
        alert('por favor, selecione o tipo de veículo');
        return;
    }

    const novoVeiculo = {
        placa: plate,
        dono: owner,
        tipo: tipo,
        entrada: new Date().toLocaleString()
    }

    // envia os dados para o servidor
    try {
        const response = await fetch(`http:localhost:${PORT}/estacionar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoVeiculo)
        });

        if (response.ok) {
            alert('veículo estacionado com sucesso!');
            //adicionarVeiculoNaTabela(novoVeiculo);
            document.getElementById('parkingForm').request();
        } else {
            alert('Erro ao estacionar o veículo');
        }

    } catch (error) {
        console.error('Erro: ', error)
    }
})