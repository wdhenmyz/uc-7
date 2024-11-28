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

  export { showPopup, hidePopup };