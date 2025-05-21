import unittest
import math
from unittest.mock import patch, MagicMock
import dijkstra_logic
from dijkstra_logic import dijkstra, calculate_dijkstra

class TestDijkstraCalculator(unittest.TestCase):
    def test_shortest_paths_success(self):
        # Тест 1: Простой граф 2x2 с путём A → B
        graph = {'A': [('B', 5)], 'B': [('A', 5)]}
        distances, previous = dijkstra(graph, 'A')
        self.assertEqual(
            distances, {'A': 0, 'B': 5},
            "Failed to compute shortest path correctly for 2x2 graph"
        )
        self.assertEqual(
            previous, {'B': 'A'},
            "Failed to compute predecessors correctly for 2x2 graph"
        )

        # Тест 2: Граф 4x4 с путём A → C → D
        graph = {
            'A': [('B', 10), ('C', 5)],
            'B': [('A', 10), ('D', 5)],
            'C': [('A', 5), ('D', 10)],
            'D': [('B', 5), ('C', 10)]
        }
        distances, previous = dijkstra(graph, 'A')
        self.assertEqual(
            distances['D'], 15,
            "Failed to compute shortest path length A → C → D"
        )
        self.assertEqual(
            previous['D'], 'C',
            "Incorrect predecessor for D in path A → C → D"
        )

        # Тест 3: Нет пути от A до B
        graph = {'A': [], 'B': []}
        distances, previous = dijkstra(graph, 'A')
        self.assertEqual(
            distances['B'], math.inf,
            "Failed to detect no path from A to B"
        )
        self.assertEqual(
            previous, {},
            "Predecessors should be empty when no path exists"
        )

    @patch('dijkstra_logic.request', MagicMock())
    @patch('dijkstra_logic.response', MagicMock())
    def test_invalid_input_handling(self):
        # Тест 4: Одинаковые начальная и конечная вершины
        dijkstra_logic.request.json = {
            'matrixSize': 2,
            'matrix': [['INF', 5], [5, 'INF']],
            'startNode': 'A',
            'endNode': 'A'
        }
        result = calculate_dijkstra()
        self.assertEqual(
            result['status'], 'error',
            "Expected error status for same start and end nodes"
        )
        self.assertEqual(
            result['message'], 'Start and end nodes must be different and valid',
            "Expected error message for same start and end nodes"
        )

        # Тест 5: Некорректный размер матрицы
        dijkstra_logic.request.json = {
            'matrixSize': 1,
            'matrix': [['INF']],
            'startNode': 'A',
            'endNode': 'B'
        }
        result = calculate_dijkstra()
        self.assertEqual(
            result['status'], 'error',
            "Expected error status for invalid matrix size"
        )
        self.assertEqual(
            result['message'], 'Matrix size must be between 2 and 13',
            "Expected error message for invalid matrix size"
        )

        # Тест 6: Некорректный формат матрицы (строки вместо чисел)
        dijkstra_logic.request.json = {
            'matrixSize': 2,
            'matrix': [['INF', 'a'], [5, 'INF']],
            'startNode': 'A',
            'endNode': 'B'
        }
        result = calculate_dijkstra()
        self.assertEqual(
            result['status'], 'error',
            "Expected error status for invalid matrix format"
        )
        self.assertEqual(
            result['message'], 'Invalid matrix format',
            "Expected error message for invalid matrix format"
        )

if __name__ == '__main__':
    unittest.main()
