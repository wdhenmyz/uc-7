// Função para exibir pop-up de carregamento
function showPopup(message) {
    const popup = document.getElementById('popup');
    if (!popup) {
      // Criar pop-up se não existir
      const newPopup = document.createElement('div');
      newPopup.id = 'popup';
      newPopup.style.position = 'fixed';
      newPopup.style.top = '50%';
      newPopup.style.left = '50%';
      newPopup.style.transform = 'translate(-50%, -50%)';
      newPopup.style.padding = '20px';
      newPopup.style.backgroundColor = '#333';
      newPopup.style.color = '#fff';
      newPopup.style.borderRadius = '5px';
      newPopup.style.zIndex = '1000';
      newPopup.innerText = message;
      document.body.appendChild(newPopup);
    } else {
      popup.innerText = message;
      popup.style.display = 'block';
    }
}
  
// Função para esconder o pop-up de carregamento
function hidePopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'none';
    }
}


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

        let totalValue = 0; // Variável para acumular o valor total do dia

        vehicles.forEach(vehicle => {
            // Converte os timestamps para data e hora legíveis
            const entryTime = vehicle.entrada ? new Date(vehicle.entrada.seconds * 1000).toLocaleString() : '';
            const exitTime = vehicle.saida ? new Date(vehicle.saida.seconds * 1000).toLocaleString() : '';

            // Cria uma nova linha na tabela para cada veículo
            const row = document.createElement('tr');

            // Calcular o valor total
            totalValue += vehicle.valor; // Adiciona o valor do veículo ao total

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

        // Exibir o valor total na seção de valor diário
        const valorDiarioDiv = document.getElementById('valordiario');
        valorDiarioDiv.innerHTML = `R$ ${totalValue.toFixed(2)}`; // Formatar o valor como moeda
    } catch (error) {
        console.error("Erro ao buscar dados da coleção 'saida':", error);
    }
}

// Chama a função para carregar os dados quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    getVehiclesFromExit();
});


document.getElementById('dailyReport').addEventListener('click', async () => {
    try {
        // Exibir mensagem de carregamento
        showPopup("enviando relatório diário, aguarde......");

        // Faz a requisição GET para pegar todos os veículos da coleção 'saida'
        const response = await fetch('http://localhost:3000/api/saida');
        const vehicles = await response.json();

        if (!response.ok) {
                throw new Error("Erro ao buscar os dados da coleção 'saida'");
            }

        console.log("Dados da coleção 'saida':", vehicles);

        const payload = {
        data: vehicles.map(entry => ({
            'placa': entry.placa,
            'proprietário': entry.dono,
            'tipo': entry.tipo,
            'entrada': entry.entrada,
            'saida': entry.saida,
            'valor': entry.valor
            }))
        };


        // Envia os dados da coleção 'saida' para a API SheetDB
        const sheetDbResponse = await fetch('https://sheetdb.io/api/v1/9nlku5fa6cl5i', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });


        if (!sheetDbResponse.ok) {
            throw new Error("Erro ao enviar os dados para o SheetDB");
        }

        // Agora, deleta todos os documentos da coleção 'saida'
        const deleteResponse = await fetch('http://localhost:3000/api/saida', {
            method: 'DELETE',
        });

        if (!deleteResponse.ok) {
            throw new Error("Erro ao deletar os documentos da coleção 'saida'");
        }

        console.log("Dados enviados para o SheetDB e documentos deletados da coleção 'saida' com sucesso");

        // Opcional: Atualize a interface ou mostre uma mensagem de sucesso para o usuário
        showPopup("Relatório diário enviado e dados apagados com sucesso!");
        setTimeout(() => {
            hidePopup();
            window.location.reload();
          }, 2500); // Aguardar 1.5 segundos antes de redirecionar
        
    } catch (error) {
        console.error("Erro ao processar o relatório diário:", error);
        showPopup("Houve um erro ao enviar os dados. Verifique o console para mais informações.");
    }
});
