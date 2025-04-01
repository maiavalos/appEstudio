// Función de Modo Nocturno
const toggleButton = document.getElementById('toggle-theme');
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('night-mode');
  const mode = document.body.classList.contains('night-mode') ? 'Modo Diurno' : 'Modo Nocturno';
  toggleButton.textContent = mode;
});

// Pomodoro Timer
let pomodoroTimer;
let isPomodoroRunning = false;
let timeRemaining = 25 * 60; // 25 minutos

const startButton = document.getElementById('start-pomodoro');
const resetButton = document.getElementById('reset-pomodoro');
const timeDisplay = document.getElementById('time');

startButton.addEventListener('click', () => {
  if (!isPomodoroRunning) {
    pomodoroTimer = setInterval(updatePomodoro, 1000);
    startButton.textContent = "Pausar Pomodoro";
    isPomodoroRunning = true;
  } else {
    clearInterval(pomodoroTimer);
    startButton.textContent = "Reanudar Pomodoro";
    isPomodoroRunning = false;
  }
});

resetButton.addEventListener('click', () => {
  clearInterval(pomodoroTimer);
  timeRemaining = 25 * 60;
  timeDisplay.textContent = formatTime(timeRemaining);
  startButton.textContent = "Iniciar Pomodoro";
  isPomodoroRunning = false;
});

function updatePomodoro() {
  if (timeRemaining > 0) {
    timeRemaining--;
    timeDisplay.textContent = formatTime(timeRemaining);
  } else {
    clearInterval(pomodoroTimer);
    alert('¡Pomodoro terminado! Toma un descanso.');
    startButton.textContent = "Iniciar Pomodoro";
    isPomodoroRunning = false;
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
}

// Generador Automático de Horarios
const generateScheduleButton = document.getElementById('generate-schedule');
const scheduleOutput = document.getElementById('schedule-output');

generateScheduleButton.addEventListener('click', () => {
  scheduleOutput.innerHTML = `<p>Tu horario ha sido generado basado en tu disponibilidad. ¡Recuerda organizar tus estudios!</p>`;
});

// Bloqueo de Distracciones
const blockButton = document.getElementById('block-distractions');

blockButton.addEventListener('click', () => {
  alert('¡Redes sociales bloqueadas! Evita distracciones y concéntrate en tus estudios.');
});

document.addEventListener("DOMContentLoaded", function () {
    generateScheduleTable();
});

document.addEventListener("DOMContentLoaded", function () {
    generateScheduleTable(); // Generar tabla de horarios al cargar
  
    document.getElementById("toggle-theme").addEventListener("click", toggleTheme);
    document.getElementById("block-distractions").addEventListener("click", blockDistractions);
  });
  
  function toggleTheme() {
    document.body.classList.toggle("night-mode");
    document.getElementById("toggle-theme").textContent = 
      document.body.classList.contains("night-mode") ? "Modo Diurno" : "Modo Nocturno";
  }
  
  function blockDistractions() {
    alert("¡Redes sociales bloqueadas! Evita distracciones y concéntrate en tus estudios.");
  }
  
  function generateScheduleTable() {
    let tbody = document.querySelector("#schedule tbody");
    tbody.innerHTML = ""; // Limpia la tabla antes de generarla
  
    for (let hour = 7; hour <= 22; hour++) { // Horario de 7:00 a 22:00
      let row = document.createElement("tr");
  
      // Celda de la hora
      let timeCell = document.createElement("td");
      timeCell.textContent = `${hour}:00 - ${hour + 1}:00`;
      row.appendChild(timeCell);
  
      // Celdas para cada día de la semana
      for (let i = 1; i <= 7; i++) {
        let cell = document.createElement("td");
        cell.dataset.hour = hour;
        cell.dataset.day = i;
        row.appendChild(cell);
      }
  
      tbody.appendChild(row);
    }
  }
  
  function addActivity() {
    let activityName = document.getElementById("activity").value;
    let day = document.getElementById("day").value;
    let startTime = parseInt(document.getElementById("start").value.split(":")[0]);
    let endTime = parseInt(document.getElementById("end").value.split(":")[0]);
  
    if (!activityName || isNaN(startTime) || isNaN(endTime) || startTime >= endTime) {
      alert("Por favor, ingresa datos válidos.");
      return;
    }
  
    let cells = document.querySelectorAll(`#schedule tbody td[data-day="${day}"]`);
    
    for (let cell of cells) {
      let cellHour = parseInt(cell.dataset.hour);
      
      if (cellHour >= startTime && cellHour < endTime) {
        cell.innerHTML += `<div class="activity">${activityName}</div>`;
        cell.style.backgroundColor = "#D1C4E9"; // Color para resaltar
      }
    }
  }
  
