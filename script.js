const cards = [
    "photos/photos/1.jpg", "photos/photos/1.jpg", "photos/photos/2.jpg", "photos/photos/2.jpg",
    "photos/photos/6.jpg", "photos/photos/6.jpg", "photos/photos/31.jpg", "photos/photos/31.jpg",
    "photos/photos/29.jpg", "photos/photos/29.jpg", "photos/photos/35.jpg", "photos/photos/35.jpg",
    "photos/photos/39.jpg", "photos/photos/39.jpg", "photos/photos/20.jpg", "photos/photos/20.jpg",
];


const gameBoard = document.getElementById("game-board");
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function createCard(value) {
    const card = document.createElement("div");
    const img = document.createElement("img");
    img.src = value;
    img.style.display = "none";
    card.appendChild(img);
    card.classList.add("card");
    card.dataset.value = value;
    card.addEventListener("click", onCardClick);
    return card;
}

function checkForMatch() {
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;

    // Play sound
    playSound(isMatch);

    isMatch ? disableCards() : unflipCards();
}


function playSound(isMatch) {
    let audioElement;
    if (isMatch) {
        audioElement = document.getElementById("correct-sound");
    } else {
        audioElement = document.getElementById("wrong-sound");
    }
    audioElement.currentTime = 0;
    audioElement.play();
}


function onCardClick(e) {
    if (lockBoard) return;
    const card = e.target;

    if (firstCard === null) {
        card.querySelector("img").style.display = "block";
        firstCard = card;
    } else if (secondCard === null && card !== firstCard) {
        card.querySelector("img").style.display = "block";
        secondCard = card;

        if (firstCard.dataset.value === secondCard.dataset.value) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard.removeEventListener("click", onCardClick);
            secondCard.removeEventListener("click", onCardClick);
            firstCard = null;
            secondCard = null;
        } else {
            lockBoard = true;
            setTimeout(() => {
                firstCard.querySelector("img").style.display = "none";
                secondCard.querySelector("img").style.display = "none";
                firstCard = null;
                secondCard = null;
                lockBoard = false;
            }, 1000);
        }
    }
}


function initGame() {
    shuffleCards(cards);
    cards.forEach((cardValue) => {
        const card = createCard(cardValue);
        gameBoard.appendChild(card);
    });
}

initGame();
