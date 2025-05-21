from bottle import Bottle, route, post, request, response, template
from datetime import datetime
import numpy as np
import json
import math
import os
import heapq

# Создание приложения Bottle
app = Bottle()

@app.route('/dijkstra')
def dijkstra_page():
    return template('dijkstra_method.tpl',
                   title='Dijkstra Algorithm',
                   year=datetime.now().year,
                   lang=request.query.get('lang', 'en'),
                   translations=request.translations)

@app.post('/dijkstra_calculate')
def calculate_dijkstra():
    data = request.json
    size = data.get('matrixSize')
    matrix = data.get('matrix')
    start_node = data.get('startNode')
    end_node = data.get('endNode')

    if not size or size < 2 or size > 13:
        response.status = 400
        return {'status': 'error', 'message': 'Matrix size must be between 2 and 13'}

    if not start_node or not end_node or start_node == end_node:
        response.status = 400
        return {'status': 'error', 'message': 'Start and end nodes must be different and valid'}

    try:
        matrix = [[math.inf if val == 'INF' or val == '∞' else float(val) for val in row] for row in matrix]
        matrix = np.array(matrix, dtype=float)

        for i in range(size):
            for j in range(size):
                val = matrix[i][j]
                if val != math.inf and val < 0:
                    response.status = 400
                    return {'status': 'error', 'message': 'Edge weights must be non-negative'}
                if i == j and val != math.inf:
                    response.status = 400
                    return {'status': 'error', 'message': 'Diagonal elements must be infinity'}

    except (ValueError, TypeError):
        response.status = 400
        return {'status': 'error', 'message': 'Invalid matrix format'}

    # Инициализация всех узлов в графе
    graph = {chr(65 + i): [] for i in range(size)}
    
    # Заполнение графа рёбрами
    for i in range(size):
        node = chr(65 + i)
        for j in range(size):
            if i != j and matrix[i][j] != math.inf:
                neighbor = chr(65 + j)
                graph[node].append((neighbor, matrix[i][j]))

    distances, previous = dijkstra(graph, start_node)
    path = reconstruct_path(previous, start_node, end_node)

    matrix_converted = [['INF' if val == math.inf else val for val in row] for row in matrix.tolist()]
    log_entry = {
        'method': 'dijkstra',
        'timestamp': datetime.now().isoformat(),
        'matrix_size': size,
        'input_matrix': matrix_converted,
        'start_node': start_node,
        'end_node': end_node,
        'path': path,
        'distance': distances.get(end_node, 'INF')
    }
    log_to_file(log_entry)

    if distances[end_node] == math.inf or not path:
        return {
            'status': 'success',
            'message': 'No path found',
            'path': [],
            'distance': 'INF',
            'startNode': start_node,
            'endNode': end_node
        }

    return {
        'status': 'success',
        'message': 'Shortest path calculated',
        'path': path,
        'distance': distances[end_node],
        'startNode': start_node,
        'endNode': end_node
    }

def dijkstra(graph, start):
    distances = {node: math.inf for node in graph}
    distances[start] = 0
    previous = {}
    pq = [(0, start)]

    while pq:
        current_distance, current = heapq.heappop(pq)
        if current_distance > distances[current]:
            continue

        for neighbor, weight in graph[current]:
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous[neighbor] = current
                heapq.heappush(pq, (distance, neighbor))

    return distances, previous

def reconstruct_path(previous, start, end):
    path = []
    current = end
    while current in previous:
        path.append(current)
        current = previous[current]
    if current == start:
        path.append(start)
    path.reverse()
    return path if path and path[0] == start else []

def log_to_file(data):
    log_file = "resources/log.json"
    history = []
    if os.path.exists(log_file):
        with open(log_file, 'r') as f:
            try:
                history = json.load(f)
            except json.JSONDecodeError:
                history = []
    history.append(data)
    with open(log_file, 'w') as f:
        json.dump(history, f, indent=4)