import { createBoard, formEmptyBoard } from "./board";
import { startTimer, stopTimer, getTime } from "./timer";
import { saveToStore, retrieveFromStoreAndUpdate } from "./score";
import { getName, setName } from "./data";
import { checkIfItsBlank } from "./utils";

const boardContainerEl = document.querySelector(".board__container"),
    boardGreetingEl = document.querySelector(".board__greeting"),
    winEl = document.querySelector(".win"),
    loaderEl = document.querySelector(".loader"),
    btnPanel = document.querySelector(".btn__panel"),
    easyBtn = document.querySelector(".easyBtn"),
    mediumBtn = document.querySelector(".mediumBtn"),
    difficultBtn = document.querySelector(".difficultBtn"),
    resetBtn = document.querySelector(".resetBtn"),
    dialog = document.querySelector(".dialog"),
    moves = document.querySelector(".moves"),
    errorEl = document.querySelector(".error");

let emojiList = "",
    difficulty = "easy",
    moveAmount = 0,
    name = "";

const resetPanel = () => {
    btnPanel.classList.remove("focus");
    [easyBtn, mediumBtn, difficultBtn].forEach((btn) => {
        btn.textContent = btn.dataset.name;
        btn.removeAttribute("data-chosen");
        btn.classList.remove("chosen");
    });
};

const resetBoard = () => {
    boardContainerEl.classList.remove(`board__${difficulty}`);
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
    stopTimer();
    blurBoard();
};

const increaseMoves = (isEnd) => {
    moves.textContent = ++moveAmount;
    if (isEnd) {
        stopTimer();
        blurBoard();
        showWinMsg();
        try {
            name = getName();
            saveToStore({ difficulty, name, time: getTime(), moveAmount });
            hideResetBtn();
            showDifficultyButtons();
        } catch (error) {
            showErrorMsg();
        }
    }
};

errorEl.querySelector(".error__confirm").addEventListener("click", () => {
    try {
        name = checkIfItsBlank(errorEl.querySelector(".error__input").value);
        setName(name);
        saveToStore({ difficulty, name, time: getTime(), moveAmount });
        hideErrorMsg();
    } catch (error) {
        return;
    }
});

errorEl.querySelector(".error__discard").addEventListener("click", () => {
    hideErrorMsg();
});

const showErrorMsg = () => {
    errorEl.classList.remove("hidden");
    hideResetBtn();
};

const hideErrorMsg = () => {
    errorEl.classList.add("hidden");
    showDifficultyButtons();
};

[easyBtn, mediumBtn, difficultBtn].forEach((btn) => {
    btn.addEventListener("click", ({ target }) => {
        if (!target.dataset.chosen) {
            chooseBtn(target, "start");
            return;
        }
        resetBoard();
        difficulty = target.dataset.name;
        boardContainerEl.classList.add(`board__${difficulty}`);
        hideDifficultyButtons();
        showResetBtn();
        start();
        unblurBoard();
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

const showWinMsg = () => {
    winEl.classList.remove("hidden");
};

const hideWinMsg = () => {
    winEl.classList.add("hidden");
};

const hideLoader = () => {
    loaderEl.classList.add("hidden");
};

const blurBoard = () => {
    boardGreetingEl.classList.remove("hidden");
};

const unblurBoard = () => {
    boardGreetingEl.classList.add("hidden");
};

const fetchEmojiList = async (url) => {
    const response = await fetch(url);
    const data = await response.text();
    emojiList = data;
    hideLoader();
    formEmptyBoard();
    retrieveFromStoreAndUpdate();
};

const start = () => {
    createBoard(emojiList, difficulty, increaseMoves);
    hideWinMsg();
    startTimer();
};

fetchEmojiList("/public/animals.txt");

const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
            if (registration.installing) {
                console.log("Service worker is installing");
            }
            if (registration.waiting) {
                console.log("Service worker is installed");
            }
            if (registration.active) {
                console.log("Service worker is active");
            }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
};

registerServiceWorker();
