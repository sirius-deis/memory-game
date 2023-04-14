import { formatTime } from "./utils";

const timerEl = document.querySelector(".timer");

let time;

let intervalId;

export const startTimer = () => {
    time = 0;
    updateTimerEl(time);
    intervalId = setInterval(update, 1000);
};

const update = () => {
    time++;
    updateTimerEl(time);
};

const updateTimerEl = (time) => {
    timerEl.textContent = formatTime(time);
};

export const stopTimer = () => {
    clearInterval(intervalId);
};

export const getTime = () => {
    return time;
};
