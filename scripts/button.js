function sendMessage() {
    const gridContainer = document.querySelector(".container-i-love-you");
    const newMessage = document.createElement("div");
    newMessage.classList.add("message")
    newMessage.textContent = "I LOVE JHO!!!";
    gridContainer.appendChild(newMessage);

}

function reset() {
    messageEl = document.getElementsByClassName("message")
    while (messageEl.length !== 0) {
        messageEl[0].remove()
    }
}

var attempts = 0;
var maxAttempts = 3;

function showLoginAlert() {
    var password = prompt("enter the code baby: ");
    var correctPasswordArr = ["10/08/2023", "10/8/2023", "10/8/23", "10/08/23"];
    if (correctPasswordArr.includes(password)) {
        alert("happy 1 month anniversary :)");
        window.location.href = "/jhonna.html";
        attempts = 0;
    } else {
        if (attempts > maxAttempts) {
            alert("hint: it's a date 🙄");
        } else {
            alert("you're not jho, get out >:(");
            attempts++;
        }
    }
}