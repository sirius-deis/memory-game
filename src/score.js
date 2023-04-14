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
    chosenDifficulty = el.textContent;
    el.classList.add("active");
});

const removeActiveClassFromTabButtons = () => {
    tabButtons.forEach((btn) => btn.classList.remove("active"));
};

const updateScoreList = (list) => {
    renderContent(list.filter((el) => el.difficulty === chosenDifficulty));
    renderPagination(list.length);
};

const renderContent = (content) => {
    const arrToRender = content
        .map((el) => {
            return `<li class="content__item">
        <div class="content__column">${content.name}</div>
        <div class="content__column">${content.time}</div>
        <div class="content__column">${content.moves}</div>
    </li>`;
        })
        .join("");
    contentContainer.innerHTML = arrToRender;
};

const renderPagination = (number) => {
    let pagination = "";
    if (number === 0) {
        hideArrows();
        pagination = "";
    }
    if (number <= 6) {
        showArrows();
        pagination = new Array(number)
            .map((_, i) => {
                return `<button class="pagination__item ${i === 0 ? "active" : ""}">${i + 1}</button>`;
            })
            .join("");
    }

    paginationContainer.innerHTML = pagination;
};

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
    score = JSON.parse(localStorage.getItem("score")) ?? [];
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
