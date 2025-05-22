import random
from bottle import request, response
from datetime import datetime
import os
import json

# Определение директории для логов
LOG_DIR = os.path.join(os.path.dirname(__file__), 'resources')
os.makedirs(LOG_DIR, exist_ok=True)

# Файл лога для алгоритма Прима
PRIM_LOG_FILE = os.path.join(LOG_DIR, 'prim_log.json')

# Инициализация лога
def initialize_log(log_file):
    log_data = []
    try:
        with open(log_file, 'r') as f:
            log_data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        with open(log_file, 'w') as f:
            json.dump(log_data, f, indent=4)
    return log_data

prim_log_data = initialize_log(PRIM_LOG_FILE)

# Функция для записи в лог
def log_operation(log_data, log_file, entry):
    log_data.append(entry)
    try:
        with open(log_file, 'w') as f:
            json.dump(log_data, f, indent=4)
    except Exception as e:
        print(f"Ошибка записи лога в {log_file}: {e}")

def generate_graph(vertex_count):
    edges = []
    # Гарантируем минимальную связность: соединяем каждую вершину хотя бы с одной
    for i in range(vertex_count):
        if i < vertex_count - 1:
            weight = random.randint(1, 100)
            edges.append({'from': i, 'to': i + 1, 'weight': weight})
    
    # Добавляем случайные рёбра с вероятностью 70%
    for i in range(vertex_count):
        for j in range(i + 1, vertex_count):
            if random.random() > 0.3 and (i, j) not in [(e['from'], e['to']) for e in edges]:
                weight = random.randint(1, 100)
                edges.append({'from': i, 'to': j, 'weight': weight})
    
    print(f"Generated edges for {vertex_count} vertices: {edges}")
    return {'edges': edges}

def prim_algorithm(vertex_count, edges, start_vertex):
    print(f"Запуск prim_algorithm с vertex_count={vertex_count}, start_vertex={start_vertex}, edges={edges}")
    
    # Проверка входных данных
    if vertex_count <= 0:
        raise ValueError("Количество вершин должно быть положительным")
    if start_vertex < 0 or start_vertex >= vertex_count:
        raise ValueError("Начальная вершина должна быть в пределах диапазона вершин")
    
    for edge in edges:
        if edge['from'] < 0 or edge['from'] >= vertex_count or edge['to'] < 0 or edge['to'] >= vertex_count:
            raise IndexError("Индекс вершины ребра вне допустимого диапазона")

    # Создание матрицы смежности
    adj_matrix = [[float('inf')] * vertex_count for _ in range(vertex_count)]
    for edge in edges:
        i, j, w = edge['from'], edge['to'], edge['weight']
        if w == 0:
            continue
        adj_matrix[i][j] = w
        adj_matrix[j][i] = w

    # Инициализация алгоритма Прима
    visited = [False] * vertex_count
    visited[start_vertex] = True
    mst_edges = []
    total_weight = 0
    edges_used = 0

    # Симуляция очереди с приоритетами через список кандидатских ребер
    while edges_used < vertex_count - 1:
        min_weight = float('inf')
        min_edge = None

        # Находим ребро с минимальным весом от посещенных к непосещенным вершинам
        for u in range(vertex_count):
            if visited[u]:
                for v in range(vertex_count):
                    if not visited[v] and adj_matrix[u][v] != float('inf') and adj_matrix[u][v] < min_weight:
                        min_weight = adj_matrix[u][v]
                        min_edge = (u, v)

        # Если ребро не найдено, граф может быть несвязным
        if min_edge is None:
            print("Граф несвязный. MST включает только достижимые вершины.")
            break

        u, v = min_edge
        mst_edges.append({'from': u, 'to': v, 'weight': min_weight})
        total_weight += min_weight
        visited[v] = True
        edges_used += 1
        print(f"Добавлено ребро в MST: {u} -> {v}, вес: {min_weight}")

    print(f"Рёбра MST: {mst_edges}, Общий вес: {total_weight}")
    return {'mstEdges': mst_edges, 'totalWeight': total_weight}

def generate_graph_endpoint():
    data = request.json
    vertex_count = data.get('vertexCount')
    weight_mode = data.get('weightMode')
    if not vertex_count or vertex_count < 1 or vertex_count > 12:
        response.status = 400
        return {'error': 'Number of vertices must be between 1 and 12'}
    graph = generate_graph(vertex_count)
    
    log_entry = {
        'timestamp': datetime.now().isoformat(),
        'operation': 'generate_graph',
        'vertex_count': vertex_count,
        'weight_mode': weight_mode,
        'generated_edges': graph['edges']
    }
    log_operation(prim_log_data, PRIM_LOG_FILE, log_entry)
    
    return graph

def prim_endpoint():
    data = request.json
    vertex_count = data.get('vertexCount')
    edges = data.get('edges')
    start_vertex = data.get('startVertex')
    weight_mode = data.get('weightMode')
    if not all([vertex_count, edges, start_vertex is not None]) or vertex_count < 1 or vertex_count > 12 or start_vertex < 0 or start_vertex >= vertex_count:
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
    log_operation(prim_log_data, PRIM_LOG_FILE, log_entry)

    return result

def log_prim_endpoint():
    data = request.json
    log_entry = {
        'timestamp': data.get('timestamp', datetime.now().isoformat()),
        'vertex_count': data.get('vertex_count'),
        'weight_mode': data.get('weight_mode'),
        'initial_edges': data.get('initial_edges'),
        'start_vertex': data.get('start_vertex'),
        'mst_edges': data.get('mst_edges'),
        'total_weight': data.get('total_weight')
    }
    log_operation(prim_log_data, PRIM_LOG_FILE, log_entry)
    return {'status': 'success'}