export const formatTime = (time) => {
    const seconds = time % 60;
    const minutes = Math.trunc(time / 60);
    const hours = Math.trunc(time / (60 * 60));
    return `${hours != 0 ? `${addZeroBeforeIfRequired(hours)}:` : ""}${addZeroBeforeIfRequired(
        minutes
    )}:${addZeroBeforeIfRequired(seconds)}`;
};

export const addZeroBeforeIfRequired = (number) => {
    return number < 10 ? `0${number}` : number;
};
