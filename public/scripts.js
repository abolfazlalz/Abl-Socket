$(() => {
    var socket = io();

    var messages = document.getElementById("messages");
    var play = document.getElementById("play");

    play.addEventListener("click", () => {
    });

    $('#play').on('click', () => {
        socket.emit("command", "play/pause");
    })

    $('#vol-up').on('click', () => {
        socket.emit("command", "vol-up");
    })

    $('#vol-down').on('click', () => {
        socket.emit("command", "vol-down");
    })

    socket.on("response", function (msg) {
        $('#messages').prepend($(`<li class="list-group-item">${msg}</li>`))
    });
    var socket = io();
})