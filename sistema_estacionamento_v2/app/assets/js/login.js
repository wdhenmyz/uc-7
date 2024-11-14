// Função para exibir pop-up de carregamento
function showPopup(message) {
  const popup = document.getElementById('popup');
  if (!popup) {
    // Criar pop-up se não existir
    const newPopup = document.createElement('div');
    newPopup.id = 'popup';
    newPopup.style.position = 'fixed';
    newPopup.style.top = '50%';
    newPopup.style.left = '50%';
    newPopup.style.transform = 'translate(-50%, -50%)';
    newPopup.style.padding = '20px';
    newPopup.style.backgroundColor = '#333';
    newPopup.style.color = '#fff';
    newPopup.style.borderRadius = '5px';
    newPopup.style.zIndex = '1000';
    newPopup.innerText = message;
    document.body.appendChild(newPopup);
  } else {
    popup.innerText = message;
    popup.style.display = 'block';
  }
}

// Função para esconder o pop-up de carregamento
function hidePopup() {
  const popup = document.getElementById('popup');
  if (popup) {
    popup.style.display = 'none';
  }
}

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
