import unittest
import numpy as np
import math
from unittest.mock import patch, MagicMock
import floyd_logic
from floyd_logic import floyd_warshall, calculate_floyd

def get_path_vertex(path, i, j, size):
    """Восстановление вершины пути на основе матрицы путей."""
    if i == j:
        return '-'
    if path[i][j] == -1:
        return '-'
    k = path[i][j]
    return chr(65 + k)

class TestFloydCalculator(unittest.TestCase):
    def test_shortest_paths_success(self):
        matrix = np.array([
            [0, math.inf, 3],
            [1, 0, math.inf],
            [math.inf, 2, 0]
        ], dtype=float)
        expected_dist = np.array([
            [0, 5, 3],
            [1, 0, 4],
            [3, 2, 0]
        ], dtype=float)
        expected_path = np.array([
            ['-', 'C', '-'],
            ['-', '-', 'A'],
            ['B', '-', '-']
        ], dtype=object)
        dist, path = floyd_warshall(matrix, size=3)
        
        path_converted = np.array([
            [get_path_vertex(path, i, j, 3) for j in range(3)]
            for i in range(3)
        ], dtype=object)
        
        np.testing.assert_array_equal(dist, expected_dist, "Failed to compute shortest paths correctly")
        np.testing.assert_array_equal(path_converted, expected_path, "Failed to compute path matrix correctly")

    def test_negative_cycle_detection(self):
        matrix = np.array([
            [0, 1, math.inf],
            [math.inf, 0, -2],
            [-1, math.inf, 0]
        ], dtype=float)
        dist, path = floyd_warshall(matrix, size=3)
        self.assertTrue(dist[0][0] < 0, "Negative cycle not detected in the graph")
        
        path_converted = np.array([
            [get_path_vertex(path, i, j, 3) for j in range(3)]
            for i in range(3)
        ], dtype=object)
        for i in range(3):
            self.assertEqual(path_converted[i][i], '-', f"Diagonal element [{i},{i}] should be '-'")

    def test_large_matrix_success(self):
        matrix = np.array([
            [0, 5, "INF", 7, 9],
            [3, 0, 2, "INF", 4],
            ["INF", 1, 0, 6, 8],
            [7, "INF", 5, 0, 3],
            [9, 4, "INF", 2, 0]
        ], dtype=object)
        matrix = np.where(matrix == "INF", math.inf, matrix).astype(float)
        dist, path = floyd_warshall(matrix, size=5)
        
        path_converted = np.array([
            [get_path_vertex(path, i, j, 5) for j in range(5)]
            for i in range(5)
        ], dtype=object)
        
        self.assertTrue(np.all(np.isfinite(dist) | (dist == math.inf)), "Large matrix computation failed")
        for i in range(5):
            self.assertEqual(path_converted[i][i], '-', f"Diagonal element [{i},{i}] should be '-'")

    @patch('floyd_logic.request', MagicMock())
    def test_invalid_input_handling(self):
        test_cases = [
            {"matrixSize": 3, "matrix": [["a", 1, 2], [1, 0, 3], [2, 3, 0]], "expected_message": "Invalid matrix format"},
            {"matrixSize": 3, "matrix": [[0, 1, 2], [1, 0, -3], [2, 3, 0]], "expected_message": "Matrix values must be non-negative"},
            {"matrixSize": 3, "matrix": [[1, 5, 3], [2, 0, 8], [4, 3, 0]], "expected_message": "Diagonal elements must be 0"},
            {"matrixSize": 1, "matrix": [[0]], "expected_message": "Matrix size must be between 2 and 10"},
            {"matrixSize": 11, "matrix": [[0] * 11 for _ in range(11)], "expected_message": "Matrix size must be between 2 and 10"}
        ]

        for i, case in enumerate(test_cases):
            floyd_logic.request.json = {'matrixSize': case["matrixSize"], 'matrix': case["matrix"]}
            result = calculate_floyd()
            self.assertEqual(result['status'], 'error', f"Case {i+1}: Expected error status for invalid input")
            self.assertEqual(result['message'], case["expected_message"], f"Case {i+1}: Expected error message '{case['expected_message']}'")

if __name__ == '__main__':
    unittest.main()