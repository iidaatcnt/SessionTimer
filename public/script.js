const socket = io("https://session-timer-beta.vercel.app");

const totalTimerDisplay = document.getElementById('total-timer');
const sessionTimerDisplay = document.getElementById('session-timer');

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
    totalTimerDisplay.textContent = formatTime(data.totalTime);
    sessionTimerDisplay.textContent = formatTime(data.sessionTime);
});
