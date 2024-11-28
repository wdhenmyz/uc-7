import { loadModal } from "../components/modal.js";

let motospots = 5; // Number of motorcycle spots
let carspots = 5; // Number of car spots
let truckspots = 5; // Number of truck spots
let busspots = 5; // Number of bus spots

const vagas = motospots+carspots+truckspots+busspots;
let vagas_disponiveis = vagas;

async function saida(id) {
    const vagasCarro = document.getElementById('vagas_carro');
    const vagasMoto = document.getElementById('vagas_moto');
    const vagasCaminhonete = document.getElementById('vagas_caminhonete');
    const vagasOnibus = document.getElementById('vagas_onibus');

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
        vagas_disponiveis++;
        document.getElementById('availableSpots').textContent = `Vagas Disponíveis: ${vagas_disponiveis}`;
      
    } catch (error) {
      console.error("Erro ao registrar a saída:", error);
    }
  }
  
  export { saida };