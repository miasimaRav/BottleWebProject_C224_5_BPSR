import random
import json

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
