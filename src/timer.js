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

const formatTime = (time) => {
    const seconds = time % 60;
    const minutes = Math.trunc(time / 60);
    const hours = Math.trunc(time / (60 * 60));
    return `${hours != 0 ? `${addZeroBeforeIfRequired(hours)}:` : ""}${addZeroBeforeIfRequired(
        minutes
    )}:${addZeroBeforeIfRequired(seconds)}`;
};

const addZeroBeforeIfRequired = (number) => {
    return number < 10 ? `0${number}` : number;
};

export const stopTimer = () => {
    clearInterval(intervalId);
};
