// Função para buscar os veículos da coleção 'saida' e mostrar na tabela
async function getVehiclesFromExit() {
    try {
        const response = await fetch('http://localhost:3000/api/saida');
        const vehicles = await response.json();

        if (!response.ok) {
            throw new Error("Erro ao buscar dados da coleção 'saida'");
        }

        // Preenche a tabela com os dados retornados
        const tableBody = document.getElementById('parkingTableBody');
        tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar os dados

        vehicles.forEach(vehicle => {
            // Converte os timestamps para data e hora legíveis
            const entryTime = vehicle.entrada ? new Date(vehicle.entrada.seconds * 1000).toLocaleString() : '';
            const exitTime = vehicle.saida ? new Date(vehicle.saida.seconds * 1000).toLocaleString() : '';

            // Cria uma nova linha na tabela para cada veículo
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${vehicle.placa}</td>
                <td>${vehicle.tipo}</td>
                <td>${vehicle.dono}</td>
                <td>${entryTime}</td>
                <td>${exitTime}</td>
                <td>${vehicle.valor}</td>
            `;
            // Adiciona a linha à tabela
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao buscar dados da coleção 'saida':", error);
    }
}

// Chama a função para carregar os dados quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    getVehiclesFromExit();
});
