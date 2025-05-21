import random

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
        raise ValueError("Number of vertices must be positive")

    if not edges:
        raise ValueError("No edges provided")

    for u, v, w in edges:
        if u < 1 or u > vertex_count or v < 1 or v > vertex_count:
            raise ValueError("Vertices must be in the range [1, vertex_count]")
        if w <= 0:
            raise ValueError("Edge weights must be positive")

    parent = list(range(vertex_count + 1))
    rank = [0] * (vertex_count + 1)
    edges = sorted(edges, key=lambda x: x[2])
    mst = []
    total_weight = 0

    for u, v, weight in edges:
        if union(parent, rank, u, v):
            mst.append((u, v, weight))
            total_weight += weight

    if len(mst) != vertex_count - 1:
        return [], 0, True  # граф не связный

    return mst, total_weight, False

def generate_random_edges(vertex_count):
    edges = []
    for i in range(1, vertex_count + 1):
        for j in range(i + 1, vertex_count + 1):
            if random.random() > 0.5:
                weight = random.randint(1, 100)
                edges.append((i, j, weight))
    for i in range(1, vertex_count):
        weight = random.randint(1, 100)
        edges.append((i, i + 1, weight))  # гарантирует связность
    return edges

def handle_graph_data(vertex_count, edges, weight_mode):
    if weight_mode == 'auto':
        edges = generate_random_edges(vertex_count)
    elif edges:
        # Убираем только рёбра с отрицательным весом, но оставляем нули — они не будут переданы в Kruskal
        valid_edges = [(u, v, w) for u, v, w in edges if w > 0]
        if not valid_edges:
            return {
                'edges': [],
                'mst': [],
                'total_weight': 0,
                'disconnected': True
            }
        edges = valid_edges
    else:
        return {
            'edges': [],
            'mst': [],
            'total_weight': 0,
            'disconnected': True
        }

    try:
        mst, total_weight, disconnected = kruskal(vertex_count, edges)
    except ValueError:
        return {
            'edges': edges,
            'mst': [],
            'total_weight': 0,
            'disconnected': True
        }

    return {
        'edges': edges,
        'mst': mst,
        'total_weight': total_weight,
        'disconnected': disconnected
    }
