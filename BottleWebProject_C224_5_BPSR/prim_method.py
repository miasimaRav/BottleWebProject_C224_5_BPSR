import sys
import random
import json
from bottle import Bottle, request, response

app = Bottle()

def generate_graph(vertex_count):
    edges = []
    for i in range(vertex_count):
        for j in range(i + 1, vertex_count):
            weight = random.randint(1, 100)  # Случайные веса
            edges.append({'from': i, 'to': j, 'weight': weight})
    return {'edges': edges}

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

    return {'mstEdges': mst_edges, 'totalWeight': total_weight}

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
    if not all([vertex_count, edges, start_vertex is not None]) or vertex_count < 1 or vertex_count > 12 or start_vertex >= vertex_count:
        response.status = 400
        return {'error': 'Invalid input data'}
    result = prim_algorithm(vertex_count, edges, start_vertex)
    return result

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=8080)