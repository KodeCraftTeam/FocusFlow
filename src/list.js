import { escapeHtml, formatTime } from './utils.js';

export function createList({ storageKey, listEl, inputEl, countEl, clearBtn, emptyText, singular, plural, allowDelete }) {
  let items = [];

  function load() {
    try {
      const res = localStorage.getItem(storageKey);
      items = res ? JSON.parse(res) : [];
    } catch (e) { items = []; }
    render();
  }

  function save() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    }
    catch (e) {
      console.error('No se pudo guardar', e);
    }
  }

  function render() {
    listEl.innerHTML = '';
    if (items.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = emptyText;
      listEl.appendChild(empty);
    } else {
      items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'item' + (item.done ? ' done' : '');
        el.innerHTML = `
            <div class="checkbox"></div>
            <div class="item-text">${escapeHtml(item.text)}</div>
            <div class="timestamp">${formatTime(item.ts)}</div>
            ${allowDelete ? '<button class="del-btn">×</button>' : ''}
          `;
        el.querySelector('.checkbox').addEventListener('click', () => toggleDone(item.id));
        if (allowDelete) {
          el.querySelector('.del-btn').addEventListener('click', () => removeItem(item.id));
        }
        listEl.appendChild(el);
      });
    }

    const pending = items.filter(i => !i.done).length;

    countEl.textContent = pending > 0
      ? `${pending} ${pending === 1 ? singular : plural}`
      : (items.length > 0 ? 'todo resuelto' : '');
  }

  function addItem(text) {
    if (!text.trim()) return;
    items.push({ id: Date.now() + Math.random(), text: text.trim(), done: false, ts: Date.now() });
    save();
    render();
  }

  function toggleDone(id) {
    const item = items.find(i => i.id === id);
    if (!item) return;
    item.done = !item.done;
    save();
    render();
  }

  function removeItem(id) {
    items = items.filter(i => i.id !== id);
    save();
    render();
  }

  function clearCompleted() {
    items = items.filter(i => !i.done);
    save();
    render();
  }

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { addItem(inputEl.value); inputEl.value = ''; }
  });
  clearBtn.addEventListener('click', clearCompleted);

  load();
}