document.addEventListener('DOMContentLoaded', () => {
    // Инициализация элементов DOM после загрузки страницы
    const matrixForm = document.getElementById('matrixForm');        // Форма для отправки данных
    const matrixSizeInput = document.getElementById('matrixSize');  // Поле ввода размера матрицы
    const generateMatrixBtn = document.getElementById('generateMatrix'); // Кнопка генерации матрицы
    const adjacencyMatrix = document.getElementById('adjacencyMatrix');  // Таблица для входной матрицы
    const resultMatrix = document.getElementById('resultMatrix');   // Таблица для результата расстояний
    const pathMatrix = document.getElementById('pathMatrix');       // Таблица для матрицы путей (новая)
    const errorMessage = document.getElementById('errorMessage');   // Контейнер для сообщений об ошибках
    const resultSection = document.getElementById('resultSection'); // Секция для отображения результата

    // Проверка наличия всех необходимых элементов DOM
    if (!matrixForm || !matrixSizeInput || !generateMatrixBtn || !adjacencyMatrix || !resultMatrix || !pathMatrix || !errorMessage || !resultSection) {
        // Вывод ошибки в консоль с указанием отсутствующих элементов
        console.error('Один или несколько элементов не найдены:', {
            matrixForm: !!matrixForm,
            matrixSizeInput: !!matrixSizeInput,
            generateMatrixBtn: !!generateMatrixBtn,
            adjacencyMatrix: !!adjacencyMatrix,
            resultMatrix: !!resultMatrix,
            pathMatrix: !!pathMatrix,  // Проверка нового элемента
            errorMessage: !!errorMessage,
            resultSection: !!resultSection
        });
        // Оповещение пользователя об ошибке
        alert('Ошибка: Не удалось загрузить элементы страницы. Проверьте консоль.');
        return;
    }

    // Генерация начальной матрицы при загрузке страницы
    generateMatrix();

    // Назначение обработчиков событий для изменения размера, генерации и отправки формы
    matrixSizeInput.addEventListener('change', generateMatrix);  // Реакция на изменение размера матрицы
    generateMatrixBtn.addEventListener('click', generateMatrix); // Реакция на нажатие кнопки генерации
    matrixForm.addEventListener('submit', calculatePaths);       // Реакция на отправку формы

    // Функция для генерации таблицы матрицы с случайными значениями
    function generateMatrix() {
        // Ограничение размера матрицы (от 2 до 10, по умолчанию 4)
        const size = Math.min(10, Math.max(2, parseInt(matrixSizeInput.value) || 4));
        matrixSizeInput.value = size;

        let html = '<tr><th>#</th>';
        // Создание заголовков таблицы с буквами (A, B, C, ...)
        for (let i = 0; i < size; i++) {
            html += `<th>${String.fromCharCode(65 + i)}</th>`;
        }
        html += '</tr>';

        // Создание строк матрицы
        for (let i = 0; i < size; i++) {
            html += `<tr><th>${String.fromCharCode(65 + i)}</th>`;
            // Создание ячеек строки
            for (let j = 0; j < size; j++) {
                const cellClass = i === j ? 'class="diagonal"' : '';  // Выделение диагональных ячеек
                if (i === j) {
                    // Установка значения 0 для диагональных элементов (нельзя редактировать)
                    html += `<td ${cellClass}><input type="text" id="matrix-${i}-${j}" value="0" readonly></td>`;
                } else {
                    // Генерация случайного значения (число от 1 до 9 или 'INF')
                    const value = Math.random() > 0.3 ? Math.floor(Math.random() * 9) + 1 : 'INF';
                    html += `<td ${cellClass}><input type="text" id="matrix-${i}-${j}" value="${value}"></td>`;
                }
            }
            html += '</tr>';
        }

        // Отображение сгенерированной таблицы на странице
        adjacencyMatrix.innerHTML = html;
        // Очистка предыдущего результата и сообщений об ошибках
        resultMatrix.innerHTML = '';
        pathMatrix.innerHTML = '';  // Очистка матрицы путей
        errorMessage.innerHTML = '';
        resultSection.style.display = 'none';
    }

    // Функция для отправки данных на сервер и расчета кратчайших путей
    async function calculatePaths(e) {
        e.preventDefault();  // Отмена стандартного поведения формы
        const size = parseInt(matrixSizeInput.value);  // Получение размера матрицы

        // Проверка допустимого размера матрицы
        if (size < 2 || size > 10) {
            alert('Размер матрицы должен быть от 2 до 10');
            return;
        }

        // Сбор данных из таблицы в массив
        const matrix = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                const input = document.getElementById(`matrix-${i}-${j}`);  // Получение значения ячейки
                const value = input.value === 'INF' ? 'INF' : parseInt(input.value);  // Парсинг значения

                // Проверка корректности значений: только неотрицательные числа или 'INF'
                if (value !== 'INF' && (isNaN(value) || value < 0)) {
                    alert('Все значения должны быть неотрицательными числами или "INF"');
                    return;
                }
                // Проверка, что диагональные элементы равны 0
                if (i === j && value !== 0) {
                    alert('Элементы на диагонали должны быть равны 0');
                    return;
                }
                row.push(value);
            }
            matrix.push(row);
        }

        // Очистка предыдущего результата и сообщений
        resultMatrix.innerHTML = '';
        pathMatrix.innerHTML = '';  // Очистка матрицы путей
        errorMessage.innerHTML = '';
        resultSection.style.display = 'none';

        try {
            // Логирование отправки запроса
            console.log('Отправка запроса на сервер');
            console.log('Отправляемая матрица:', matrix);
            // Отправка POST-запроса на сервер
            const response = await fetch('/floyd_calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ matrixSize: size, matrix })
            });
            // Проверка успешности ответа
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Получение результата от сервера
            const result = await response.json();
            console.log('Полученный результат от сервера:', result);
            // Отображение результата на странице
            displayResult(result);
        } catch (error) {
            // Обработка ошибок при выполнении запроса
            console.error('Ошибка при вычислении путей:', error);
            alert('Не удалось выполнить вычисление. Проверьте консоль для деталей.');
        }
    }

    // Функция для отображения результата расчета на странице
    function displayResult(data) {
        console.log('Обработка данных для отображения:', data);
        // Проверка, если сервер вернул ошибку
        if (data.status === 'error') {
            const errorDiv = document.createElement('div');
            errorDiv.classList.add('alert', 'alert-danger');
            errorDiv.textContent = data.message;
            errorMessage.appendChild(errorDiv);
            resultSection.style.display = 'block';
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        // Проверка корректности данных результата
        if (!data.data || !Array.isArray(data.data) || data.data.length === 0 || !data.path || !Array.isArray(data.path)) {
            // Проверка наличия как матрицы расстояний, так и матрицы путей
            console.error('Некорректные данные результата:', data);
            errorMessage.innerHTML = '<div class="alert alert-danger">Ошибка: Некорректный результат от сервера.</div>';
            resultSection.style.display = 'block';
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        const size = data.data.length;
        let htmlDist = '<tr><th>#</th>';  // HTML для матрицы расстояний
        let htmlPath = '<tr><th>#</th>';  // HTML для матрицы путей
        // Создание заголовков таблиц с буквами (A, B, C, ...)
        for (let i = 0; i < size; i++) {
            htmlDist += `<th>${String.fromCharCode(65 + i)}</th>`;
            htmlPath += `<th>${String.fromCharCode(65 + i)}</th>`;
        }
        htmlDist += '</tr>';
        htmlPath += '</tr>';

        // Создание строк таблиц с результатами
        for (let i = 0; i < size; i++) {
            htmlDist += `<tr><th>${String.fromCharCode(65 + i)}</th>`;
            htmlPath += `<tr><th>${String.fromCharCode(65 + i)}</th>`;
            for (let j = 0; j < size; j++) {
                const cellClass = i === j ? 'class="diagonal"' : '';  // Выделение диагональных ячеек
                // Округление чисел или сохранение 'INF' для расстояний
                const valueDist = data.data[i][j] === 'INF' ? 'INF' : Math.round(data.data[i][j]);
                // Использование значений из матрицы путей
                const valuePath = data.path[i][j];
                htmlDist += `<td ${cellClass}>${valueDist}</td>`;
                htmlPath += `<td ${cellClass}>${valuePath}</td>`;
            }
            htmlDist += '</tr>';
            htmlPath += '</tr>';
        }

        // Отображение таблиц результата
        resultMatrix.innerHTML = htmlDist;  // Отображение матрицы расстояний
        pathMatrix.innerHTML = htmlPath;    // Отображение матрицы путей
        // Показ секции результата и прокрутка к ней
        resultSection.style.display = 'block';
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});