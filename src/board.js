const options = {
    easy: [3, 3],
    medium: [7, 5],
    difficult: [15, 6],
};

export const createBoard = (set, difficulty) => {
    const chosenDifficulty = options[difficulty];
    const amountOfCells = chosenDifficulty[0] * chosenDifficulty[1];
    const cardsSet = chooseCardsFromSet(set, amountOfCells / 2);
};

const chooseCardsFromSet = (set, amount) => {
    const arrOfSet = set.split(" ");
    console.log(arrOfSet);
};
