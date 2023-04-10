import { createBoard } from "./board";

const boardEl = document.querySelector(".board"),
    btnPanel = document.querySelector(".btn__panel"),
    easyBtn = document.querySelector(".easyBtn"),
    mediumBtn = document.querySelector(".mediumBtn"),
    difficultBtn = document.querySelector(".difficultBtn"),
    resetBtn = document.querySelector(".resetBtn");

let emojiList = "",
    difficulty = "";

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

const hideDifficultyButtons = () => {
    [easyBtn, mediumBtn, difficultBtn].forEach((btn) => {
        btn.classList.add("hidden");
    });
};

const showResetBtn = () => {
    resetBtn.classList.remove("hidden");
};

[easyBtn, mediumBtn, difficultBtn].forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if (e.target.dataset.chosen) {
            resetBoard();
            difficulty = e.target.dataset.name;
            boardEl.classList.add(`board__${difficulty}`);
            hideDifficultyButtons();
            showResetBtn();
        } else {
            resetPanel();
            e.target.dataset.chosen = true;
            e.target.textContent = "start";
            e.target.classList.add("chosen");
            focusOnBtnPanel();
        }
    });
});

const fetchEmojiList = async (url) => {
    const response = await fetch(url);
    const data = await response.text();
    emojiList = data;
};

const start = () => {
    createBoard(emojiList, "easy");
};

fetchEmojiList("/public/animals.txt");
