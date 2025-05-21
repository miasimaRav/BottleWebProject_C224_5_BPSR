import unittest
import numpy as np
import math
from unittest.mock import patch, MagicMock
import floyd_logic
from floyd_logic import floyd_warshall, calculate_floyd

class TestFloydCalculator(unittest.TestCase):
    def test_shortest_paths_success(self):
        # Тест 1: Корректный расчет кратчайших путей для матрицы 3x3
        matrix = np.array([
            [0, math.inf, 3],
            [1, 0, math.inf],
            [math.inf, 2, 0]
        ], dtype=float)
        expected = np.array([
            [0, 5, 3],
            [1, 0, 4],
            [3, 2, 0]
        ], dtype=float)
        result = floyd_warshall(matrix)
        np.testing.assert_array_equal(
            result, expected, "Failed to compute shortest paths correctly for a small matrix"
        )

    def test_negative_cycle_detection(self):
        # Тест 2: Обнаружение отрицательного цикла
        matrix = np.array([
            [0, 1, math.inf],
            [math.inf, 0, -2],
            [-1, math.inf, 0]
        ], dtype=float)
        result = floyd_warshall(matrix)
        self.assertTrue(
            result[0][0] < 0, "Negative cycle not detected in the graph"
        )

    @patch('floyd_logic.request', MagicMock())
    def test_invalid_input_handling(self):
        # Тест 3: Проверка обработки некорректных входных данных
        test_cases = [
            # Случай 1: Строки вместо чисел
            {
                "matrixSize": 3,
                "matrix": [["a", 1, 2], [1, 0, 3], [2, 3, 0]],
                "expected_message": "Invalid matrix format"
            },
            # Случай 2: Отрицательные значения
            {
                "matrixSize": 3,
                "matrix": [[0, 1, 2], [1, 0, -3], [2, 3, 0]],
                "expected_message": "Matrix values must be non-negative"
            }
        ]

        for i, case in enumerate(test_cases):
            floyd_logic.request.json = {
                'matrixSize': case["matrixSize"],
                'matrix': case["matrix"]
            }
            result = calculate_floyd()
            self.assertEqual(
                result['status'], 'error',
                f"Case {i+1}: Expected error status for invalid input"
            )
            self.assertEqual(
                result['message'], case["expected_message"],
                f"Case {i+1}: Expected error message '{case['expected_message']}' for invalid input"
            )

if __name__ == '__main__':
    unittest.main()