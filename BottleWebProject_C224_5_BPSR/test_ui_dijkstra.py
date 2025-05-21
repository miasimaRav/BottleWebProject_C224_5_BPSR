from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import json
import time
import unittest


class TestDijkstraUI(unittest.TestCase):
    def setUp(self):
        # Настройка WebDriver
        self.driver = webdriver.Chrome(ChromeDriverManager().install())
        self.driver.get('http://localhost:8080/dijkstra')
        self.wait = WebDriverWait(self.driver, 10)

    def tearDown(self):
        # Закрытие браузера
        self.driver.quit()

    def test_ui_functionality(self):
        # Чтение тестовых данных
        with open('test_data.json', 'r', encoding='utf-8') as f:
            test_data = json.load(f)['test_cases']

        for test_case in test_data:
            with self.subTest(test_id=test_case['id']):
                print(f"Running test: {test_case['id']}")

                # Ввод размера матрицы
                size_input = self.wait.until(EC.presence_of_element_located((By.ID, 'matrixSize')))
                size_input.clear()
                size_input.send_keys(str(test_case['matrixSize']))

                # Нажатие кнопки "Generate Random"
                generate_btn = self.driver.find_element(By.ID, 'generateMatrix')
                generate_btn.click()

                # Ожидание генерации матрицы
                self.wait.until(EC.presence_of_element_located((By.ID, 'adjacencyMatrix')))

                # Ввод весов в матрицу
                matrix = test_case['matrix']
                for i in range(test_case['matrixSize']):
                    for j in range(test_case['matrixSize']):
                        if j > i:  # Верхний треугольник
                            cell = self.driver.find_element(By.ID, f'matrix-{i}-{j}')
                            cell.clear()
                            cell.send_keys(str(matrix[i][j]))

                # Выбор начальной и конечной вершин
                start_select = self.driver.find_element(By.ID, 'startNode')
                start_select.send_keys(test_case['startNode'])

                end_select = self.driver.find_element(By.ID, 'endNode')
                end_select.send_keys(test_case['endNode'])

                # Нажатие кнопки "Find Shortest Path"
                calculate_btn = self.driver.find_element(By.ID, 'calculateDijkstra')
                calculate_btn.click()

                # Ожидание результата
                self.wait.until(EC.presence_of_element_located((By.ID, 'resultSection')))

                # Проверка результатов
                message_box = self.driver.find_element(By.ID, 'messageBox')
                result_path = self.driver.find_element(By.ID, 'resultPath')
                result_length = self.driver.find_element(By.ID, 'resultLength')

                # Проверка сообщения
                self.assertIn(
                    test_case['expected']['message'],
                    message_box.text,
                    f"Test {test_case['id']}: Expected message '{test_case['expected']['message']}'"
                )

                # Проверка пути
                if test_case['expected']['path']:
                    expected_path = ' → '.join(test_case['expected']['path'])
                    self.assertIn(
                        expected_path,
                        result_path.text,
                        f"Test {test_case['id']}: Expected path '{expected_path}'"
                    )
                else:
                    self.assertIn(
                        'No path',
                        result_path.text,
                        f"Test {test_case['id']}: Expected no path message"
                    )

                # Проверка длины пути
                if test_case['expected']['length'] is not None:
                    self.assertIn(
                        str(test_case['expected']['length']),
                        result_length.text,
                        f"Test {test_case['id']}: Expected length '{test_case['expected']['length']}'"
                    )

                # Задержка для визуальной проверки
                time.sleep(1)


if __name__ == '__main__':
    unittest.main()
