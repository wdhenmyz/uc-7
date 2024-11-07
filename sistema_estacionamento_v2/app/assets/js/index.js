import { db } from "../../../config/firebase.js";
import { ref, set, get } from "firebase/database";

// Função para registrar os dados do veículo
document.getElementById("parkingForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  // Pega os valores do formulário
  const placa = document.getElementById("plate").value;
  const dono = document.getElementById("owner").value;
  const tipo = document.querySelector('input[name="value-radio"]:checked')?.value;

  if (!placa || !dono || !tipo) {
    console.error("Por favor, preencha todos os campos.");
    return;
  }

  try {
    // Usa a referência `ref` e `set` corretamente para a versão modular do Firebase
    const vehicleRef = ref(db, 'vehicles/' + placa);

    console.log('Placa:', placa); 
    console.log('Dono:', dono); 
    console.log('Tipo:', tipo); 
    console.log('Referência do veículo:', vehicleRef.toString());

    await set(vehicleRef, {
      placa: placa,
      dono: dono,
      tipo: tipo,
      entrada: new Date().toISOString(),
      saida: null,
      valor: 0,
    });

    console.log("Veículo registrado com sucesso!");
    document.getElementById("parkingForm").reset();
  } catch (error) {
    console.error("Erro ao registrar veículo:", error.message);
  }
});


// Função para carregar os veículos e preencher a tabela
async function carregarVeiculos() {
  try {
    // Pega todos os veículos na referência 'vehicles'
    const vehiclesRef = ref(db, 'vehicles/');
    const snapshot = await get(vehiclesRef);
    
    // Verifica se existem dados
    if (snapshot.exists()) {
      const veiculos = snapshot.val(); // Retorna todos os veículos como um objeto
      const tbody = document.getElementById("parkingTableBody"); // Corpo da tabela
      
      // Limpa a tabela antes de adicionar os novos dados
      tbody.innerHTML = "";

      // Itera sobre os veículos e adiciona uma linha na tabela para cada um
      Object.keys(veiculos).forEach(placa => {
        const veiculo = veiculos[placa];

        // Cria uma nova linha da tabela
        const tr = document.createElement("tr");

        // Adiciona células para cada dado do veículo
        tr.innerHTML = `
          <td>${veiculo.placa}</td>
          <td>${veiculo.tipo}</td>
          <td>${veiculo.dono}</td>
          <td>${veiculo.entrada}</td>
          <td>${veiculo.saida || 'Ainda não saiu'}</td>
          <td>R$ ${veiculo.valor.toFixed(2)}</td>
          <td><button class="btn-editar">Editar</button> <button class="btn-excluir">Excluir</button></td>
        `;

        // Adiciona a linha ao corpo da tabela
        tbody.appendChild(tr);
      });
    } else {
      console.log("Nenhum veículo encontrado.");
    }
  } catch (error) {
    console.error("Erro ao carregar veículos:", error.message);
  }
}

// Chama a função para carregar os veículos quando a página for carregada
window.onload = carregarVeiculos;