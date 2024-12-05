let motospots = 5; // Number of motorcycle spots
let carspots = 5; // Number of car spots
let truckspots = 5; // Number of truck spots
let busspots = 5; // Number of bus spots

const vagas = motospots+carspots+truckspots+busspots;
let vagas_disponiveis = vagas;

let totalValue = 0; // Variável para acumular o valor total do dia

function tabela(vehicle) {
    const vagasCarro = document.getElementById('vagas_carro');
    const vagasMoto = document.getElementById('vagas_moto');
    const vagasCaminhonete = document.getElementById('vagas_caminhonete');
    const vagasOnibus = document.getElementById('vagas_onibus');

    const tableBody = document.getElementById('parkingTableBody');
    tableBody.innerHTML = ''; // Limpa o conteúdo da tabela antes de adicionar novos dados

    const row = document.createElement('tr');
                  
    const entrada = vehicle.entrada ? new Date(vehicle.entrada).toLocaleString() : 'N/A';
    const saida = vehicle.saida ? new Date(vehicle.saida).toLocaleString() : 'N/A';
            
    // Reduzir as vagas disponíveis com verificação
    vagas_disponiveis--;
    document.getElementById('availableSpots').textContent = `Vagas Disponíveis: ${vagas_disponiveis}`;
  
    // Garantir que o valor do veículo é numérico antes de adicionar ao total
    const valorNumerico = Number(vehicle.valor) || 0; // Converte para número ou usa 0 se for inválido
    totalValue += valorNumerico; // Adiciona o valor numérico ao total
  
    row.innerHTML = `
        <td>${vehicle.placa}</td>
        <td>${vehicle.tipo}</td>
        <td>${vehicle.dono}</td>
        <td>${entrada}</td>
        <td>${saida}</td>
        <td>${valorNumerico.toFixed(2)}</td>
        <td><button class="saida-button" data-id="${vehicle.id}">saida</button></td>
    `;

    // Exibir o valor total na seção de valor diário
    const valorDiarioDiv = document.getElementById('valordiario');
    valorDiarioDiv.innerHTML = `R$ ${totalValue.toFixed(2)}`; // Formatar o valor como moeda
  
    tableBody.appendChild(row);
  
    // Atualizar contagem de vagas
    if (vehicle.tipo == 'carro' && carspots > 0) { 
        carspots--;
        vagasCarro.textContent = `Vagas de carro: ${carspots}`;
    } else if (carspots == 0) {
        vagasCarro.textContent = `Vagas de carro: ${carspots}`;
    }
  
    if (vehicle.tipo == 'moto' && motospots > 0) {
        motospots--;
        vagasMoto.textContent = `Vagas de moto: ${motospots}`;
    } else if (motospots == 0) {
        vagasMoto.textContent = `Vagas de moto: ${motospots}`;
    }
  
    if (vehicle.tipo == 'caminhonete' && truckspots > 0) {
        truckspots--;
        vagasCaminhonete.textContent = `Vagas de caminhonete: ${truckspots}`;
    } else if (truckspots == 0) {
        vagasCaminhonete.textContent = `Vagas de caminhonete: ${truckspots}`;
    }
  
    if (vehicle.tipo == 'onibus' && busspots > 0) {
        busspots--;
        vagasOnibus.textContent = `Vagas de onibus: ${busspots}`;
    } else if (busspots == 0) {
        vagasOnibus.textContent = `Vagas de onibus: ${busspots}`;
    }
        
}

export { tabela };