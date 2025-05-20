from bottle import Bottle, run, static_file, debug, request
from routes import setup_routes
import os
import sys
import json

app = Bottle()

# Функция для загрузки переводов
def load_translations():
    translations = {}
    for lang in ['en', 'ru']:
        with open(os.path.join('translations', f'{lang}.json'), 'r', encoding='utf-8') as f:
            translations[lang] = json.load(f)
    return translations

translations = load_translations()

# Функция для получения текущего языка
def get_current_lang():
    lang = request.query.get('lang', 'en')  # По умолчанию английский
    return lang if lang in ['en', 'ru'] else 'en'

# Настройка маршрутов
setup_routes(app)

# Включение режима отладки
if '--debug' in sys.argv[1:] or 'SERVER_DEBUG' in os.environ:
    debug(True)

# Обработка статики
@app.route('/static/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root='./static')

# Перехват всех маршрутов для передачи языка и переводов
@app.hook('before_request')
def set_language():
    lang = get_current_lang()
    request.lang = lang
    request.translations = translations[lang]

# Запуск сервера
if __name__ == '__main__':
    HOST = os.environ.get('SERVER_HOST', 'localhost')
    try:
        PORT = int(os.environ.get('SERVER_PORT', '5555'))
    except ValueError:
        PORT = 5555

    run(app, server='wsgiref', host=HOST, port=PORT)

