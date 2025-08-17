const socket = io();

const totalTimerDisplay = document.getElementById('total-timer');
const sessionTimerDisplay = document.getElementById('session-timer');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const nextBtn = document.getElementById('next-btn');

console.log("Admin script loaded. Attempting to connect to server...");

socket.on('connect', () => {
    console.log('Successfully connected to the server with socket ID:', socket.id);
});

socket.on('disconnect', () => {
    console.error('Disconnected from the server.');
});

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function updateButtonStates(isPaused) {
    startBtn.disabled = !isPaused;
    pauseBtn.disabled = isPaused;
}

// Listen for updates from the server
socket.on('timeUpdate', (data) => {
    console.log('Received timeUpdate from server:', data);
    totalTimerDisplay.textContent = formatTime(data.totalTime);
    sessionTimerDisplay.textContent = formatTime(data.sessionTime);
    updateButtonStates(data.isPaused);
});

// Send control events to the server
startBtn.addEventListener('click', () => {
    console.log('Start button clicked. Emitting "start" event to server.');
    socket.emit('start');
});
pauseBtn.addEventListener('click', () => {
    console.log('Pause button clicked. Emitting "pause" event to server.');
    socket.emit('pause');
});
resetBtn.addEventListener('click', () => {
    console.log('Reset button clicked. Emitting "reset" event to server.');
    socket.emit('reset');
});
nextBtn.addEventListener('click', () => {
    console.log('Next button clicked. Emitting "next" event to server.');
    socket.emit('next');
});