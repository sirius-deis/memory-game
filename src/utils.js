export const formatTime = (time) => {
    const seconds = time % 60;
    const minutes = Math.trunc(time / 60) % 60;
    const hours = Math.trunc(time / (60 * 60)) % 24;
    return `${hours != 0 ? `${addZeroBeforeIfRequired(hours)}:` : ""}${addZeroBeforeIfRequired(
        minutes
    )}:${addZeroBeforeIfRequired(seconds)}`;
};

export const addZeroBeforeIfRequired = (number) => {
    return number < 10 ? `0${number}` : number;
};

export const checkIfItsBlank = (string) => {
    if (string.trim().length !== 0) {
        return string;
    }

    throw new Error("Field can't be blank");
};
