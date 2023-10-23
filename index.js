function message() {
    let p = document.createElement("p")
    let msg = document.createTextNode("I LOVE YOU!!!!")
    p.classList.add("message")
    p.appendChild(msg)
    document.body.appendChild(p)
}

function reset() {
    messageEl = document.getElementsByClassName("message")
    while (messageEl.length !== 0) {
        messageEl[0].remove()
    }
}