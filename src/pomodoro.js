const pomoClock = document.getElementById('pomoClock');
const pomoModeLabel = document.getElementById('pomoModeLabel');
const pomoToggle = document.getElementById('pomoToggle');
const pomoReset = document.getElementById('pomoReset');
const pomoSkip = document.getElementById('pomoSkip');
const pomoDots = document.getElementById('pomoDots');
const setFocus = document.getElementById('setFocus');
const setShort = document.getElementById('setShort');
const setLong = document.getElementById('setLong');

let durations = { focus: 25, short: 5, long: 15 };
let mode = 'focus';
let secondsLeft = durations.focus * 60;
let running = false;
let timerId = null;
let cyclesCompleted = 0;

pomoToggle.addEventListener('click', () => {
  running = !running;
  pomoToggle.textContent = running ? 'pausar' : 'iniciar';
  if (running) {
    timerId = setInterval(tick, 1000);
  } else {
    clearInterval(timerId);
  }
});

pomoReset.addEventListener('click', () => {
  running = false;
  clearInterval(timerId);
  pomoToggle.textContent = 'iniciar';
  setMode(mode);
});

pomoSkip.addEventListener('click', () => {
  running = false;
  clearInterval(timerId);
  pomoToggle.textContent = 'iniciar';
  if (mode === 'focus') {
    cyclesCompleted++;
    renderDots();
    setMode(cyclesCompleted % 4 === 0 ? 'long' : 'short');
  } else {
    setMode('focus');
  }
});

[setFocus, setShort, setLong].forEach(inp => {
  inp.addEventListener('change', () => {
    durations.focus = Number.parseInt(setFocus.value) || 25;
    durations.short = Number.parseInt(setShort.value) || 5;
    durations.long = Number.parseInt(setLong.value) || 15;
    if (!running) setMode(mode);
  });
});

export function renderDots() {
  pomoDots.innerHTML = '';
  for (let i = 0; i < 4; i++) {
    const dot = document.createElement('div');
    dot.className = 'pomo-dot' + (i < (cyclesCompleted % 4) ? ' filled' : '');
    pomoDots.appendChild(dot);
  }
}

export function updateClock() {
  const m = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
  const s = (secondsLeft % 60).toString().padStart(2, '0');
  pomoClock.textContent = `${m}:${s}`;
  document.title = running ? `${m}:${s} · FocusFlow` : 'FocusFlow';
}

function setMode(newMode) {
  mode = newMode;
  const map = { focus: 'enfoque', short: 'descanso corto', long: 'descanso largo' };
  pomoModeLabel.textContent = map[mode];
  pomoModeLabel.className = 'pomo-mode ' + (mode === 'focus' ? 'focus' : 'break');
  secondsLeft = durations[mode === 'focus' ? 'focus' : mode === 'short' ? 'short' : 'long'] * 60;
  updateClock();
}

function beep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 660;
    gain.gain.setValueAtTime(0.051, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.95, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.051, ctx.currentTime + 0.5);
    osc.start();
    osc.stop(ctx.currentTime + 0.55);
  } catch (e) { }
}

function tick() {
  if (secondsLeft > 0) {
    secondsLeft--;
    updateClock();
  } else {
    beep();
    if (mode === 'focus') {
      cyclesCompleted++;
      renderDots();
      setMode(cyclesCompleted % 4 === 0 ? 'long' : 'short');
    } else {
      setMode('focus');
    }
    running = false;
    pomoToggle.textContent = 'iniciar';
    clearInterval(timerId);
    updateClock();
  }
}

