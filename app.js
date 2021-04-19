const express = require('express')
const http = require('http');
const app = express()
const { exec } = require("child_process");
const server = http.createServer(app);

let viewsPath = __dirname + '/views'
app.use(express.static(__dirname + '/public'));
app.set('views', viewsPath);
app.engine('htm', require('ejs').renderFile);
app.set('view engine', 'ejs');
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    render(res, '/index.htm')
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
    socket.on('command', (command) => {
        if (command == 'play/pause') {
            exec("xdotool key XF86AudioPlay")
            io.emit('response', 'Play/Pause')
        } if (command == 'vol-down') {
            exec("xdotool key XF86AudioLowerVolume")
            io.emit('response', 'Volume down')
        } if (command == 'vol-up') {
            exec("xdotool key XF86AudioRaiseVolume")
            io.emit('response', 'Volume up')
        } else {
            console.log('Command not found !');
        }
    })
});


function render(res, view) {
    res.render('layouts/layout.htm', { body: viewsPath + view })
}

server.listen(8002, "192.168.1.101", () => {
    console.log('listening on http://192.168.1.101:8002');
});