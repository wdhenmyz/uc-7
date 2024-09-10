document.getElementById('reset').addEventListener('click', () => {
    window.location.reload(); // Recarrega a página ao clicar no botão "reset"
});

// Esta função embaralha os divs com a classe "card"
function embaralharCartas() {
    const cartas = document.querySelectorAll(".card");
    const cartasEmbaralhadas = Array.from(cartas).sort(() => Math.random() - 0.5);
    const tabuleiros = document.querySelectorAll(".board");

    for (let i = 0; i < tabuleiros.length; i++) {
        const tabuleiro = tabuleiros[i];
        tabuleiro.innerHTML = ""; // Limpa o tabuleiro

        // Adiciona um atraso para ver o efeito de embaralhamento
        setTimeout(() => {
            cartasEmbaralhadas.slice(i * 4, (i + 1) * 4).forEach(carta => tabuleiro.appendChild(carta));
            tabuleiro.classList.add("shuffle-animation");
        }, 200 * i); // Ajuste o atraso para a animação
        
        // Remove a classe de animação após a finalização do embaralhamento
        setTimeout(() => {
            tabuleiro.classList.remove("shuffle-animation");
        }, 200 * (i + 1)); 
    }
}

// Esta função inicializa o jogo
function iniciar() {
    // Adiciona o evento de clique ao botão com o id "start"
    document.getElementById("start").addEventListener("click", embaralharCartas);

    // Adiciona eventos de clique para virar as cartas
    const cartas = document.querySelectorAll('.card');
    cartas.forEach(carta => {
        carta.addEventListener('click', function() {
            carta.classList.toggle('hover'); // Vira a carta ao clicar
        });
    });
}

iniciar();


