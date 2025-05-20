from bottle import Bottle, route, post, request, response, template
from datetime import datetime
import numpy as np
import json
import math
import os

app = Bottle()

@app.route('/floyd')
def floyd_page():
    """
    Рендерит страницу калькулятора Флойда.
    """
    return template('floyd.tpl', 
                   title='Floyd Warshall Algorithm',
                   year=datetime.now().year,
                   lang=request.query.get('lang', 'en'),
                   translations=request.translations)

@app.post('/floyd_calculate')
def calculate_floyd():
    """
    Обрабатывает данные формы, вычисляет кратчайшие пути, логирует результаты и возвращает JSON.
    """
    data = request.json
    size = data.get('matrixSize')
    matrix = data.get('matrix')

    if not size or size < 2 or size > 10:
        response.status = 400
        return {'status': 'error', 'message': 'Matrix size must be between 2 and 10'}

    try:
        # Преобразуем матрицу: 'INF' -> math.inf
        matrix = [[math.inf if val == 'INF' else float(val) for val in row] for row in matrix]
        matrix = np.array(matrix, dtype=float)
        if matrix.shape != (size, size):
            response.status = 400
            return {'status': 'error', 'message': 'Matrix must be square and match the specified size'}

        for i in range(size):
            for j in range(size):
                val = matrix[i][j]
                if val != math.inf and val < 0:
                    response.status = 400
                    return {'status': 'error', 'message': 'Matrix values must be non-negative'}
                if i == j and val != 0:
                    response.status = 400
                    return {'status': 'error', 'message': 'Diagonal elements must be 0'}

    except (ValueError, TypeError):
        response.status = 400
        return {'status': 'error', 'message': 'Invalid matrix format'}

    # Вычисляем кратчайшие пути
    result_matrix = floyd_warshall(matrix)

    # Проверяем на отрицательные циклы
    for i in range(size):
        if result_matrix[i][i] < 0:
            return {
                'status': 'error',
                'message': 'Graph contains a negative cycle. Solution impossible.'
            }

    # Преобразуем math.inf в 'INF' для ответа и лога
    result_matrix_converted = [[ 'INF' if val == math.inf else val for val in row] for row in result_matrix.tolist()]
    matrix_converted = [[ 'INF' if val == math.inf else val for val in row] for row in matrix.tolist()]

    # Логируем входную и результирующую матрицы
    log_entry = {
        'method': 'floyd',
        'timestamp': datetime.now().isoformat(),
        'matrix_size': size,
        'input_matrix': matrix_converted,
        'result_matrix': result_matrix_converted
    }
    log_to_file(log_entry)

    return {
        'status': 'success',
        'message': 'Shortest paths successfully calculated.',
        'data': result_matrix_converted
    }

def floyd_warshall(matrix):
    """
    Implements the Floyd-Warshall algorithm to compute shortest paths.
    """
    n = len(matrix)
    dist = np.copy(matrix)
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] != math.inf and dist[k][j] != math.inf:
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
    return dist

def log_to_file(data):
    """
    Appends calculation data to a JSON log file.
    """
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