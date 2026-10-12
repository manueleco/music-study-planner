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

## Estados de tareas

Cada tarea permite elegir **Por hacer**, **En progreso**, **Hecho** o **Por confirmar**, y filtrar por estado. Se guardan localmente en el navegador. Las marcas booleanas de versiones anteriores se interpretan como Hecho/Por hacer. Las tareas con configuración pendiente de confirmar o hitos tentativos empiezan como Por confirmar. El estado no modifica Moodle.

## Mismo plan en local y online

La primera visita muestra cuatro tareas ficticias. Carga el `plan.json` del curso una vez: el navegador recuerda el plan y lo recupera en visitas posteriores. **Mostrar todas las tareas** elimina los filtros de grupo, estado y pendientes; el contador indica cuántas tareas están visibles. La página local usa la misma interfaz, con el plan completo incorporado y acceso a los archivos locales.
