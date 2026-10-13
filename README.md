# Music Study Planner

Panel estático reutilizable con Lista, Kanban, Gantt, búsqueda, filtros, estados directos y edición de fechas/notas. Diseño compartido con el panel de referencia; HTML, CSS y JavaScript sin compilación.

## Uso local

Ejecutar `python3 -m http.server 8000 --bind 127.0.0.1 --directory docs` y abrir http://127.0.0.1:8000. No usar file://.

## Publicación

GitHub Pages: Settings → Pages → Deploy from a branch → main → /docs. El acceso desde la raíz también redirige a docs/, por compatibilidad con la configuración anterior.

## Datos y cambios

El ejemplo inicial contiene cuatro tareas ficticias. Para elegir otro curso, desbloquear con la clave de `ACCESS.local.txt` de este repo y cargar su `docs/data.json`. Se procesa y recuerda en el navegador, y la edición vuelve a bloquearse tras cargarlo. Los datos no se envían a un servidor. Los originales del curso permanecen fuera del repo público.

Los cambios se guardan por ID de curso y edición académica. Exportar/importar cambios permite trasladar estado, fechas y notas; recargar bloquea la edición sin perderlos. Se valida el ID de curso, versión, tareas, estados, fechas y notas. No hay sincronización automática ni escritura en Moodle o GitHub.

La clave local evita cambios casuales, pero no autentica usuarios ni oculta el contenido del sitio. `docs/config.js` solo contiene su hash. No publicar `ACCESS.local.txt`, materiales privados ni exports personales.

## Archivos

- docs/index.html, tokens.css, style.css y app.js: interfaz.
- docs/data.json: datos y reglas del ejemplo.
- docs/config.js: hash de clave local.
- docs/calendar.ics: calendario del ejemplo, sin eventos reales.
- tests/panel.test.cjs: pruebas sin dependencias; ejecutar `node tests/panel.test.cjs`.

Los repositorios de cada curso contienen su análisis, calendario, CSV y materiales locales; el proyecto de grupo tiene un repositorio distinto.
