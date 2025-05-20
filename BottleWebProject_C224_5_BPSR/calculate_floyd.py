from bottle import Bottle, run, request, response
import numpy as np

app = Bottle()

# Включаем CORS для взаимодействия с JS
@app.hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

@app.route('/calculate_floyd', method=['POST', 'OPTIONS'])
def calculate_floyd():
    try:
        data = request.json
        input_matrix = data['matrix']

        # Преобразуем строку INF или Infinity и числа
        dist = []
        for row in input_matrix:
            new_row = []
            for val in row:
                if isinstance(val, str) and val.upper() == 'INF':
                    new_row.append(float('inf'))
                elif val == 'Infinity':
                    new_row.append(float('inf'))
                else:
                    new_row.append(float(val))
            dist.append(new_row)

        dist = np.array(dist)

        # Алгоритм Флойда
        n = len(dist)
        for k in range(n):
            for i in range(n):
                for j in range(n):
                    if dist[i][k] + dist[k][j] < dist[i][j]:
                        dist[i][j] = dist[i][k] + dist[k][j]

        # Преобразуем результат обратно
        result = []
        for row in dist:
            result_row = []
            for val in row:
                if np.isinf(val):
                    result_row.append('INF')
                elif val.is_integer():
                    result_row.append(int(val))
                else:
                    result_row.append(round(val, 2))
            result.append(result_row)

        return {'matrix': result}

    except Exception as e:
        response.status = 500
        return {'error': str(e)}

if __name__ == '__main__':
    run(app, host='localhost', port=5000, debug=True)
