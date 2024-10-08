let primeiraCarta = null;
let segundaCarta = null;
let bloquearTabuleiro = false; // Para evitar cliques durante a verificação

// Função para virar a carta e verificar correspondência
function virarCarta() {
    if (bloquearTabuleiro) return; // Evitar virar cartas durante a verificação

    // Verificar se a carta já foi virada
    if (this === primeiraCarta) return;

    this.classList.add('hover'); // Adicionar a classe para virar a carta

    if (!primeiraCarta) {
        // A primeira carta foi selecionada
        primeiraCarta = this;
    } else {
        // A segunda carta foi selecionada
        segundaCarta = this;

        // Agora, verificamos se as duas cartas são correspondentes
        verificarCorrespondencia();
    }
}

// Verificar se as cartas são iguais
function verificarCorrespondencia() {
    const saoIguais = primeiraCarta.dataset.pair === segundaCarta.dataset.pair; // Compara o par das cartas
    saoIguais ? desabilitarCartas() : desvirarCartas();
}

// Desabilitar as cartas se forem correspondentes
function desabilitarCartas() {
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);
    resetarTabuleiro();
}

// Desvirar as cartas se não forem correspondentes
function desvirarCartas() {
    bloquearTabuleiro = true; // Bloquear o tabuleiro até as cartas serem desviradas

    setTimeout(() => {
        primeiraCarta.classList.remove('hover');
        segundaCarta.classList.remove('hover');
        resetarTabuleiro();
    }, 1000); // Ajustar o tempo de espera conforme necessário
}

// Resetar o estado do tabuleiro após uma correspondência ou não
function resetarTabuleiro() {
    [primeiraCarta, segundaCarta] = [null, null]; // Resetar as variáveis
    bloquearTabuleiro = false; // Desbloquear o tabuleiro
}

// Função para verificar se todas as cartas foram viradas
function verificarFimDeJogo() {
    const todasCartasViradas = document.querySelectorAll('.card.hover').length === document.querySelectorAll('.card').length;

    if (todasCartasViradas) {
        setTimeout(() => {
            alert('Você encontrou todos os pares! O jogo será reiniciado.');
            reiniciarJogo();
        }, 500); // Pequeno atraso antes do alerta
    }
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    window.location.reload(); // Recarrega a página para reiniciar o jogo
}

// Inicializar os eventos de clique nas cartas
function init() {
    const cartas = document.querySelectorAll('.card');
    cartas.forEach(carta => {
        carta.addEventListener('click', virarCarta);
    });

    document.getElementById("start").addEventListener("click", shuffleCards);
}

init();

    
