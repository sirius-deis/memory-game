const timerEl = document.querySelector(".timer");

let time = 0;

let intervalId;

export const startTimer = () => {
    intervalId = setInterval(() => {
        time++;
        timerEl.textContent = time;
    }, 1000);
};
