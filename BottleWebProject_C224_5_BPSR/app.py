from bottle import Bottle, run, static_file, debug
from routes import setup_routes
import os
import sys

app = Bottle()

# Настройка маршрутов
setup_routes(app)  # ВАЖНО: без этого ничего не заработает

# Включение режима отладки
if '--debug' in sys.argv[1:] or 'SERVER_DEBUG' in os.environ:
    debug(True)

# Обработка статики
@app.route('/static/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root='./static')

# Запуск сервера
if __name__ == '__main__':
    HOST = os.environ.get('SERVER_HOST', 'localhost')
    try:
        PORT = int(os.environ.get('SERVER_PORT', '5555'))
    except ValueError:
        PORT = 5555

    run(app, server='wsgiref', host=HOST, port=PORT)
