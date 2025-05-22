import sys
import random
import json
from bottle import Bottle, route, post, view, request, response
from datetime import datetime
import os
from prim_method import generate_graph_endpoint, prim_endpoint, log_prim_endpoint
from kruscal import handle_graph_data  # Предполагается, что этот импорт уже есть
import floyd_logic
import dijkstra_logic

app = Bottle()

# Подключаем маршруты из floyd_logic и dijkstra_logic
app.merge(floyd_logic.app)
app.merge(dijkstra_logic.app)

# Добавляем поддержку CORS
@app.hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

@app.route('/<:path>', method='OPTIONS')
def handle_options(path):
    return {}

# Основные страницы
@route('/')
@route('/home')
@view('index')
def home():
    return dict(year=datetime.now().year, request=request)

@route('/contact')
@view('contact')
def contact():
    return dict(title='Contact', message='Your contact page.', year=datetime.now().year, request=request)

@route('/about')
@view('about')
def about():
    return dict(title='About', message='Your application description page.', year=datetime.now().year, request=request)

@route('/floid_method')
@view('floid_method')
def floid_method():
    return dict(title='Floyd Warshall algorithm', year=datetime.now().year, request=request)

@route('/prim_method')
@view('prim_method')
def prim_method():
    return dict(title='Prim algorithm', year=datetime.now().year, request=request)

@route('/crascal_method')
@view('crascal_method')
def crascal_method():
    return dict(title='Kruskal algorithm', year=datetime.now().year, request=request)

@route('/dijkstra_method')
@view('dijkstra_method')
def dijkstra_method():
    return dict(title='Dijkstra algorithm', year=datetime.now().year, request=request)

@route('/FAQ')
@view('FAQ')
def FAQ():
    return dict(title='Frequently Asked Questions', year=datetime.now().year, request=request)

# API маршруты
@app.route('/generate_graph', method='POST')
def generate_graph_route():
    return generate_graph_endpoint()

@app.route('/prim', method='POST')
def prim_route():
    return prim_endpoint()

@app.route('/log_prim', method='POST')
def log_prim_route():
    return log_prim_endpoint()

@app.route('/kruskal', method='POST')
def kruskal_endpoint():
    data = request.json
    vertex_count = data.get('vertex_count')
    edges = data.get('edges')
    weight_mode = data.get('weight_mode')
    
    if not vertex_count or vertex_count < 1 or vertex_count > 20:
        response.status = 400
        return {'error': 'Number of vertices must be between 1 and 20'}
    
    try:
        result = handle_graph_data(vertex_count, edges, weight_mode)
        
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'algorithm': 'kruskal',
            'vertex_count': vertex_count,
            'weight_mode': weight_mode,
            'initial_edges': [{'from': u, 'to': v, 'weight': w} for u, v, w in result['edges']],
            'mst_edges': [{'from': u, 'to': v, 'weight': w} for u, v, w in result['mst']],
            'total_weight': result['total_weight']
        }
        LOG_DIR = os.path.join(os.path.dirname(__file__), 'resources')
        os.makedirs(LOG_DIR, exist_ok=True)
        with open(os.path.join(LOG_DIR, 'kruskal_log.json'), 'w') as f:
            json.dump([log_entry], f, indent=4)
        
        return result
    except ValueError as e:
        response.status = 400
        return {'error': str(e)}

def setup_routes(app):
    app.route('/', method='GET', callback=home)
    app.route('/home', method='GET', callback=home)
    app.route('/contact', method='GET', callback=contact)
    app.route('/about', method='GET', callback=about)
    app.route('/floid_method', method='GET', callback=floid_method)
    app.route('/prim_method', method='GET', callback=prim_method)
    app.route('/crascal_method', method='GET', callback=crascal_method)
    app.route('/dijkstra_method', method='GET', callback=dijkstra_method)
    app.route('/FAQ', method='GET', callback=FAQ)
    app.route('/generate_graph', method='POST', callback=generate_graph_route)
    app.route('/prim', method='POST', callback=prim_route)
    app.route('/log_prim', method='POST', callback=log_prim_route)
    app.route('/kruskal', method='POST', callback=kruskal_endpoint)
    # Регистрация маршрутов для метода Флойда
    app.route('/floyd_calculate', method='POST', callback=floyd_logic.calculate_floyd)
    # Регистрация маршрутов для метода Дейкстры
    app.route('/dijkstra', method='GET', callback=dijkstra_logic.dijkstra_page)
    app.route('/dijkstra_calculate', method='POST', callback=dijkstra_logic.calculate_dijkstra)

# Привязываем маршруты к приложению
setup_routes(app)

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=8080)