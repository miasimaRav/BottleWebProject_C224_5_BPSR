import unittest
from prim_method import prim_algorithm

class TestPrim(unittest.TestCase):

    def test_valid_connected_graph(self):
        # Тест для связного графа с 4 вершинами

        # Проверяет связный граф с 4 вершинами. Ожидает MST с рёбрами 
        # (0-1, 1-2, 2-3) и суммарным весом 6.
        vertex_count = 4
        edges = [
            {'from': 0, 'to': 1, 'weight': 1},
            {'from': 1, 'to': 2, 'weight': 2},
            {'from': 2, 'to': 3, 'weight': 3},
            {'from': 0, 'to': 3, 'weight': 4}
        ]
        start_vertex = 0
        result = prim_algorithm(vertex_count, edges, start_vertex)
        expected_mst = [
            {'from': 0, 'to': 1, 'weight': 1},
            {'from': 1, 'to': 2, 'weight': 2},
            {'from': 2, 'to': 3, 'weight': 3}
        ]
        expected_weight = 6
        self.assertEqual(len(result['mstEdges']), vertex_count - 1)
        self.assertEqual(result['totalWeight'], expected_weight)
        self.assertEqual(sorted(result['mstEdges'], key=lambda x: (x['from'], x['to'])),
                        sorted(expected_mst, key=lambda x: (x['from'], x['to'])))

    def test_disconnected_graph(self):
        # Тест для несвязного графа

        # тестирует несвязный граф. Алгоритм должен вернуть MST 
        # только для связной компоненты (ребро 0-1 с весом 1).

        vertex_count = 4
        edges = [
            {'from': 0, 'to': 1, 'weight': 1},
            {'from': 2, 'to': 3, 'weight': 2}
        ]
        start_vertex = 0
        result = prim_algorithm(vertex_count, edges, start_vertex)
        expected_mst = [
            {'from': 0, 'to': 1, 'weight': 1}
        ]
        expected_weight = 1
        self.assertEqual(len(result['mstEdges']), 1)  # Только одна грань из связной компоненты
        self.assertEqual(result['totalWeight'], expected_weight)
        self.assertEqual(sorted(result['mstEdges'], key=lambda x: (x['from'], x['to'])),
                        sorted(expected_mst, key=lambda x: (x['from'], x['to'])))

    def test_single_vertex(self):
        # Тест для графа с одной вершиной

        # Проверяет граф с одной вершиной и без рёбер. Ожидает пустое MST (0 рёбер, вес 0).

        vertex_count = 1
        edges = []
        start_vertex = 0
        result = prim_algorithm(vertex_count, edges, start_vertex)
        self.assertEqual(len(result['mstEdges']), 0)
        self.assertEqual(result['totalWeight'], 0)

    def test_no_edges(self):
        # Тест для графа без рёбер (но с несколькими вершинами)

        # Проверяет граф с 3 вершинами, но без рёбер. Ожидает пустое MST.

        vertex_count = 3
        edges = []
        start_vertex = 0
        result = prim_algorithm(vertex_count, edges, start_vertex)
        self.assertEqual(len(result['mstEdges']), 0)
        self.assertEqual(result['totalWeight'], 0)

    def test_invalid_vertex_index(self):
        # Тест для графа с некорректным индексом вершины

        # Проверяет граф с некорректным индексом вершины (3 при vertex_count=3). Ожидает IndexError.

        vertex_count = 3
        edges = [
            {'from': 0, 'to': 3, 'weight': 2}  # Вершина 3 выходит за пределы
        ]
        start_vertex = 0
        with self.assertRaises(IndexError):
            prim_algorithm(vertex_count, edges, start_vertex)

    def test_cycle_avoidance(self):
        # Тест для проверки избегания циклов в MST

        # Проверяет избегание циклов в графе с потенциальным циклом (0-1-2-3-0). 
        # Ожидает MST с рёбрами (0-1, 1-2, 2-3) и весом 3, без ребра (3-0).

        vertex_count = 4
        edges = [
            {'from': 0, 'to': 1, 'weight': 1},
            {'from': 1, 'to': 2, 'weight': 1},
            {'from': 2, 'to': 3, 'weight': 1},
            {'from': 3, 'to': 0, 'weight': 10}
        ]
        start_vertex = 0
        result = prim_algorithm(vertex_count, edges, start_vertex)
        expected_mst = [
            {'from': 0, 'to': 1, 'weight': 1},
            {'from': 1, 'to': 2, 'weight': 1},
            {'from': 2, 'to': 3, 'weight': 1}
        ]
        expected_weight = 3

        self.assertEqual(len(result['mstEdges']), vertex_count - 1)
        self.assertNotIn({'from': 3, 'to': 0, 'weight': 10}, result['mstEdges'])
        self.assertEqual(result['totalWeight'], expected_weight)
        self.assertEqual(sorted(result['mstEdges'], key=lambda x: (x['from'], x['to'])),
                        sorted(expected_mst, key=lambda x: (x['from'], x['to'])))

if __name__ == '__main__':
    unittest.main()