import { createBoard } from "./board";
import { startTimer } from "./timer";

const boardEl = document.querySelector(".board"),
    btnPanel = document.querySelector(".btn__panel"),
    easyBtn = document.querySelector(".easyBtn"),
    mediumBtn = document.querySelector(".mediumBtn"),
    difficultBtn = document.querySelector(".difficultBtn"),
    resetBtn = document.querySelector(".resetBtn"),
    dialog = document.querySelector(".dialog"),
    moves = document.querySelector(".moves");

let emojiList = "",
    difficulty = "easy",
    moveAmount = 0;

const resetPanel = () => {
    btnPanel.classList.remove("focus");
    [easyBtn, mediumBtn, difficultBtn].forEach((btn) => {
        btn.textContent = btn.dataset.name;
        btn.removeAttribute("data-chosen");
        btn.classList.remove("chosen");
    });
};

const resetBoard = () => {
    boardEl.classList.remove(`board__${difficulty}`);
};

const focusOnBtnPanel = () => {
    btnPanel.classList.add("focus");
};

const showDifficultyButtons = () => {
    [easyBtn, mediumBtn, difficultBtn].forEach((btn) => {
        btn.classList.remove("hidden");
    });
};

const hideDifficultyButtons = () => {
    [easyBtn, mediumBtn, difficultBtn].forEach((btn) => {
        btn.classList.add("hidden");
    });
};

const showResetBtn = () => {
    resetBtn.classList.remove("hidden");
};

const hideResetBtn = () => {
    resetBtn.classList.add("hidden");
};

const chooseBtn = (el, text) => {
    resetPanel();
    focusOnBtnPanel();
    el.dataset.chosen = true;
    el.textContent = text;
    el.classList.add("chosen");
};

const showDialog = () => {
    dialog.classList.remove("hidden");
};

const hideDialog = () => {
    dialog.classList.add("hidden");
};

const reset = () => {
    hideResetBtn();
    resetPanel();
    showDifficultyButtons();
    moveAmount = 0;
    moves.textContent = moveAmount;
};

const increaseMoves = () => {
    moves.textContent = ++moveAmount;
};

[easyBtn, mediumBtn, difficultBtn].forEach((btn) => {
    btn.addEventListener("click", ({ target }) => {
        if (!target.dataset.chosen) {
            chooseBtn(target, "start");
            return;
        }
        resetBoard();
        difficulty = target.dataset.name;
        boardEl.classList.add(`board__${difficulty}`);
        hideDifficultyButtons();
        showResetBtn();
        start();
    });
});

resetBtn.addEventListener("click", ({ target }) => {
    showDialog();
});

dialog.querySelector(".dialog__yes").addEventListener("click", () => {
    reset();
    hideDialog();
});

dialog.querySelector(".dialog__no").addEventListener("click", () => {
    hideDialog();
});

const fetchEmojiList = async (url) => {
    const response = await fetch(url);
    const data = await response.text();
    emojiList = data;
    start();
};

const start = () => {
    createBoard(emojiList, difficulty, increaseMoves);
    startTimer();
};

fetchEmojiList("/public/animals.txt");
