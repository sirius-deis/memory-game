import { checkIfItsBlank } from "./utils";

const dataInput = document.querySelector(".data__input"),
    leftType = document.querySelector(".left__type");

export const getName = () => {
    return checkIfItsBlank(dataInput.value);
};

export const setName = (name) => {
    dataInput.value = name;
};

leftType.addEventListener("click", () => {
    leftType.classList.toggle("open");
});
