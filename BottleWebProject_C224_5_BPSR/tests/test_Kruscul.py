import unittest
import kruscal
from kruscal import kruskal 

class TestKruskal(unittest.TestCase):

    def test_valid_connected_graph(self):
        vertex_count = 4
        edges = [
            (1, 2, 1),
            (2, 3, 2),
            (3, 4, 3),
            (1, 4, 4)
        ]
        mst, total_weight, disconnected = kruskal(vertex_count, edges)
        self.assertFalse(disconnected)
        self.assertEqual(len(mst), vertex_count - 1)
        self.assertEqual(total_weight, 6)

    def test_disconnected_graph(self):
        vertex_count = 4
        edges = [
            (1, 2, 1),
            (3, 4, 2)
        ]
        mst, total_weight, disconnected = kruskal(vertex_count, edges)
        self.assertTrue(disconnected)
        self.assertEqual(mst, [])
        self.assertEqual(total_weight, 0)

    def test_single_vertex(self):
        with self.assertRaises(ValueError):
            kruskal(0, [])

    def test_no_edges(self):
        with self.assertRaises(ValueError):
            kruskal(3, [])

    def test_invalid_vertex_index(self):
        vertex_count = 3
        edges = [
            (1, 4, 2)
        ]
        with self.assertRaises(ValueError):
            kruskal(vertex_count, edges)

    def test_zero_weight_edge(self):
        vertex_count = 3
        edges = [
            (1, 2, 0),
            (2, 3, 1)
        ]
        with self.assertRaises(ValueError):
            kruskal(vertex_count, edges)

    def test_negative_weight_edge(self):
        vertex_count = 3
        edges = [
            (1, 2, -5),
            (2, 3, 1)
        ]
        with self.assertRaises(ValueError):
            kruskal(vertex_count, edges)

    def test_cycle_avoidance(self):
        vertex_count = 4
        edges = [
            (1, 2, 1),
            (2, 3, 1),
            (3, 4, 1),
            (4, 1, 10)
        ]
        mst, total_weight, disconnected = kruskal(vertex_count, edges)
        self.assertFalse(disconnected)
        self.assertEqual(len(mst), vertex_count - 1)
        self.assertNotIn((4, 1, 10), mst)
        self.assertEqual(total_weight, 3)

if __name__ == '__main__':
    unittest.main()
