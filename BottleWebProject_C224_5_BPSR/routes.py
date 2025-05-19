from bottle import route, post, view, request, response
from datetime import datetime
from prim_method import generate_graph, prim_algorithm
from kruscal import handle_graph_data
import json

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
    return dict(title='Crascal algorithm', year=datetime.now().year, request=request)

@route('/dijkstra_method')
@view('dijkstra_method')
def dijkstra_method():
    return dict(title='Dijkstra algorithm', year=datetime.now().year, request=request)

@route('/FAQ')
@view('FAQ')
def FAQ():
    return dict(title='Frequently Asked Questions', year=datetime.now().year, request=request)

@post('/generate_graph')
def handle_generate_graph():
    data = request.json
    vertex_count = data['vertexCount']
    result = generate_graph(vertex_count)
    response.content_type = 'application/json'
    return json.dumps(result)

@post('/kruskal')
def kruskal_endpoint():
    try:
        data = request.json
        vertex_count = data.get('vertex_count')
        edges = data.get('edges', [])
        weight_mode = data.get('weight_mode', 'manual')

        result = handle_graph_data(vertex_count, edges, weight_mode)
        response.content_type = 'application/json'
        return json.dumps(result)
    except Exception as e:
        response.status = 500
        return json.dumps({'error': str(e)})

@post('/prim')
def handle_prim():
    data = request.json
    vertex_count = data['vertexCount']
    edges = data['edges']
    start_vertex = data['startVertex']
    result = prim_algorithm(vertex_count, edges, start_vertex)
    response.content_type = 'application/json'
    return json.dumps(result)

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

    app.route('/generate_graph', method='POST', callback=handle_generate_graph)
    app.route('/kruskal', method='POST', callback=kruskal_endpoint)
    app.route('/prim', method='POST', callback=handle_prim)
