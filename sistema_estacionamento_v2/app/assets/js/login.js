<<<<<<< HEAD
import { showPopup, hidePopup } from "./Popup.js";

// Evento de submissão do formulário de login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const senha = document.getElementById('password').value;
  const usuario = document.getElementById('username').value;

  console.log(`usuario= ${usuario} senha= ${senha}`);

  try {
    // Exibir mensagem de carregamento
    showPopup("Realizando login, aguarde......");

    // Fazendo o GET com os parâmetros 'usuario' e 'senha' na URL
    const response = await fetch(`http://localhost:3000/api/login?usuario=${encodeURIComponent(usuario)}&senha=${encodeURIComponent(senha)}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar dados do usuário");
    }

    const result = await response.json();

    if (result.success) {

      // Exibir mensagem de sucesso e redirecionar após um curto intervalo
      showPopup("Login com sucesso! Bem-vindo");
      setTimeout(() => {
        hidePopup();
        window.location.href = 'index.html';
      }, 1500); // Aguardar 1.5 segundos antes de redirecionar

    } else {

      showPopup("Usuário ou senha incorretos")

      setTimeout(() => {
        hidePopup();
      }, 1500); // Aguardar 1.5 segundos antes de redirecionar

    }
  } catch (error) {

    showPopup("Usuário ou senha incorretos")

    setTimeout(() => {
      hidePopup();
    }, 1500); // Aguardar 1.5 segundos antes de redirecionar

    console.error("Erro ao buscar o usuário:", error);
 
  }
});
=======
import { showPopup, hidePopup } from "./Popup.js";

// Evento de submissão do formulário de login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const senha = document.getElementById('password').value;
  const usuario = document.getElementById('username').value;

  console.log(`usuario= ${usuario} senha= ${senha}`);

  try {
    // Exibir mensagem de carregamento
    showPopup("Realizando login, aguarde......");

    // Fazendo o GET com os parâmetros 'usuario' e 'senha' na URL
    const response = await fetch(`http://localhost:3000/api/login?usuario=${encodeURIComponent(usuario)}&senha=${encodeURIComponent(senha)}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar dados do usuário");
    }

    const result = await response.json();

    if (result.success) {

      // Exibir mensagem de sucesso e redirecionar após um curto intervalo
      showPopup("Login com sucesso! Bem-vindo");
      setTimeout(() => {
        hidePopup();
        window.location.href = 'index.html';
      }, 1500); // Aguardar 1.5 segundos antes de redirecionar

    } else {

      showPopup("Usuário ou senha incorretos")

      setTimeout(() => {
        hidePopup();
      }, 1500); // Aguardar 1.5 segundos antes de redirecionar

    }
  } catch (error) {

    showPopup("Usuário ou senha incorretos")

    setTimeout(() => {
      hidePopup();
    }, 1500); // Aguardar 1.5 segundos antes de redirecionar

    console.error("Erro ao buscar o usuário:", error);
 
  }
});
>>>>>>> 0afbd0e2c15375698b7d3aadc240baf2ce87246b
