//Este seleciona o elemento HTML com a classe currentPlayer, que é utilizado para exibir o jogador da vez.
const currentPlayer = document.querySelector(".currentPlayer");  

let selected;   // selected será um array que armazenará as jogadas feitas.
let player = "X";   // player mantém o controle do jogador atual, começando com "X".

// Lista das combinações vencedoras possíveis no jogo da velha.
let positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// Esta função inicializa o jogo.
function init() {
  selected = []; // Reseta o array selected para armazenar as novas jogadas.

  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`; // Mostra qual jogador (X ou O) está na vez.

  // Seleciona todos os botões dentro do elemento com a classe game, limpa seu conteúdo e adiciona um listener para o evento de clique.
  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", newMove);
  });
}

init();

// Esta função é chamada quando um jogador faz uma jogada
function newMove(e) {
  // Pega o valor do atributo data-i do botão clicado, que indica sua posição no tabuleiro.
  const index = e.target.getAttribute("data-i"); 

  // Atualiza o texto do botão para o símbolo do jogador atual e remove o listener de clique para prevenir jogadas duplicadas.
  e.target.innerHTML = player;
  e.target.removeEventListener("click", newMove);

  // Armazena a jogada
  selected[index] = player;

  // Chama a função check para verificar se há um vencedor ou empate, com um pequeno delay de 100ms.
  setTimeout(() => {
    check();
  }, [100]);

  // Alterna o jogador
  player = player === "X" ? "O" : "X";
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}``

// Esta função verifica se houve um vencedor ou empate
function check() {
    // Determina o último jogador que fez uma jogada
  let playerLastMove = player === "X" ? "O" : "X";

    // Filtra as jogadas feitas pelo último jogador
  const items = selected
    .map((item, i) => [item, i])
    .filter((item) => item[0] === playerLastMove)
    .map((item) => item[1]);
    // Cria uma lista de índices das jogadas feitas pelo último jogador

    // Verifica se alguma das combinações vencedoras está presente nas jogadas do último jogador. Se sim, alerta o vencedor e reinicia o jogo.
  for (pos of positions) {
    if (pos.every((item) => items.includes(item))) {
      alert("O JOGADOR '" + playerLastMove + "' GANHOU!");
      init();
      return;
    }
  }

    // Se todos os espaços estiverem preenchidos e nenhum jogador tiver vencido, declara empate e reinicia o jogo.
  if (selected.filter((item) => item).length === 9) {
    alert("DEU EMPATE!");
    init();
    return;
  }
}