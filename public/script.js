const socket = io();

const totalTimerDisplay = document.getElementById('total-timer');
const sessionTimerDisplay = document.getElementById('session-timer');

console.log("Viewer script loaded. Attempting to connect to server...");

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

socket.on('timeUpdate', (data) => {
    console.log('Received timeUpdate from server:', data);
    totalTimerDisplay.textContent = formatTime(data.totalTime);
    sessionTimerDisplay.textContent = formatTime(data.sessionTime);
});