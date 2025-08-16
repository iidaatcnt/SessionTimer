const socket = io();

const totalTimerDisplay = document.getElementById('total-timer');
const sessionTimerDisplay = document.getElementById('session-timer');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const nextBtn = document.getElementById('next-btn');

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
    totalTimerDisplay.textContent = formatTime(data.totalTime);
    sessionTimerDisplay.textContent = formatTime(data.sessionTime);
    updateButtonStates(data.isPaused);
});

// Send control events to the server
startBtn.addEventListener('click', () => socket.emit('start'));
pauseBtn.addEventListener('click', () => socket.emit('pause'));
resetBtn.addEventListener('click', () => socket.emit('reset'));
nextBtn.addEventListener('click', () => socket.emit('next'));
