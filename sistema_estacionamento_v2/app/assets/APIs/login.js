import { showPopup, hidePopup } from "../components/Popup.js";

async function login(usuario, senha) {
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
          showPopup("Login realizado com sucesso! Bem-vindo");
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
}

export { login }