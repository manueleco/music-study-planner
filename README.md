# Music Study Planner

Página estática de Gantt, tareas, instrucciones y recursos para organizar el estudio. Incluye un ejemplo ficticio; el repositorio público no incorpora materiales docentes, datos del curso ni progreso personal.

## Uso

Abrir `index.html` o visitar la página una vez publicado GitHub Pages. Seleccionar **Cargar plan (.json)** y elegir el `plan.json` del repositorio privado de tu curso. El archivo se procesa en el navegador, sin enviarlo a GitHub ni a otro servidor.

Las tareas incluyen fechas, periodos propuestos, instrucciones, dependencias y enlaces web. Los enlaces a materiales locales no se publican en esta interfaz. El progreso se conserva por curso en el navegador. **Exportar plan y progreso** permite transferirlo a otro dispositivo; no hay sincronización automática.

## Publicar con GitHub Pages

En GitHub: **Settings → Pages → Source: Deploy from a branch → main → /(root) → Save**.

URL esperada una vez activada: https://manueleco.github.io/music-study-planner/

La subida del código no garantiza que Pages esté activado; revisar la configuración y la URL que muestre GitHub. El sitio se puede publicar sin instalar dependencias ni compilar.

## Formato del plan

El archivo necesita `course` y `tasks`. Cada tarea necesita `id`, `title`, `start` y `end`; fechas en formato ISO `YYYY-MM-DD`. Campos opcionales: `group`, `deadline`, `kind`, `action`, `instructions`, `original`, `instructionNote`, `where`, `materials`, `depends`, `hours` y `state`. `resources` enlaza cada recurso con su `section`.

El plan del curso vive en [upf-mpc-2026](https://github.com/manueleco/upf-mpc-2026). El trabajo en grupo se gestionará en su propio repositorio.
