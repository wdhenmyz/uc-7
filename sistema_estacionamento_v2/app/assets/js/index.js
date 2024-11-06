import { getDatabase, ref, set } from "firebase/database";

// Função para registrar os dados do veículo
document.getElementById("parkingForm").addEventListener("submit", async (event) => {
  event.preventDefault(); // Impede o recarregamento da página

  // Pega os valores do formulário
  const placa = document.getElementById("plate").value; // ID correto para o campo de placa
  const dono = document.getElementById("owner").value; // ID correto para o campo de dono
  const tipo = document.querySelector('input[name="value-radio"]:checked').value; // Radio button para tipo

  // Definindo o ID do veículo usando a placa
  const vehicleID = placa; // Usando a placa como ID único

  // Obtendo a referência do banco de dados
  const db = getDatabase();

  try {
    // Envia os dados para o Firebase Realtime Database
    await set(ref(db, 'vehicles/' + vehicleID), {
      placa: placa,
      dono: dono,
      tipo: tipo,
      entrada: new Date().toISOString(), // Hora de entrada
      saida: null, // Ainda não há hora de saída
      valor: 0, // Valor inicial como 0
    });

    // Exibe uma mensagem de sucesso no console
    console.log("Veículo registrado com sucesso!");

    // Opcional: Limpar o formulário após o envio
    document.getElementById("parkingForm").reset();

  } catch (error) {
    // Exibe um erro caso algo dê errado
    console.error("Erro ao registrar veículo:", error.message);
  }
});
