function sendMessage() {
    const gridContainer = document.querySelector(".container-i-love-you");
    const newMessage = document.createElement("div");
    newMessage.classList.add("message")
    newMessage.textContent = "I LOVE YOU!!!";
    gridContainer.appendChild(newMessage);
    
}

function reset() {
    messageEl = document.getElementsByClassName("message")
    while (messageEl.length !== 0) {
        messageEl[0].remove()
    }
}