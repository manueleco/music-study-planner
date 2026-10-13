# Music Study Planner

Panel estático reutilizable con Lista, Kanban, Gantt, búsqueda, filtros, estados directos y edición de fechas/notas. Diseño compartido con el panel de referencia; HTML, CSS y JavaScript sin compilación.

## Uso local

Desde la carpeta del repositorio, ejecutar `python3 scripts/serve.py --open`. Usa el puerto 8341 como preferencia, recuerda el elegido en `server.local.json` y busca uno libre si está ocupado. También admite `--port 8401`. Abrir la URL que indique; no usar file://.

Los estados pertenecen a la URL del navegador. Si cambia el puerto, trasladarlos con Exportar / Importar cambios desde la URL anterior.

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

Para regenerar la clave en otra máquina, ejecutar `python3 scripts/set_edit_key.py`. Introducirla en el prompt; no se escribe en el historial del shell. Para la web publicada, el nuevo hash de docs/config.js debe subirse y desplegarse antes de usar esa clave. La clave en texto queda solo en ACCESS.local.txt.
