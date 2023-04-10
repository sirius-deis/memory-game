const board = document.querySelector(".board"),
    cardTemplate = document.querySelector(".card__template");

const options = {
    easy: [4, 4],
    medium: [8, 5],
    difficult: [15, 6],
};

export const createBoard = (set, difficulty) => {
    const chosenDifficulty = options[difficulty];
    const amountOfCells = chosenDifficulty[0] * chosenDifficulty[1];
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
