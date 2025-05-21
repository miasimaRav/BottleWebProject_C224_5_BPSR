from bottle import Bottle, route, view, request, response
from datetime import datetime
import os
import json
import random
from kruscal import handle_graph_data

app = Bottle()

LOG_DIR = os.path.join(os.path.dirname(__file__), 'resources')
os.makedirs(LOG_DIR, exist_ok=True)
LOG_FILE = os.path.join(LOG_DIR, 'log2.json')

log_data = []
try:
    with open(LOG_FILE, 'r') as f:
        log_data = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
    with open(LOG_FILE, 'w') as f:
        json.dump(log_data, f, indent=4)

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

def generate_graph(vertex_count):
    edges = []
    for i in range(1, vertex_count + 1):
        for j in range(i + 1, vertex_count + 1):
            weight = random.randint(1, 100)
            edges.append({'from': i, 'to': j, 'weight': weight})
    return {'edges': edges}

def prim_algorithm(vertex_count, edges, start_vertex):
    adj_matrix = [[float('inf')] * vertex_count for _ in range(vertex_count)]
    for edge in edges:
        i, j, w = edge['from'] - 1, edge['to'] - 1, edge['weight']
        adj_matrix[i][j] = w
        adj_matrix[j][i] = w

    visited = [False] * vertex_count
    visited[start_vertex - 1] = True
    mst_edges = []
    total_weight = 0

    for _ in range(vertex_count - 1):
        min_weight = float('inf')
        min_edge = None
        for u in range(vertex_count):
            if visited[u]:
                for v in range(vertex_count):
                    if not visited[v] and adj_matrix[u][v] < min_weight:
                        min_weight = adj_matrix[u][v]
                        min_edge = (u, v)

        if min_edge:
            u, v = min_edge
            mst_edges.append({'from': u + 1, 'to': v + 1, 'weight': min_weight})
            total_weight += min_weight
            visited[v] = True

    return {'mstEdges': mst_edges, 'totalWeight': total_weight}

@app.route('/generate_graph', method='POST')
def generate_graph_endpoint():
    data = request.json
    vertex_count = data.get('vertexCount')
    if not vertex_count or vertex_count < 1 or vertex_count > 12:
        response.status = 400
        return {'error': 'Number of vertices must be between 1 and 12'}
    graph = generate_graph(vertex_count)
    
    log_entry = {
        'timestamp': datetime.now().isoformat(),
        'operation': 'generate_graph',
        'vertex_count': vertex_count,
        'generated_edges': graph['edges']
    }
    log_data.append(log_entry)
    try:
        with open(LOG_FILE, 'w') as f:
            json.dump(log_data, f, indent=4)
    except Exception as e:
        print(f"Ошибка записи лога: {e}")
    
    return graph

@app.route('/prim', method='POST')
def prim_endpoint():
    data = request.json
    vertex_count = data.get('vertexCount')
    edges = data.get('edges')
    start_vertex = data.get('startVertex')
    weight_mode = data.get('weightMode')
    if not all([vertex_count, edges, start_vertex is not None]) or vertex_count < 1 or vertex_count > 12 or start_vertex < 1 or start_vertex > vertex_count:
        response.status = 400
        return {'error': 'Invalid input data'}
    
    result = prim_algorithm(vertex_count, edges, start_vertex)
    
    log_entry = {
        'timestamp': datetime.now().isoformat(),
        'algorithm': 'prim',
        'vertex_count': vertex_count,
        'weight_mode': weight_mode,
        'initial_edges': edges,
        'start_vertex': start_vertex,
        'mst_edges': result['mstEdges'],
        'total_weight': result['totalWeight']
    }
    log_data.append(log_entry)
    try:
        with open(LOG_FILE, 'w') as f:
            json.dump(log_data, f, indent=4)
    except Exception as e:
        print(f"Ошибка записи лога: {e}")

    return result

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
        log_data.append(log_entry)
        try:
            with open(LOG_FILE, 'w') as f:
                json.dump(log_data, f, indent=4)
        except Exception as e:
            print(f"Ошибка записи лога: {e}")
            
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
    app.route('/generate_graph', method='POST', callback=generate_graph_endpoint)
    app.route('/prim', method='POST', callback=prim_endpoint)
    app.route('/kruskal', method='POST', callback=kruskal_endpoint)