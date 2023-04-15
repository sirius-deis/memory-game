const boardContainer = document.querySelector(".board__container"),
    cardTemplate = boardContainer.querySelector(".card__template");

const options = {
    easy: [4, 4],
    medium: [8, 5],
    difficult: [14, 6],
};

let chosenCards = [];
let amountOfCells;
let increaseFunction;

export const createBoard = (set, difficulty, increaseMoves) => {
    const chosenDifficulty = options[difficulty];
    amountOfCells = chosenDifficulty[0] * chosenDifficulty[1];
    increaseFunction = increaseMoves;
    const cardsSet = chooseCardsFromSet(set, amountOfCells / 2);
    const doubledCardSetShuffled = sortRandomly(cardsSet.concat(cardsSet));
    formCards(doubledCardSetShuffled, chosenDifficulty[0]);
};

export const formEmptyBoard = () => {
    formCards(new Array(16).fill(""), options.easy[0]);
};

const formCards = (arrayOfCards, width) => {
    boardContainer.innerHTML = "";
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
    boardContainer.append(cardClone);
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
        card.classList.add("match");
    });
};

boardContainer.addEventListener("click", (e) => {
    const el = e.target.closest(".card");
    if (!el) return;
    if (el.classList.contains("open") && !el.classList.contains("match")) {
        return el.classList.remove("open");
    }
    el.classList.add("open");
    chosenCards.push(el);
    increaseFunction();
    if (chosenCards.length === 2) {
        const copyOfChosenCards = [...chosenCards];
        chosenCards = [];
        const isMatch = checkIfItsMatch(copyOfChosenCards);
        if (isMatch) {
            markCardsAsMatched(copyOfChosenCards);
            amountOfCells -= 2;
            setTimeout(() => {
                removeCardsFromField(copyOfChosenCards);
            }, 1000);
        } else {
            setTimeout(() => {
                hideCards(copyOfChosenCards);
            }, 1000);
        }
    }
    if (amountOfCells === 0) {
        increaseFunction(true);
    }
});
