// Obtém os elementos do jogo
const player1 = document.getElementById('player-1');
const player2 = document.getElementById('player-2');
const ball = document.getElementById('ball');
const score1 = document.getElementById('score-1');
const score2 = document.getElementById('score-2');

// Initializar os scores
let player1Score = 0;
let player2Score = 0;

// Define posições e velocidades iniciais
let player1Y = 200;
let player2Y = 200;
let ballX = 400;
let ballY = 200;
let ballXSpeed = 5;
let ballYSpeed = 5;

// Função para atualizar as posições dos paddles
function updatepaddles() {
    // atualiza as posições dos paddles
    player1.style.top = player1Y + 'px';
    player2.style.top = player2Y + 'px';
    // atualiza as velocidades dos paddles
}

// Função para atualizar a posição da bola
function updateball() {
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
}

// Função para lidar com pressionamentos de teclas para os jogadores 1 e 2
document.addEventListener('keydown', function(event) {
    if (event.key === 'w') {
        player1Y -= 20;
    } else if (event.key === 's') {
        player1Y += 20;
    };
    if (event.key === 'ArrowUp') {
        player2Y -= 20;
    } else if (event.key === 'ArrowDown') {
        player2Y += 20;
    };
});

// Função para atualizar o estado do jogo
function updategame() {
    // Atualiza as posições dos paddles
    updatepaddles();

    // Atualiza a posição da bola
    updateball();

    // Verifica colisões e atualiza velocidade da bola
    if (ballX < 0 || ballX > 1000) {
        ballXSpeed = -ballXSpeed;
    }
    if (ballY < 0 || ballY > 400) {
        ballYSpeed = -ballYSpeed;
    }
    if (ballY + 10 > player1Y && ballY < player1Y + 100 && ballX < player1.offsetLeft + player1.offsetWidth) {
        ballXSpeed = -ballXSpeed;
    }
    if (ballY + 10 > player2Y && ballY < player2Y + 100 && ballX > player2.offsetLeft - 10) {
        ballXSpeed = -ballXSpeed;
    }

    // Atualiza a posição da bola
    ballX += ballXSpeed;
    ballY += ballYSpeed;

    // Checar se um ganhou
    if (ballX < 0) {
        // Player 2 scores
        player2Score++;
        score2.textContent = player2Score;
        resetGame();
    } else if (ballX > 1000) {
        // Player 1 scores
        player1Score++;
        score1.textContent = player1Score;
        resetGame();
    }

    // Solicita o próximo frame
    requestAnimationFrame(updategame);
}

// Função para reset o jogo depois do ponto ser marcado
function resetGame() {
    player1Y = 200;
    player2Y = 200;
    ballX = 400;
    ballY = 200;
}

// Comece o jogo
function começar() {
    document.getElementById('start').addEventListener('click', () => {
        requestAnimationFrame(updategame);
    });
}

começar()
// função para reiniciar o jogo
function reiniciar() {
    document.getElementById('reset').addEventListener('click', () =>{
        window.location.reload();
    })
}

reiniciar()