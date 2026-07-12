import { createList } from './list.js';
import { renderDots, updateClock } from './pomodoro.js';

const tabBtns = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.panel');
const beepBtn = document.querySelector('.beep-btn');

beepBtn.addEventListener('click', () => {
  beep();
});

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
    if (btn.dataset.tab === 'capture') document.getElementById('captureInput').focus();
    if (btn.dataset.tab === 'tasks') document.getElementById('taskInput').focus();
  });
});


createList({
  storageKey: 'tasks:items',
  listEl: document.getElementById('taskList'),
  inputEl: document.getElementById('taskInput'),
  countEl: document.getElementById('taskCount'),
  clearBtn: document.getElementById('taskClear'),
  emptyText: 'Sin tareas todavía. Agrega lo que planeas hacer hoy.',
  singular: 'tarea pendiente',
  plural: 'tareas pendientes',
  allowDelete: true
});

createList({
  storageKey: 'aparcadero:items',
  listEl: document.getElementById('captureList'),
  inputEl: document.getElementById('captureInput'),
  countEl: document.getElementById('captureCount'),
  clearBtn: document.getElementById('captureClear'),
  emptyText: 'Nada agregado. Cuando algo te distraiga, anótalo aquí.',
  singular: 'pendiente',
  plural: 'pendientes',
  allowDelete: true
});

renderDots();
updateClock();