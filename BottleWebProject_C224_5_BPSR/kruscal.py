import random
import json
import os

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
    for u, v, w in edges:
        if u < 1 or u > vertex_count or v < 1 or v > vertex_count:
            raise ValueError("Vertices must be in the range [1, vertex_count]")

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
        raise ValueError("Graph is not connected, MST does not exist")

    return mst, total_weight

def generate_random_edges(vertex_count):
    edges = []
    for i in range(1, vertex_count + 1):
        for j in range(i + 1, vertex_count + 1):
            if random.random() > 0.5:
                weight = random.randint(1, 100)
                edges.append((i, j, weight))
    for i in range(1, vertex_count):
        weight = random.randint(1, 100)
        edges.append((i, i + 1, weight))
    return edges

def save_graph_and_mst_to_files(vertex_count, edges, mst, total_weight, directory='static/generated'):
    os.makedirs(directory, exist_ok=True)

    # Сохраняем JSON
    graph_data = {
        'vertex_count': vertex_count,
        'edges': edges,
        'mst': mst,
        'total_weight': total_weight
    }
    json_path = os.path.join(directory, 'kruskal_result.json')
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(graph_data, f, indent=4)

    # Построение и сохранение графа с MST
    G = nx.Graph()
    for u, v, w in edges:
        G.add_edge(u, v, weight=w)

    mst_edges = [(u, v) for u, v, _ in mst]
    pos = nx.spring_layout(G, seed=42)
    plt.figure(figsize=(10, 7))
    nx.draw(G, pos, with_labels=True, node_color='skyblue', node_size=500, edge_color='gray')
    nx.draw_networkx_edges(G, pos, edgelist=mst_edges, edge_color='red', width=2)
    labels = nx.get_edge_attributes(G, 'weight')
    nx.draw_networkx_edge_labels(G, pos, edge_labels=labels)
    plt.title(f"Kruskal MST (Total Weight: {total_weight})")
    image_path = os.path.join(directory, 'kruskal_graph.png')
    plt.savefig(image_path)
    plt.close()

def handle_graph_data(vertex_count, edges=None, weight_mode='manual'):
    if vertex_count < 1 or vertex_count > 20:
        raise ValueError("Number of vertices must be between 1 and 20")

    if weight_mode == 'auto' or not edges:
        edges = generate_random_edges(vertex_count)
    else:
        edges = [(u, v, w) for u, v, w in edges if w > 0]
        if not edges:
            raise ValueError("No edges with positive weight")

    try:
        mst, total_weight = kruskal(vertex_count, edges)
        save_graph_and_mst_to_files(vertex_count, edges, mst, total_weight)
        return {
            'edges': edges,
            'mst': mst,
            'total_weight': total_weight
        }
    except ValueError as e:
        raise ValueError(f"Graph processing error: {str(e)}")
