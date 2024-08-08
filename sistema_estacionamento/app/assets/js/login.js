let contador = 0

// Função para aumentar o tamanho da letra
function aumentarTamanho() {
    if (contador < 1 ) {
        const corpo = document.getElementById('container');
        const estilo = window.getComputedStyle(corpo, null).getPropertyValue('font-size');
        const tamanhoAtual = parseFloat(estilo);
        corpo.style.fontSize = (tamanhoAtual + 3) + 'px';
      
        contador++
    }

    console.log(contador);
    }

// Função para diminuir o tamanho da letra
function diminuirTamanho() {
    if (contador >= 0) {
        const corpo = document.getElementById('container');
        const estilo = window.getComputedStyle(corpo, null).getPropertyValue('font-size');
        const tamanhoAtual = parseFloat(estilo);
        corpo.style.fontSize = (tamanhoAtual - 3) + 'px';

        contador--
    }

    console.log(contador)
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const senha = document.getElementById('password').value;
    const usuario = document.getElementById('username').value;
    
    try {
        const response = await fetch(`https://sheetdb.io/api/v1/mg07naffiti78/search?usuario=${usuario}&senha=${senha}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        const result = await response.json();
        console.log(result);
        
    } catch (error) {
        console.error('Error:', error);
    }


});