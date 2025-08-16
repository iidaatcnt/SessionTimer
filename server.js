const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  transports: ["polling", "websocket"],
  allowEIO3: true
});

const PORT = process.env.PORT || 3000;

const TOTAL_SECONDS = 2 * 60 * 60;
const SESSION_SECONDS = 20 * 60;

let timerState = {
    totalTime: TOTAL_SECONDS,
    sessionTime: SESSION_SECONDS,
    isPaused: true,
};

let timerInterval = null;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/admin', (req, res) => {
    res.redirect('/admin.html');
});

io.on('connection', (socket) => {
    socket.emit('timeUpdate', timerState);

    socket.on('start', () => {
        if (timerState.isPaused) {
            timerState.isPaused = false;
            timerInterval = setInterval(tick, 1000);
        }
    });

    socket.on('pause', () => {
        if (!timerState.isPaused) {
            timerState.isPaused = true;
            clearInterval(timerInterval);
            io.emit('timeUpdate', timerState);
        }
    });

    socket.on('reset', () => {
        timerState.isPaused = true;
        clearInterval(timerInterval);
        timerState.totalTime = TOTAL_SECONDS;
        timerState.sessionTime = SESSION_SECONDS;
        io.emit('timeUpdate', timerState);
    });

    socket.on('next', () => {
        timerState.sessionTime = SESSION_SECONDS;
        io.emit('timeUpdate', timerState);
    });
});

function tick() {
    if (timerState.totalTime > 0) {
        timerState.totalTime--;
        timerState.sessionTime--;

        if (timerState.sessionTime < 0) {
            timerState.sessionTime = SESSION_SECONDS;
        }
    } else {
        timerState.isPaused = true;
        clearInterval(timerInterval);
    }
    io.emit('timeUpdate', timerState);
}

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
