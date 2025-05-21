import sys
import random
import json
from bottle import Bottle, route, post, view, request, response
from datetime import datetime
import os
import floyd_logic
import dijkstra_logic

# Инициализация приложения Bottle
app = Bottle()

# Подключаем маршруты из floyd_logic и dijkstra_logic
app.merge(floyd_logic.app)
app.merge(dijkstra_logic.app)

# Инициализация файла лога с корректным путём
LOG_FILE = r"resources\log.json"
log_data = []

# Проверка и создание файла лога
if not os.path.exists(LOG_FILE):
    print(f"Файл {LOG_FILE} не найден. Создаю новый...")
    with open(LOG_FILE, 'w') as f:
        json.dump(log_data, f, indent=4)

try:
    with open(LOG_FILE, 'r') as f:
        log_data = json.load(f)
    print(f"Успешно загружено {len(log_data)} записей из {LOG_FILE}")
except (FileNotFoundError, json.JSONDecodeError) as e:
    print(f"Ошибка при загрузке лога: {e}. Использую пустой список.")
    log_data = []

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

@route('/kruskal_method')
@view('kruskal_method')
def kruskal_method():
    return dict(title='Kruskal algorithm', year=datetime.now().year, request=request)

@route('/dijkstra_method')
@view('dijkstra_method')
def dijkstra_method():
    return dict(title='Dijkstra algorithm', year=datetime.now().year, request=request)

@route('/FAQ')
@view('FAQ')
def FAQ():
    return dict(title='Frequently Asked Questions', year=datetime.now().year, request=request)

# Логика генерации графа для Прима
def generate_graph(vertex_count):
    edges = []
    for i in range(vertex_count):
        for j in range(i + 1, vertex_count):
            # Случайная вероятность создания ребра (70% шанс)
            if random.random() > 0.3:  # 30% шанса, что ребра не будет
                weight = random.randint(1, 100)  # Случайный вес
                edges.append({'from': i, 'to': j, 'weight': weight})
    return {'edges': edges}

# Логика алгоритма Прима
def prim_algorithm(vertex_count, edges, start_vertex):
    # Создание матрицы смежности
    adj_matrix = [[float('inf')] * vertex_count for _ in range(vertex_count)]
    for edge in edges:
        i, j, w = edge['from'], edge['to'], edge['weight']
        adj_matrix[i][j] = w
        adj_matrix[j][i] = w

    # Алгоритм Прима
    visited = [False] * vertex_count
    visited[start_vertex] = True
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
            mst_edges.append({'from': u, 'to': v, 'weight': min_weight})
            total_weight += min_weight
            visited[v] = True
        else:
            break  # Прерываем, если больше нет соединений

    return {'mstEdges': mst_edges, 'totalWeight': total_weight}

# API-эндпоинты для Прима
@app.route('/generate_graph', method='POST')
def generate_graph_endpoint():
    data = request.json
    vertex_count = data.get('vertexCount')
    if not vertex_count or vertex_count < 1 or vertex_count > 12:
        response.status = 400
        return {'error': 'Number of vertices must be between 1 and 12'}
    graph = generate_graph(vertex_count)
    return graph

@app.route('/prim', method='POST')
def prim_endpoint():
    data = request.json
    vertex_count = data.get('vertexCount')
    edges = data.get('edges')
    start_vertex = data.get('startVertex')
    weight_mode = data.get('weightMode')
    if not all([vertex_count, edges, start_vertex is not None]) or vertex_count < 1 or vertex_count > 12 or start_vertex >= vertex_count:
        response.status = 400
        return {'error': 'Invalid input data'}
    
    result = prim_algorithm(vertex_count, edges, start_vertex)
    
    # Логирование после построения MST
    log_entry = {
        'timestamp': datetime.now().isoformat(),
        'vertex_count': vertex_count,
        'weight_mode': weight_mode if weight_mode else ('manual' if any(edge.get('manual') for edge in edges) else 'auto'),
        'initial_edges': edges,
        'start_vertex': start_vertex,
        'mst_edges': result['mstEdges'],
        'total_weight': result['totalWeight'],
        'algorithm': 'Prim'
    }
    log_data.append(log_entry)
    try:
        with open(LOG_FILE, 'w') as f:
            json.dump(log_data, f, indent=4)
        print(f"Лог успешно записан в {LOG_FILE}")
    except Exception as e:
        print(f"Ошибка при записи лога: {e}")

    return result

def setup_routes(app):
    app.route('/', method='GET', callback=home)
    app.route('/home', method='GET', callback=home)
    app.route('/contact', method='GET', callback=contact)
    app.route('/about', method='GET', callback=about)
    app.route('/floid_method', method='GET', callback=floid_method)
    app.route('/prim_method', method='GET', callback=prim_method)
    app.route('/kruskal_method', method='GET', callback=kruskal_method)
    app.route('/dijkstra_method', method='GET', callback=dijkstra_method)
    app.route('/generate_graph', method='POST', callback=generate_graph_endpoint)
    app.route('/prim', method='POST', callback=prim_endpoint)
    app.route('/FAQ', method='GET', callback=FAQ)
    # Регистрация маршрутов для метода Флойда
    app.route('/floyd', method='GET', callback=floyd_logic.floyd_page)
    app.route('/floyd_calculate', method='POST', callback=floyd_logic.calculate_floyd)
    # Регистрация маршрутов для метода Дейкстры
    app.route('/dijkstra', method='GET', callback=dijkstra_logic.dijkstra_page)
    app.route('/dijkstra_calculate', method='POST', callback=dijkstra_logic.calculate_dijkstra)

# Привязываем маршруты к приложению
setup_routes(app)

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=8080)