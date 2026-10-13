#!/usr/bin/env python3
"""Serve this course on an available, remembered loopback port."""
import argparse
import errno
import json
import webbrowser
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / 'docs'
STATE = ROOT / 'server.local.json'
DEFAULT_PORT = 8341


def remembered_port():
    try:
        port = json.loads(STATE.read_text()).get('port')
        if isinstance(port, int) and not isinstance(port, bool) and 1 <= port <= 65535:
            return port
    except (OSError, ValueError, AttributeError):
        pass
    return DEFAULT_PORT


def create_server(port):
    handler = partial(SimpleHTTPRequestHandler, directory=str(DOCS))
    # Bind directly, without a separate availability check that could race.
    for candidate in [*range(port, min(port + 32, 65536)), 0]:
        try:
            return ThreadingHTTPServer(('127.0.0.1', candidate), handler)
        except OSError as error:
            if error.errno != errno.EADDRINUSE:
                raise
    raise RuntimeError('No se pudo abrir un puerto local.')


def main():
    parser = argparse.ArgumentParser(description='Servidor local de Music Study Planner')
    parser.add_argument('--port', type=int, help='Puerto preferido; si está ocupado, busca otro libre')
    parser.add_argument('--open', action='store_true', help='Abrir el panel en el navegador')
    args = parser.parse_args()
    preferred = args.port if args.port is not None else remembered_port()
    if not 1 <= preferred <= 65535:
        parser.error('El puerto debe estar entre 1 y 65535.')
    if not (DOCS / 'index.html').is_file():
        parser.error('No se encuentra docs/index.html junto a serve.py.')
    with create_server(preferred) as server:
        port = server.server_address[1]
        url = f'http://127.0.0.1:{port}/'
        try:
            STATE.write_text(json.dumps({'port': port, 'url': url}, indent=2) + '\n')
        except OSError as error:
            print(f'No se pudo recordar el puerto: {error}', flush=True)
        print('Music Study Planner · servidor local', flush=True)
        if port != preferred:
            print(f'El puerto {preferred} estaba ocupado; se utiliza {port}.', flush=True)
            print('Si tenías estados en la URL anterior, usa Exportar / Importar cambios.', flush=True)
        print(f'Abre {url}', flush=True)
        if args.open:
            webbrowser.open(url)
        print('Para detener este servidor: Ctrl+C.', flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print('\nServidor detenido.', flush=True)


if __name__ == '__main__':
    main()
