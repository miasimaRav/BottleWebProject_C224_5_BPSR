def find(parent, x):
    if parent[x] != x:
        parent[x] = find(parent, parent[x])
    return parent[x]

def union(parent, rank, x, y):
    px = find(parent, x)
    py = find(parent, y)
    if px == py:
        return False
    if rank[px] < rank[py]:
        px, py = py, px
    parent[py] = px
    if rank[px] == rank[py]:
        rank[px] += 1
    return True

def kruskal(vertex_count, edges):
    if vertex_count <= 0:
        raise ValueError("Количество вершин должно быть положительным")
    for u, v, w in edges:
        if u < 0 or u >= vertex_count or v < 0 or v >= vertex_count:
            raise ValueError("Вершины должны быть в диапазоне [0, vertex_count)")

    parent = list(range(vertex_count))
    rank = [0] * vertex_count
    edges = sorted(edges, key=lambda x: x[2])
    mst = []
    total_weight = 0

    for u, v, weight in edges:
        if union(parent, rank, u, v):
            mst.append((u, v, weight))
            total_weight += weight

    if len(mst) != vertex_count - 1:
        raise ValueError("Граф не связный, MST не существует")

    return mst, total_weight

def generate_random_edges(vertex_count):
    import random
    edges = []
    for i in range(vertex_count):
        for j in range(i + 1, vertex_count):
            if random.random() > 0.5:
                weight = random.randint(1, 100)
                edges.append((i, j, weight))
    for i in range(1, vertex_count):
        weight = random.randint(1, 100)
        edges.append((i - 1, i, weight))
    return edges

def handle_graph_data(vertex_count, edges=None, weight_mode='manual'):
    if vertex_count < 1 or vertex_count > 20:
        raise ValueError("Количество вершин должно быть от 1 до 20")

    if weight_mode == 'auto' or not edges:
        edges = generate_random_edges(vertex_count)
    else:
        edges = [(u, v, w) for u, v, w in edges if w > 0]
        if not edges:
            raise ValueError("Нет рёбер с положительным весом")

    try:
        mst, total_weight = kruskal(vertex_count, edges)
        return {
            'edges': edges,
            'mst': mst,
            'total_weight': total_weight
        }
    except ValueError as e:
        raise ValueError(f"Ошибка обработки графа: {str(e)}")
