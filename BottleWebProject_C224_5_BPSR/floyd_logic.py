from bottle import Bottle, route, post, request, response, template
from datetime import datetime
import numpy as np
import json
import math
import os

# Создание приложения Bottle для обработки HTTP-запросов
app = Bottle()

@app.route('/floyd')
def floyd_page():
    # Передача заголовка, текущего года, языка и переводов в шаблон
    return template('floyd.tpl', 
                   title='Floyd Warshall Algorithm',
                   year=datetime.now().year,
                   lang=request.query.get('lang', 'en'),
                   translations=request.translations)

@app.post('/floyd_calculate')
def calculate_floyd():
    # Обработка данных формы: получение матрицы, вычисление кратчайших путей и возврат результата в JSON
    # Извлечение данных из JSON-запроса
    data = request.json
    size = data.get('matrixSize')  # Получение размера матрицы
    matrix = data.get('matrix')    # Получение самой матрицы

    # Проверка допустимого размера матрицы (от 2 до 10)
    if not size or size < 2 or size > 10:
        response.status = 400
        return {'status': 'error', 'message': 'Matrix size must be between 2 and 10'}

    try:
        # Преобразование входной матрицы: замена строковых 'INF' на math.inf
        matrix = [[math.inf if val == 'INF' else float(val) for val in row] for row in matrix]
        # Преобразование списка в массив NumPy для удобной работы с числами
        matrix = np.array(matrix, dtype=float)

        # Проверка корректности значений матрицы
        for i in range(size):
            for j in range(size):
                val = matrix[i][j]
                # Проверка на отрицательные значения (кроме math.inf)
                if val != math.inf and val < 0:
                    response.status = 400
                    return {'status': 'error', 'message': 'Matrix values must be non-negative'}
                # Проверка, что диагональные элементы равны 0
                if i == j and val != 0:
                    response.status = 400
                    return {'status': 'error', 'message': 'Diagonal elements must be 0'}

    except (ValueError, TypeError):
        # Обработка ошибок, если данные некорректны (например, строки вместо чисел)
        response.status = 400
        return {'status': 'error', 'message': 'Invalid matrix format'}

    # Вычисление кратчайших путей с помощью алгоритма Флойда-Уоршелла, включая матрицу путей
    result_matrix, path_matrix = floyd_warshall(matrix, size)

    # Проверка наличия отрицательных циклов в графе
    for i in range(size):
        # Если диагональный элемент меньше 0, значит есть отрицательный цикл
        if result_matrix[i][i] < 0:
            return {
                'status': 'error',
                'message': 'Graph contains a negative cycle. Solution impossible.'
            }

    # Преобразование результирующей матрицы: замена math.inf на 'INF' для вывода
    result_matrix_converted = [['INF' if val == math.inf else val for val in row] for row in result_matrix.tolist()]
    # Преобразование матрицы путей: индексы в буквы (A, B, C...) для промежуточных вершин
    # Для прямых путей (где нет промежуточных вершин) указываем конечную вершину (j)
    # Для диагональных элементов (i == j) устанавливаем '-'
    path_matrix_converted = [
        [
            '-' if i == j else chr(65 + j) if path_matrix[i][j] == -1 else chr(65 + path_matrix[i][j])
            for j in range(size)
        ]
        for i in range(size)
    ]
    # Преобразование входной матрицы: замена math.inf на 'INF' для логирования
    matrix_converted = [['INF' if val == math.inf else val for val in row] for row in matrix.tolist()]

    # Формирование записи для лога: метод, время, размер матрицы, входные и выходные данные
    log_entry = {
        'method': 'floyd',
        'timestamp': datetime.now().isoformat(),
        'matrix_size': size,
        'input_matrix': matrix_converted,
        'result_matrix': result_matrix_converted,
        'path_matrix': path_matrix_converted  # Добавление матрицы путей в лог
    }
    # Сохранение данных в лог-файл
    log_to_file(log_entry)

    # Формирование успешного ответа с результатами, включая матрицу путей
    return {
        'status': 'success',
        'message': 'Shortest paths successfully calculated.',
        'data': result_matrix_converted,
        'path': path_matrix_converted  # Добавление матрицы путей в ответ
    }

def floyd_warshall(matrix, size):
    # Реализация алгоритма Флойда-Уоршелла для нахождения кратчайших путей и матрицы путей
    # Создание копии матрицы расстояний
    dist = np.copy(matrix)
    # Инициализация матрицы путей: -1 означает отсутствие промежуточной вершины (прямой путь)
    path = np.full((size, size), -1, dtype=int)

    # Внешний цикл: перебор промежуточных вершин k
    for k in range(size):
        # Перебор начальных вершин i
        for i in range(size):
            # Перебор конечных вершин j
            for j in range(size):
                # Проверка, что пути через вершину k конечны
                if dist[i][k] != math.inf and dist[k][j] != math.inf:
                    new_dist = dist[i][k] + dist[k][j]
                    # Обновление расстояния, если путь через k короче
                    if dist[i][j] > new_dist:
                        dist[i][j] = new_dist
                        path[i][j] = k  # Запись промежуточной вершины k

    return dist, path


def log_to_file(data):
    # Запись данных вычислений в JSON-файл лога
    log_file = "resources/log_floyd.json"
    history = []
    # Проверка наличия файла лога
    if os.path.exists(log_file):
        with open(log_file, 'r') as f:
            try:
                # Чтение существующих данных из файла
                history = json.load(f)
            except json.JSONDecodeError:
                # Если файл поврежден, создание пустого списка
                history = []
    # Добавление новой записи в историю
    history.append(data)
    # Сохранение обновленной истории в файл
    with open(log_file, 'w') as f:
        json.dump(history, f, indent=4)