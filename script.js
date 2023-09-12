const leftDoor = document.getElementById("leftDoor");
const rightDoor = document.getElementById("rightDoor");
const openButton = document.getElementById("openButton");
const closeButton = document.getElementById("closeButton");

openButton.addEventListener("click", () => {
    leftDoor.classList.add("opened");
    rightDoor.classList.add("opened");
});

closeButton.addEventListener("click", () => {
    leftDoor.classList.remove("opened");
    rightDoor.classList.remove("opened");
});