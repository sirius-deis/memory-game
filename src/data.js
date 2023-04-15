const dataInput = document.querySelector(".data__input"),
    leftType = document.querySelector(".left__type");

export const getName = () => {
    return dataInput.value;
};

leftType.addEventListener("click", () => {
    leftType.classList.toggle("open");
});
