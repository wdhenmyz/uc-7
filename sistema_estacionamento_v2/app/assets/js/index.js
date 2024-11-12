document.getElementById('parkingForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the form from submitting the traditional way

  // Get form data
  const placa = document.getElementById('plate').value;
  const dono = document.getElementById('owner').value;
  const tipo = document.querySelector('input[name="value-radio"]:checked').value;
  
  // Calcular o valor do estacionamento com base no tipo de veículo
  const valor = calcularValor(tipo);

  // Create an object for vehicle data
  const vehicleData = {
      placa,
      dono,
      tipo,
      entrada: new Date().toISOString(), // Save entry time as ISO string
      saida: null,                      // Exit time is null initially
      valor                            // Placeholder for the value, to be calculated later
  };

  console.log(vehicleData);

  try {
      // Send the data to the server
      const response = await fetch('http://localhost:3000/api/entrada', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(vehicleData)
      });

      if (response.ok) {
          console.log("veiculo cadastrado com sucesso");
          // Refresh the parking table or handle UI updates as needed
          window.location.reload();
      } else {
          console.error("falha ao cadastrar veiculo");
      }
  } catch (error) {
      console.error("falha ao enviar dados:", error);
  }
});

// Função para calcular o valor com base no tipo de veículo
function calcularValor(tipo) {
  let valor = 0;
  
  // Define valores baseados no tipo do veículo
  switch (tipo) {
      case 'carro':
          valor = 4;  // Exemplo de valor fixo para carros
          break;
      case 'moto':
          valor = 2;  // Exemplo de valor fixo para motos
          break;
      case 'caminhonete':
          valor = 6;  // Exemplo de valor fixo para caminhões
          break;
      case 'onibus':
          valor = 8;  // Exemplo de valor fixo para caminhões
          break;
      default:
          valor = 0;  // Valor padrão para tipos não definidos
          break;
  }

  return valor;
}

// carregar todos os veículos na tabela
document.addEventListener('DOMContentLoaded', async () => {
  try {
      const response = await fetch('http://localhost:3000/api/entrada'); // URL completa do endpoint
      if (!response.ok) {
          throw new Error("Erro ao buscar dados dos veículos");
      }

      const vehicles = await response.json();
      const tableBody = document.getElementById('parkingTableBody');
      tableBody.innerHTML = ''; // Limpa o conteúdo da tabela antes de adicionar novos dados

      let totalValue = 0; // Variável para acumular o valor total do dia

      vehicles.forEach(vehicle => {
          const row = document.createElement('tr');
                
        const entrada = vehicle.entrada ? new Date(vehicle.entrada).toLocaleString() : 'N/A';
        const saida = vehicle.saida ? new Date(vehicle.saida).toLocaleString() : 'N/A';
        
        // Calcular o valor total
        totalValue += vehicle.valor; // Adiciona o valor do veículo ao total

          row.innerHTML = `
              <td>${vehicle.placa}</td>
              <td>${vehicle.tipo}</td>
              <td>${vehicle.dono}</td>
              <td>${entrada}</td>
              <td>${saida}</td>
              <td>${vehicle.valor}</td>
              <td><button class="delete-button" data-id="${vehicle.id}">Excluir</button></td>
          `;

          tableBody.appendChild(row);
      });

      // Exibir o valor total na seção de valor diário
      const valorDiarioDiv = document.getElementById('valordiario');
      valorDiarioDiv.innerHTML = `R$ ${totalValue.toFixed(2)}`; // Formatar o valor como moeda

      // Adiciona event listeners para os botões de exclusão
      document.querySelectorAll('.delete-button').forEach(button => {
          button.addEventListener('click', async (e) => {
              const vehicleId = e.target.getAttribute('data-id');
              await deleteVehicle(vehicleId);
              e.target.parentElement.parentElement.remove();
          });
      });

  } catch (error) {
      console.error("Erro ao carregar os veículos:", error);
  }
});

// Função para excluir um veículo
async function deleteVehicle(id) {
  try {
    // Faz uma requisição GET para buscar os dados do veículo antes de deletá-lo
    console.log("Buscando dados do veículo...");
    const response = await fetch(`http://localhost:3000/api/entrada/${id}`);
    const vehicleData = await response.json();

    if (!response.ok) {
      throw new Error("Erro ao buscar dados do veículo");
    }

    console.log("Dados do veículo:", vehicleData);

    // Envia os dados para a coleção 'saida'
    console.log("Movendo dados para a coleção 'saida'...");
    const postDataResponse = await fetch('http://localhost:3000/api/saida', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicleData)
    });

    if (!postDataResponse.ok) {
      throw new Error("Erro ao mover dados para a coleção 'saida'");
    }

    console.log("Dados movidos para 'saida' com sucesso");

    // Agora exclui o veículo da coleção 'entrada'
    console.log("Excluindo veículo da coleção 'entrada'...");
    const deleteResponse = await fetch(`http://localhost:3000/api/entrada/${id}`, {
      method: 'DELETE',
    });

    if (!deleteResponse.ok) {
      throw new Error("Erro ao excluir o veículo");
    }

    console.log("Veículo movido para 'saida' e excluído com sucesso");

    window.location.reload();
  } catch (error) {
    console.error("Erro ao excluir o veículo:", error);
  }
}



