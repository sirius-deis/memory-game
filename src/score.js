const tabContainer = document.querySelector(".tab"),
    tabButtons = tabContainer.querySelectorAll(".tab__btn"),
    contentContainer = document.querySelector(".content__list"),
    leftArrow = document.querySelector(".pagination").firstElementChild,
    rightArrow = document.querySelector(".pagination").lastElementChild,
    paginationContainer = document.querySelector(".pagination__numbers");

const score = [];
let chosenDifficulty = "";

tabContainer.addEventListener("click", (e) => {
    const el = e.target.closest(".tab__btn");
    if (!el) {
        return;
    }
    removeActiveClassFromTabButtons();
    chosenDifficulty = el.textContent.toLowerCase();
    el.classList.add("active");
});

const removeActiveClassFromTabButtons = () => {
    tabButtons.forEach((btn) => btn.classList.remove("active"));
};

const updateScoreList = (list) => {
    if (list.length < 10) {
    }
};

const renderContent = (content) => {
    contentContainer.textContent = content;
};

const renderPagination = () => {};

/**
 *
 * {
 *  difficulty: String,
 *  name: String,
 *  time: Number,
 *  moves: Number
 * }
 *
 */
export const saveToStore = (entry) => {
    score.push(entry);
    localStorage.setItem("score", JSON.stringify(score));
    updateScoreList(score);
};

export const retrieveFromStore = () => {
    score = JSON.parse(localStorage.getItem("score"));
    updateScoreList(score);
};

const showArrows = () => {
    leftArrow.classList.remove("hidden");
    rightArrow.classList.remove("hidden");
};

const hideArrows = () => {
    leftArrow.classList.add("hidden");
    rightArrow.classList.add("hidden");
};
