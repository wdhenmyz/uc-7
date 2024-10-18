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

// configurar o numero de vagas
let availableSpotsCount = 20; // Total number of parking spots

let motospots = 5; // Number of motorcycle spots
let carspots = 10; // Number of car spots
let truckspots = 3; // Number of truck spots
let busspots = 2; // Number of bus spots
