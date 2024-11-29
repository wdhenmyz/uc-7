import { saida } from "./registrarSaida.js";

async function procurar(queryString) {

    try {
        const response = await fetch(`http://localhost:3000/api/entrada${queryString}`);
    
        if (!response.ok) {
            throw new Error("Erro ao buscar dados dos veículos");
        }
    
        const vehicles = await response.json();
        const tableBody = document.getElementById('parkingTableBody');
        tableBody.innerHTML = ''; // Limpa o conteúdo da tabela antes de adicionar novos dados
    
        // Verifica se há veículos e popula a tabela
        if (vehicles.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="7">Nenhum veículo encontrado</td>`;
            tableBody.appendChild(row);
        } else {
            vehicles.forEach(vehicle => {
                const row = document.createElement('tr');
                const entrada = vehicle.entrada ? new Date(vehicle.entrada).toLocaleString() : 'N/A';
                const saida = vehicle.saida ? new Date(vehicle.saida).toLocaleString() : 'N/A';
    
                // Atualizar o valor total (se necessário)
                const valorNumerico = Number(vehicle.valor) || 0;
    
                row.innerHTML = `
                    <td>${vehicle.placa}</td>
                    <td>${vehicle.tipo}</td>
                    <td>${vehicle.dono}</td>
                    <td>${entrada}</td>
                    <td>${saida}</td>
                    <td>${valorNumerico.toFixed(2)}</td>
                    <td><button class="saida-button" data-id="${vehicle.id}">Saída</button></td>
                `;
    
                tableBody.appendChild(row);
            });
        }

        // Adicionar event listeners para os botões de saída
        document.querySelectorAll('.saida-button').forEach(button => {
            button.addEventListener('click', async (e) => {
                const vehicleId = e.target.getAttribute('data-id');
                await saida(vehicleId);
                e.target.parentElement.parentElement.remove();
            });
        });

    } catch (error) {
        console.error("Erro ao carregar os veículos:", error);
    }
}


export { procurar };