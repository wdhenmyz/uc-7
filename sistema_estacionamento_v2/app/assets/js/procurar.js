const carro = 4;
const moto = 2;
const caminhonete = 6;
const onibus = 8;

const vagas = carro+moto+caminhonete+onibus;
let vagas_disponiveis = vagas;

const vagasCarro = document.getElementById('vagas_carro');
const vagasMoto = document.getElementById('vagas_moto');
const vagasCaminhonete = document.getElementById('vagas_caminhonete');
const vagasOnibus = document.getElementById('vagas_onibus');

let motospots = 5; // Number of motorcycle spots
let carspots = 5; // Number of car spots
let truckspots = 5; // Number of truck spots
let busspots = 5; // Number of bus spots



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