import { login } from "../APIs/login.js";

// Evento de submissão do formulário de login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const senha = document.getElementById('password').value;
  const usuario = document.getElementById('username').value;

  console.log(`usuario= ${usuario} senha= ${senha}`);

  login(usuario, senha);
});