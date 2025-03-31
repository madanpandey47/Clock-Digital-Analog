// Clock functionality
function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Update analog clock hands
    const hourDeg = (hours * 30) + (minutes * 0.5); // 360° / 12 = 30° per hour
    const minuteDeg = minutes * 6; // 360° / 60 = 6° per minute
    const secondDeg = seconds * 6; // 360° / 60 = 6° per second

    document.querySelector('.hour-hand').style.transform = `rotate(${hourDeg}deg)`;
    document.querySelector('.minute-hand').style.transform = `rotate(${minuteDeg}deg)`;
    document.querySelector('.second-hand').style.transform = `rotate(${secondDeg}deg)`;

    // Update digital time
    const digitalTime = document.querySelector('.digital-time');
    digitalTime.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Set up clock numbers
function setupClockNumbers() {
    for (let i = 1; i <= 12; i++) {
        const number = document.querySelector(`.number${i}`);
        const rotation = i * 30; // 360° / 12 = 30° per number
        number.style.setProperty('--rotation', `${rotation}deg`);
    }
}

// Stopwatch functionality
let stopwatchInterval;
let stopwatchTime = 0;
let stopwatchRunning = false;

function updateStopwatch() {
    const hours = Math.floor(stopwatchTime / 3600);
    const minutes = Math.floor((stopwatchTime % 3600) / 60);
    const seconds = stopwatchTime % 60;

    document.querySelector('.stopwatch-display').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

document.getElementById('startStopwatch').addEventListener('click', () => {
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            updateStopwatch();
        }, 1000);
    }
});

document.getElementById('stopStopwatch').addEventListener('click', () => {
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);
});

document.getElementById('resetStopwatch').addEventListener('click', () => {
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    updateStopwatch();
});

// Timer functionality
let timerInterval;
let timerTime = 0;
let timerRunning = false;

function updateTimer() {
    const minutes = Math.floor(timerTime / 60);
    const seconds = timerTime % 60;
    document.querySelector('.timer-display').textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

document.getElementById('startTimer').addEventListener('click', () => {
    if (!timerRunning) {
        const minutesInput = parseInt(document.getElementById('minutes').value) || 0;
        const secondsInput = parseInt(document.getElementById('seconds').value) || 0;
        
        if (minutesInput === 0 && secondsInput === 0) return;
        
        timerTime = minutesInput * 60 + secondsInput;
        timerRunning = true;
        
        timerInterval = setInterval(() => {
            if (timerTime > 0) {
                timerTime--;
                updateTimer();
            } else {
                timerRunning = false;
                clearInterval(timerInterval);
                alert('Timer finished!');
            }
        }, 1000);
    }
});

document.getElementById('stopTimer').addEventListener('click', () => {
    timerRunning = false;
    clearInterval(timerInterval);
});

document.getElementById('resetTimer').addEventListener('click', () => {
    timerRunning = false;
    clearInterval(timerInterval);
    timerTime = 0;
    updateTimer();
    document.getElementById('minutes').value = '';
    document.getElementById('seconds').value = '';
});

// Initialize
setupClockNumbers();
setInterval(updateClock, 1000);
updateClock(); 