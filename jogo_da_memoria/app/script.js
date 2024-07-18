document.getElementById('reset').addEventListener('click', () => {
    window.location.reload();
})

// This function shuffles the divs with the class "card"
function shuffleCards() {
    const cards = document.querySelectorAll(".card");
    const shuffledCards = Array.from(cards).sort(() => Math.random() - 0.5);
    const boards = document.querySelectorAll(".board");

    for (let i = 0; i < boards.length; i++) {
        const board = boards[i];
        board.innerHTML = "";

        // Delay adding the animation class to see the shuffle effect
        setTimeout(() => {
            board.classList.add("shuffle-animation");
            shuffledCards.slice(i * 4, (i + 1) * 4).forEach(card => board.appendChild(card));
        }, 200* i); // Adjust the delay as needed
    }
}

// This function initializes the game
function init() {
    // Add a click event listener to the button with the id "start"
    document.getElementById("start").addEventListener("click", shuffleCards);
}

init();

const cards = document.querySelectorAll('.card');
// function to flip the card
function flipCard(){
    document.addEventListener("DOMContentLoaded", function() {            
        cards.forEach(card => {
          card.addEventListener('click', function() {
            card.classList.toggle('hover');
          });
        });
      });
}

flipCard();