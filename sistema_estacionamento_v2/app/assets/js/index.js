const carro = 4;
const moto = 2;
const caminhonete = 6;
const onibus = 8;

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
          valor = carro;  // Exemplo de valor fixo para carros
          break;
      case 'moto':
          valor = moto;  // Exemplo de valor fixo para motos
          break;
      case 'caminhonete':
          valor = caminhonete;  // Exemplo de valor fixo para caminhões
          break;
      case 'onibus':
          valor = onibus;  // Exemplo de valor fixo para caminhões
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
              <td><button class="saida-button" data-id="${vehicle.id}">saida</button></td>
          `;

          tableBody.appendChild(row);
      });

      // Exibir o valor total na seção de valor diário
      const valorDiarioDiv = document.getElementById('valordiario');
      valorDiarioDiv.innerHTML = `R$ ${totalValue.toFixed(2)}`; // Formatar o valor como moeda

      // Adiciona event listeners para os botões de exclusão
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
});

async function loadModal(vehicleData) {
  console.log("Dados do veículo enviados para modal:", vehicleData); // Verifique se os dados aparecem aqui
  const vehicleDataString = encodeURIComponent(JSON.stringify(vehicleData));
  window.open(`modal.html?vehicleData=${vehicleDataString}`, 'VeiculoInfo', 'width=400,height=400');
}



async function saida(id) {
  try {
    await loadModal(); // Carrega o modal no início

    // 1. Buscar os dados do veículo
    console.log("Buscando dados do veículo...");
    const response = await fetch(`http://localhost:3000/api/entrada/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar dados do veículo");

    const vehicleData = await response.json();
    console.log("Dados do veículo:", vehicleData);

    // 2. Registrar a hora de saída e calcular o valor
    const saidaDate = new Date(); // Hora atual para a saída
    const entradaDate = new Date(vehicleData.entrada.seconds * 1000); // Converter entrada para data

    // Calcular diferença de horas entre entrada e saída
    const diffHours = Math.ceil((saidaDate - entradaDate) / (1000 * 60 * 60));
    let valor;
    switch (vehicleData.tipo) {
      case 'carro':
        valor = diffHours * carro;
        break;
      case 'moto':
        valor = diffHours * moto;
        break;
      case 'caminhonete':
        valor = diffHours * caminhonete;
        break;
      case 'onibus':
        valor = diffHours * onibus;
        break;
      default:
        valor = diffHours * 8;
    }

    // Atualizar o objeto com a saída e o valor
    vehicleData.saida = saidaDate.toISOString();
    vehicleData.valor = valor;
    console.log("Hora de saída registrada e valor calculado:", vehicleData);

    // 3. Mover para a coleção 'saida'
    const postDataResponse = await fetch('http://localhost:3000/api/saida', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vehicleData)
    });

    if (!postDataResponse.ok) {
      throw new Error("Erro ao mover dados para a coleção 'saida'")
    } else {     
      console.log("Dados movidos para 'saida' com sucesso");

      loadModal(vehicleData); // Exibe o modal com os dados do veículo
    }

    // 4. Excluir da coleção 'entrada'
    const deleteResponse = await fetch(`http://localhost:3000/api/entrada/${id}`, {
      method: 'DELETE',
    });
    if (!deleteResponse.ok) throw new Error("Erro ao excluir o veículo");

    console.log("Veículo excluído da coleção 'entrada'");

    
  } catch (error) {
    console.error("Erro ao registrar a saída:", error);
  }
}





// Função para exibir os dados do veículo no modal
/*function showVehicleData(vehicleData) {
  document.getElementById('modalContainer').style.display = 'flex';
  document.getElementById('modalPlaca').innerText = `Placa: ${vehicleData.placa}`;
  document.getElementById('modalTipo').innerText = `Tipo: ${vehicleData.tipo}`;
  document.getElementById('modalDono').innerText = `Dono: ${vehicleData.dono}`;
  document.getElementById('modalEntrada').innerText = `Entrada: ${new Date(vehicleData.entrada.seconds * 1000).toLocaleString()}`;
  document.getElementById('modalSaida').innerText = `Saída: ${vehicleData.saida ? new Date(vehicleData.saida.seconds * 1000).toLocaleString() : 'Não registrada'}`;
  document.getElementById('modalValor').innerText = `Valor: R$${vehicleData.valor}`;
}*/


