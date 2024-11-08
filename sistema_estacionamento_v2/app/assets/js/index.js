// Importa o Firebase configurado
import firebase from "../../../firebase.js"; // Ajuste o caminho conforme necessário

// Espera o DOM estar carregado antes de adicionar o listener
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("parkingForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita o reload da página

    // Pega os valores do formulário
    const placa = document.getElementById("plate").value;
    const dono = document.getElementById("owner").value;
    const tipo = document.querySelector('input[name="value-radio"]:checked')?.value;

    // Valida os campos do formulário
    if (!placa || !dono || !tipo) {
      console.error("Por favor, preencha todos os campos.");
      alert("Por favor, preencha todos os campos.");
      return;
    }

    console.log("Dados do formulário:", placa, dono, tipo);

    // Tenta adicionar os dados ao Firestore
    try {
      const cliente = await firebase.firestore().collection("entrada").add({
        placa: placa,
        dono: dono,
        tipo: tipo,
        entrada: firebase.firestore.FieldValue.serverTimestamp(),
        saida: null,
        valor: null
      });

      alert(`Cadastrado com sucesso: ${cliente.id}`);
    } catch (error) {
      console.error("Erro ao cadastrar no Firebase:", error);
      alert("Ocorreu um erro ao tentar cadastrar. Tente novamente.");
    }
  });
});
