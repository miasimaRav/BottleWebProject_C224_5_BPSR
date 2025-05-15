from bottle import Bottle, run, template, static_file, request, response, debug
from routes import setup_routes
import json, os, sys

# ������ ��������� ���������� Bottle
app = Bottle()


# routes contains the HTTP handlers for our server and must be imported.
import routes
from bottle import Bottle, static_file

if '--debug' in sys.argv[1:] or 'SERVER_DEBUG' in os.environ:
    # Debug mode will enable more verbose output in the console window.
    # It must be set at the beginning of the script.
    debug(True)

def wsgi_app():
    """Returns the application to make available through wfastcgi. This is used
    when the site is published to Microsoft Azure."""
    return app

if __name__ == '__main__':
    PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
    STATIC_ROOT = os.path.join(PROJECT_ROOT, 'static').replace('\\', '/')
    HOST = os.environ.get('SERVER_HOST', 'localhost')
    try:
        PORT = int(os.environ.get('SERVER_PORT', '5555'))
    except ValueError:
        PORT = 5555

    @app.route('/static/<filepath:path>')
    def server_static(filepath):
        return static_file(filepath, root='./static')


    # Starts a local test server.
    run(app, server='wsgiref', host=HOST, port=PORT)