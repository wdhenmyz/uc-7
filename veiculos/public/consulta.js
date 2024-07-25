// garantir que o DOM esteja carregado, antes de carregar o conteúdo
document.addEventListener("DOMContentLoaded", () => {
    carregarVeiculo();

    // carrega o formulário
    const form = document.getElementById('formConsulta');
    // cria uma função para carregar o veiculo
    form.addEventListener('submit', async(e) => {
        e.preventDefault();
        carregarVeiculo();
    })
});

// traz os veiculos
async function carregarVeiculo() {
    // captura os valores do form
    try {
        const response = await fetch('/veiculos');
        const data = await response.json();

        // captura a tabela
        const tabelaVeiculos = document.getElementById('tabelaVeiculos');
        // carrega as informacoes
        tabelaVeiculos.innerHTML = '';

        // cria uma linha para cada veiculo
        data.forEach(veiculo => {
            const row = document.createElement('tr');
            // adiciona as informações
            row.innerHTML = `
                <td>${veiculo.id}</td>
                <td>${veiculo.marca}</td>
                <td>${veiculo.modelo}</td>
                <td>${veiculo.ano}</td>
            `;
            // adiciona na tabela
            tabelaVeiculos.appendChild(row);
        });
    } catch(error) {
        console.error('Erro ao buscar veiculos', error);
    }
}