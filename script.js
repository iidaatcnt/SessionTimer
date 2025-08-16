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

// A simple beep sound
const beepSound = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YS9Wz/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/g/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/g/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/f/v/g==
");

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

function updateButtonStates() {
    startBtn.disabled = !isPaused;
    pauseBtn.disabled = isPaused;
}

function startTimer() {
    if (isPaused) {
        isPaused = false;
        updateButtonStates();
        timerInterval = setInterval(() => {
            if (totalTime > 0) {
                totalTime--;
                sessionTime--;

                if (sessionTime < 0) {
                    beepSound.play();
                    sessionTime = SESSION_SECONDS;
                }
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                alert("全体セッションが終了しました。");
                resetTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    isPaused = true;
    updateButtonStates();
    clearInterval(timerInterval);
}

function resetTimer() {
    isPaused = true;
    clearInterval(timerInterval);
    totalTime = TOTAL_SECONDS;
    sessionTime = SESSION_SECONDS;
    updateDisplay();
    updateButtonStates();
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
updateButtonStates();