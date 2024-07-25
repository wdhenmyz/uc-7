const cards = document.querySelectorAll(".card");

// check if cards match
function check() {
    if (cards[0].innerHTML === cards[1].innerHTML) {
        cards[0].classList.add("match");
        cards[1].classList.add("match");
    }
}

    