const board = document.querySelector(".board"),
    cardTemplate = document.querySelector(".card__template");

const options = {
    easy: [4, 4],
    medium: [8, 5],
    difficult: [15, 6],
};

let chosenCards = [];
let amountOfCells;
let timer;

export const createBoard = (set, difficulty) => {
    const chosenDifficulty = options[difficulty];
    amountOfCells = chosenDifficulty[0] * chosenDifficulty[1];
    const cardsSet = chooseCardsFromSet(set, amountOfCells / 2);
    const doubledCardSetShuffled = sortRandomly(cardsSet.concat(cardsSet));
    formCards(doubledCardSetShuffled, chosenDifficulty[0]);
};

const formCards = (arrayOfCards, width) => {
    board.innerHTML = "";
    arrayOfCards.forEach((card, i) => {
        formSingleCard(card, width, i);
    });
};

const formSingleCard = (card, width, i) => {
    const cardClone = cardTemplate.content.cloneNode(true);
    cardClone.querySelector(".card__back").textContent = card;
    const cartEl = cardClone.querySelector(".card");
    cartEl.style.gridColumn = `${(i % width) + 1}`;
    cartEl.style.gridRow = `${Math.floor(i / width) + 1}`;
    board.append(cardClone);
};

const chooseCardsFromSet = (set, amount) => {
    const arrOfSet = sortRandomly(set.match(/\p{Emoji}/gu));
    return arrOfSet.slice(0, amount);
};

const sortRandomly = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
};

const checkIfItsMatch = (arrOfCards) => {
    const firstCardEmoji = arrOfCards[0].querySelector(".card__back");
    const secondCardEmoji = arrOfCards[1].querySelector(".card__back");
    return firstCardEmoji.textContent === secondCardEmoji.textContent;
};

const removeCardsFromField = (arrOfCards) => {
    arrOfCards.forEach((card) => {
        card.remove();
    });
};

const hideCards = (arrOfCards) => {
    arrOfCards.forEach((card) => {
        card.classList.remove("open");
    });
};

const markCardsAsMatched = (arrOfCards) => {
    arrOfCards.forEach((card) => {
        card.firstElementChild.lastElementChild.classList.add("match");
    });
};

board.addEventListener("click", (e) => {
    const el = e.target.closest(".card");
    if (!el) return;
    if (el.classList.contains("open")) {
        return el.classList.remove("open");
    }
    el.classList.add("open");
    chosenCards.push(el);
    if (chosenCards.length === 2) {
        const isMatch = checkIfItsMatch(chosenCards);
        const copyOfChosenCards = [...chosenCards];
        chosenCards = [];
        if (isMatch) {
            markCardsAsMatched(copyOfChosenCards);
            amountOfCells -= 2;
            setTimeout(() => {
                removeCardsFromField(copyOfChosenCards);
            }, 1000);
        } else {
            timer = setTimeout(() => {
                hideCards(copyOfChosenCards);
            }, 1000);
        }
    }
});
