const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // pathモジュールを追加

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
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

// 静的ファイルを提供するディレクトリを絶対パスで指定
app.use(express.static(path.join(__dirname, 'public')));

// /adminへのアクセスを/admin.htmlにリダイレクト
app.get('/admin', (req, res) => {
    res.redirect('/admin.html');
});


io.on('connection', (socket) => {
    console.log(`A user connected with socket ID: ${socket.id}`);
    // Send the current state to the new user
    socket.emit('timeUpdate', timerState);

    socket.on('start', () => {
        console.log(`Received 'start' event from ${socket.id}`);
        if (timerState.isPaused) {
            console.log('Timer state is paused, starting timer...');
            timerState.isPaused = false;
            timerInterval = setInterval(tick, 1000);
        } else {
            console.log('Timer is already running, ignoring "start" event.');
        }
    });

    socket.on('pause', () => {
        console.log(`Received 'pause' event from ${socket.id}`);
        if (!timerState.isPaused) {
            console.log('Timer state is running, pausing timer...');
            timerState.isPaused = true;
            clearInterval(timerInterval);
            io.emit('timeUpdate', timerState);
        } else {
            console.log('Timer is already paused, ignoring "pause" event.');
        }
    });

    socket.on('reset', () => {
        console.log(`Received 'reset' event from ${socket.id}`);
        timerState.isPaused = true;
        clearInterval(timerInterval);
        timerState.totalTime = TOTAL_SECONDS;
        timerState.sessionTime = SESSION_SECONDS;
        io.emit('timeUpdate', timerState);
    });

    socket.on('next', () => {
        console.log(`Received 'next' event from ${socket.id}`);
        timerState.sessionTime = SESSION_SECONDS;
        io.emit('timeUpdate', timerState);
    });

    socket.on('disconnect', () => {
        console.log(`User with socket ID ${socket.id} disconnected`);
    });
});

function tick() {
    console.log('Tick! Current state:', timerState);
    if (timerState.totalTime > 0) {
        timerState.totalTime--;
        timerState.sessionTime--;

        if (timerState.sessionTime < 0) {
            // In a real app, you might want a sound here,
            // but we'll let the client handle it.
            timerState.sessionTime = SESSION_SECONDS;
        }
    } else {
        console.log('Total time reached zero. Stopping timer.');
        timerState.isPaused = true;
        clearInterval(timerInterval);
    }
    io.emit('timeUpdate', timerState);
}

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});