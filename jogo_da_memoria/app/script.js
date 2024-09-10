document.getElementById('reset').addEventListener('click', () => {
    window.location.reload();
});

// This function shuffles the divs with the class "card"
function shuffleCards() {
    const cards = document.querySelectorAll(".card");
    const shuffledCards = Array.from(cards).sort(() => Math.random() - 0.5);
    const boards = document.querySelectorAll(".board");

    for (let i = 0; i < boards.length; i++) {
        const board = boards[i];
        board.innerHTML = ""; // Clear the board

        // Delay adding cards to see the shuffle effect
        setTimeout(() => {
            shuffledCards.slice(i * 4, (i + 1) * 4).forEach(card => board.appendChild(card));
            board.classList.add("shuffle-animation");
        }, 200 * i); // Adjust delay for animation
        
        // Remove animation class after it's done
        setTimeout(() => {
            board.classList.remove("shuffle-animation");
        }, 200 * (i + 1)); 
    }
}

// This function initializes the game
function init() {
    // Add a click event listener to the button with the id "start"
    document.getElementById("start").addEventListener("click", shuffleCards);

    // Add event listeners to flip the cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            card.classList.toggle('hover'); // Flip card on click
        });
    });
}

init();

