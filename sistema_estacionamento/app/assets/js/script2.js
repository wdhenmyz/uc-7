/*const info = document.getElementById('parkingTableBody').innerHTML = '';

function diario() {
    localStorage.setItem('diario', JSON.stringify(data));
    document.getElementById('parkingTableBody').innerHTML = '';
}

const actionsCell = document.createElement('td');
const exitButton = document.createElement('button');
exitButton.textContent = 'Registrar Saída';

exitButton.addEventListener('click', function() {
    diario(data)
});*/

let contador = 0

// Função para aumentar o tamanho da letra
function aumentarTamanho() {
    if (contador < 1 ) {
        const corpo = document.querySelector('container');
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
        const corpo = document.getElementById('corpo');
        const estilo = window.getComputedStyle(corpo, null).getPropertyValue('font-size');
        const tamanhoAtual = parseFloat(estilo);
        corpo.style.fontSize = (tamanhoAtual - 3) + 'px';

        contador--
    }

    console.log(contador)
}


