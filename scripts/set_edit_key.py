from pathlib import Path
from getpass import getpass
from hashlib import sha256

root=Path(__file__).resolve().parents[1]
key=getpass('Nueva clave de edición local: ')
if not key:raise SystemExit('La clave no puede estar vacía.')
(root/'docs/config.js').write_text('window.ACCESS_HASH = "'+sha256(key.encode()).hexdigest()+'";\n')
file=root/'ACCESS.local.txt';file.write_text('Clave de edición local del panel: '+key+'\n');file.chmod(0o600)
print('Hash actualizado en docs/config.js; clave guardada en ACCESS.local.txt, fuera de Git.')
