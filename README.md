# FocusFlow

App web simple de productividad: tareas del día, un "aparcadero" de ideas sueltas, y temporizador Pomodoro. Todo en HTML/CSS/JS puro, sin frameworks ni build step.
```
<a href="https://kodecraftteam.github.io/FocusFlow/">FocusFlow<a>
```
## Funcionalidades

**Tareas** — lista de pendientes del día. Marcar como hecha, borrar, contador de pendientes.

**Aparcadero** — captura rápida de ideas/distracciones para no perder el foco en la tarea actual. Misma mecánica que Tareas (checkbox, borrar, contador).

**Pomodoro** — temporizador con ciclos enfoque/descanso:
- Enfoque configurable (default 25 min)
- Descanso corto tras cada ciclo (default 5 min)
- Descanso largo cada 4 ciclos (default 15 min)
- Indicador de progreso (puntos) y beep sonoro al terminar cada fase
- Duraciones ajustables desde la UI

## Estructura

```
index.html          UI y marcado de las 3 pestañas
style.css            estilos (tema oscuro, monoespaciado)
src/
  main.js            entrada: tabs, wiring de listas de tareas/aparcadero
  list.js             lógica reusable de listas (crear, marcar, borrar, persistir)
  pomodoro.js          lógica del temporizador y beep
  utils.js              helpers (escapeHtml, formatTime)
```

`main.js` se carga como módulo ES (`<script type="module">`) e importa del resto de archivos en `src/`.

## Persistencia

Cada lista (tareas, aparcadero) guarda su estado en `localStorage` bajo su propia key (`tasks:items`, `aparcadero:items`). Datos persisten entre recargas, por navegador/dispositivo — no hay backend ni sincronización entre dispositivos.

## Despliegue

Pensada para GitHub Pages: sin build step, sin dependencias, sirve directo desde la raíz del repo.

## Notas técnicas

- Sin dependencias externas, sin `package.json` — no hace falta build ni npm.
- Beep generado con Web Audio API (`AudioContext`), sin archivos de audio.
- Hay un botón `.beep-btn` con listener duplicado (en `main.js` y `pomodoro.js`); el de `main.js` llama a una función `beep()` que no está definida en ese scope — revisar si es necesario.
