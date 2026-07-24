import { createList } from './list.js';
import { renderDots, updateClock } from './pomodoro.js';

const tabBtns = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
    if (btn.dataset.tab === 'tasks') document.getElementById('taskInput').focus();
    if (btn.dataset.tab === 'work') document.getElementById('workInput').focus();
    if (btn.dataset.tab === 'university') document.getElementById('universityInput').focus();
    if (btn.dataset.tab === 'occurrence') document.getElementById('occurrenceInput').focus();
    if (btn.dataset.tab === 'pomodoro') {
      renderDots();
      updateClock();
    }
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
  listEl: document.getElementById('occurrenceList'),
  inputEl: document.getElementById('occurrenceInput'),
  countEl: document.getElementById('occurrenceCount'),
  clearBtn: document.getElementById('occurrenceClear'),
  emptyText: 'Nada agregado. Cuando algo se te ocurra, anótalo aquí.',
  singular: 'pendiente',
  plural: 'pendientes',
  allowDelete: true
});

createList({
  storageKey: 'trabajo:items',
  listEl: document.getElementById('workList'),
  inputEl: document.getElementById('workInput'),
  countEl: document.getElementById('workCount'),
  clearBtn: document.getElementById('workClear'),
  emptyText: 'Nada agregado. Cuando algo se te ocurra, anótalo aquí.',
  singular: 'pendiente',
  plural: 'pendientes',
  allowDelete: true
});

createList({
  storageKey: 'empresa:items',
  listEl: document.getElementById('enterpriseList'),
  inputEl: document.getElementById('enterpriseInput'),
  countEl: document.getElementById('enterpriseCount'),
  clearBtn: document.getElementById('enterpriseClear'),
  emptyText: 'Nada agregado. Cuando algo se te ocurra, anótalo aquí.',
  singular: 'pendiente',
  plural: 'pendientes',
  allowDelete: true
});

createList({
  storageKey: 'universidad:items',
  listEl: document.getElementById('universityList'),
  inputEl: document.getElementById('universityInput'),
  countEl: document.getElementById('universityCount'),
  clearBtn: document.getElementById('universityClear'),
  emptyText: 'Nada agregado. Cuando algo se te ocurra, anótalo aquí.',
  singular: 'pendiente',
  plural: 'pendientes',
  allowDelete: true
});

