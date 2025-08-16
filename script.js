const totalTimerDisplay = document.getElementById('total-timer');
const sessionTimerDisplay = document.getElementById('session-timer');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const nextBtn = document.getElementById('next-btn');

const TOTAL_SECONDS = 2 * 60 * 60;
const SESSION_SECONDS = 20 * 60;

let totalTime = TOTAL_SECONDS;
let sessionTime = SESSION_SECONDS;
let timerInterval = null;
let isPaused = true;

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    totalTimerDisplay.textContent = formatTime(totalTime);
    sessionTimerDisplay.textContent = formatTime(sessionTime);
}

function startTimer() {
    if (isPaused) {
        isPaused = false;
        timerInterval = setInterval(() => {
            if (totalTime > 0) {
                totalTime--;
                sessionTime--;

                if (sessionTime < 0) {
                    sessionTime = SESSION_SECONDS;
                }
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                alert("全体セッションが終了しました。");
            }
        }, 1000);
    }
}

function pauseTimer() {
    isPaused = true;
    clearInterval(timerInterval);
}

function resetTimer() {
    isPaused = true;
    clearInterval(timerInterval);
    totalTime = TOTAL_SECONDS;
    sessionTime = SESSION_SECONDS;
    updateDisplay();
}

function nextSession() {
    sessionTime = SESSION_SECONDS;
    updateDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
nextBtn.addEventListener('click', nextSession);

// Initial display
updateDisplay();