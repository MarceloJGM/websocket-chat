const socket = new WebSocket(`ws://${window.location.host}`);
const form = document.getElementById("form");
const input = document.getElementById("input") as HTMLInputElement;
const messages = document.getElementById("messages") as HTMLDivElement;

socket.addEventListener("message", (event) => {
    const message = `<p>${event.data}</p>`;
    messages.insertAdjacentHTML("beforeend", message);
});

form?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (input.value) {
        socket.send(input.value);
        input.value = "";
    }
});
