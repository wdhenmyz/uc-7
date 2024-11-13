const carro = 4;
const moto = 2;
const caminhonete = 6;
const onibus = 8;

let motospots = 5; // Number of motorcycle spots
let carspots = 5; // Number of car spots
let truckspots = 5; // Number of truck spots
let busspots = 5; // Number of bus spots

const vagas = motospots+carspots+truckspots+busspots;
let vagas_disponiveis = vagas;

const vagasCarro = document.getElementById('vagas_carro');
const vagasMoto = document.getElementById('vagas_moto');
const vagasCaminhonete = document.getElementById('vagas_caminhonete');
const vagasOnibus = document.getElementById('vagas_onibus');




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
        
        vagas_disponiveis--;
        document.getElementById('availableSpots').textContent = `Vagas Disponíveis: ${vagas_disponiveis}`;

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


          if (vehicle.tipo == 'carro') {     
            carspots--;
            vagasCarro.textContent = `Vagas de carro: ${carspots}`
          }
          if (vehicle.tipo == 'moto') {
            motospots--;
            vagasMoto.textContent = `Vagas de moto: ${motospots}`
          } 
          if (vehicle.tipo == 'caminhonete') {
            truckspots--;
            vagasCaminhonete.textContent = `Vagas de caminhonete: ${truckspots}`
          } 
          if (vehicle.tipo == 'onibus') {
            busspots--;
            vagasOnibus.textContent = `Vagas de onibus: ${busspots}`
          }
      });

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


// Função para carregar a tabela com base nos filtros
async function buscarVeiculos(event) {
  event.preventDefault(); // Impede o envio do formulário para recarregar a página
  
  const placa = document.getElementById('plate').value;
  const dono = document.getElementById('owner').value;
  const tipo = document.querySelector('input[name="value-radio"]:checked')?.value; // Verifica se algum tipo foi selecionado

  // Configura a URL da requisição GET, incluindo os parâmetros de pesquisa
  const url = new URL('http://localhost:3000/api/entrada'); // Altere para o endpoint correto
  const params = new URLSearchParams();

  if (placa) params.append('placa', placa);
  if (dono) params.append('owner', dono);
  if (tipo) params.append('tipo', tipo);

  url.search = params.toString();

  try {
    // Faz a requisição para o backend
    const response = await fetch(url);
    const veiculos = await response.json();
    
    if (!response.ok) {
      throw new Error('Erro ao buscar os veículos');
    }

    // Limpa a tabela antes de exibir os novos resultados
    const tableBody = document.getElementById('parkingTableBody');
    tableBody.innerHTML = '';

    // Preenche a tabela com os dados retornados
    veiculos.forEach(vehicle => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>${vehicle.placa}</td>
        <td>${vehicle.tipo}</td>
        <td>${vehicle.dono}</td>
        <td>${new Date(vehicle.entrada).toLocaleString()}</td>
        <td>${vehicle.saida ? new Date(vehicle.saida).toLocaleString() : 'Ainda não saiu'}</td>
        <td>${vehicle.valor ? vehicle.valor : '0,00'}</td>
        <td><button class="saida-button" data-id="${vehicle.id}">saida</button></td>
      `;
      
      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error('Erro ao buscar veículos:', error);
  }
}

// Adiciona o evento de submit ao formulário
const vehicleForm = document.getElementById('vehicleForm');
vehicleForm.addEventListener('submit', buscarVeiculos);



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

    // 5. Atualizar os contadores de vagas
    if (vehicleData.tipo == 'carro') {
      carspots++;
      vagasCarro.textContent = `Vagas de carro: ${carspots}`
    } 
    if (vehicleData.tipo == 'moto') {
      motospots++;
      vagasMoto.textContent = `Vagas de moto: ${motospots}`
    } 
    if (vehicleData.tipo == 'caminhonete') {
      truckspots++;
      vagasCaminhonete.textContent = `Vagas de caminhonete: ${truckspots}`
    } 
    if (vehicleData.tipo == 'onibus') {
      busspots++;
      vagasOnibus.textContent = `Vagas de onibus: ${busspots}`
    }

    // 6. Atualizar o contador de vagas disponíveis
    availableSpots.textContent = `Vagas Disponíveis: ${carspots + motospots + truckspots + busspots}`;
    
  } catch (error) {
    console.error("Erro ao registrar a saída:", error);
  }
}