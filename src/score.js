import { formatTime } from "./utils";

const tabContainer = document.querySelector(".tab"),
    tabButtons = tabContainer.querySelectorAll(".tab__btn"),
    contentContainer = document.querySelector(".content__list"),
    leftArrow = document.querySelector(".pagination").firstElementChild,
    rightArrow = document.querySelector(".pagination").lastElementChild,
    paginationContainer = document.querySelector(".pagination__numbers"),
    burgerEl = document.querySelector(".burger");

let score = [];
let chosenDifficulty = "easy";
let activePagination = 1;
let amountOfEntry = 0;

tabContainer.addEventListener("click", (e) => {
    const el = e.target.closest(".tab__btn");
    if (!el) {
        return;
    }
    removeActiveClassFromTabButtons();
    chosenDifficulty = el.textContent.toLowerCase();
    el.classList.add("active");
    updateScoreList(score);
});

paginationContainer.addEventListener("click", (e) => {
    const el = e.target.closest(".pagination__item");
    if (!el) {
        return;
    }
    const num = +el.textContent;
    if (num === activePagination) {
        return;
    }
    activePagination = num;
    updateScoreList(score);
});

leftArrow.addEventListener("click", () => {
    if (activePagination <= 1) {
        return;
    }
    activePagination += -1;
    updateScoreList(score);
});

rightArrow.addEventListener("click", () => {
    if (activePagination >= amountOfEntry) {
        return;
    }
    activePagination += 1;
    updateScoreList(score);
});

const removeActiveClassFromTabButtons = () => {
    tabButtons.forEach((btn) => btn.classList.remove("active"));
};

const updateScoreList = (list) => {
    const filteredList = list.filter((el) => el.difficulty === chosenDifficulty).sort(sortContent);
    const listToRender = [...filteredList].splice((activePagination - 1) * 10, 10);
    renderContent(listToRender);
    amountOfEntry = Math.ceil(filteredList.length / 10);
    renderPagination(amountOfEntry);
};

const renderContent = (content) => {
    const arrToRender = content
        .map((el) => {
            return `<li class="content__item">
        <div class="content__column">${el.name}</div>
        <div class="content__column">${formatTime(el.time)}</div>
        <div class="content__column">${el.moveAmount}</div>
    </li>`;
        })
        .join("");
    contentContainer.innerHTML = arrToRender;
};

const sortContent = (content1, content2) => {
    if (content1.time > content2.time) {
        return 1;
    } else if (content1.time < content2.time) {
        return -1;
    } else if (content1.moveAmount > content2.moveAmount) {
        return 1;
    } else if (content1.moveAmount < content2.moveAmount) {
        return -1;
    } else {
        return 0;
    }
};

const renderPagination = (number) => {
    let pagination = "";
    if (number >= 0 && number <= 7) {
        if (number === 0) {
            pagination = "";
            hideArrows();
        } else {
            pagination = new Array(number)
                .fill(0)
                .map((_, i) => {
                    return `<button class="pagination__item ${i + 1 === activePagination ? "active" : ""}">${
                        i + 1
                    }</button>`;
                })
                .join("");
            if (number > 1) {
                showArrows();
            }
        }
    } else {
        if (activePagination < 4) {
            pagination = new Array(7)
                .fill(0)
                .map((_, i) => {
                    if (i === 6) {
                        return `<button class="pagination__item">${number}</button>`;
                    }
                    if (i === 5) {
                        return `<button class="pagination__dot">...</button>`;
                    }
                    return `<button class="pagination__item ${i + 1 === activePagination ? "active" : ""}">${
                        i + 1
                    }</button>`;
                })
                .join("");
        } else if (activePagination > number - 4) {
            pagination = new Array(7)
                .fill(0)
                .map((_, i, arr) => {
                    if (i === 0) {
                        return `<button class="pagination__item">${1}</button>`;
                    }
                    if (i === 1) {
                        return `<button class="pagination__dot">...</button>`;
                    }
                    return `<button class="pagination__item ${
                        number - arr.length + i + 1 === activePagination ? "active" : ""
                    }">${number - arr.length + i + 1}</button>`;
                })
                .join("");
        } else {
            pagination = new Array(7)
                .fill(0)
                .map((_, i) => {
                    if (i === 0) {
                        return `<button class="pagination__item">${1}</button>`;
                    }
                    if (i === 1 || i === 5) {
                        return `<button class="pagination__dot">...</button>`;
                    }
                    if (i === 6) {
                        return `<button class="pagination__item">${number}</button>`;
                    }
                    if (i === 2) {
                        return `<button class="pagination__item">${activePagination - 1}</button>`;
                    }
                    if (i === 4) {
                        return `<button class="pagination__item">${activePagination + 1}</button>`;
                    }
                    return `<button class="pagination__item active">${activePagination}</button>`;
                })
                .join("");
        }
    }
    paginationContainer.innerHTML = pagination;
};
export const saveToStore = (entry) => {
    score.push(entry);
    localStorage.setItem("score", JSON.stringify(score));
    updateScoreList(score);
};

export const retrieveFromStoreAndUpdate = () => {
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

burgerEl.addEventListener("click", () => {
    burgerEl.classList.toggle("open");
});
