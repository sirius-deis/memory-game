fetch("/public/animals.txt")
    .then((response) => response.text())
    .then((data) => {
        // const arr = data.split(" ");
        // const el = document.querySelector(".board");
        // console.log(el);
        // el.innerHTML = arr.join(" ");
    });
