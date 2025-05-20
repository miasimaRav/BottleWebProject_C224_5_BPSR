document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const matrixForm = document.getElementById('matrixForm');
    const matrixSizeInput = document.getElementById('matrixSize');
    const generateMatrixBtn = document.getElementById('generateMatrix');
    const adjacencyMatrix = document.getElementById('adjacencyMatrix');
    const resultMatrix = document.getElementById('resultMatrix');
    const errorMessage = document.getElementById('errorMessage');
    const resultSection = document.getElementById('resultSection');

    if (!matrixForm || !matrixSizeInput || !generateMatrixBtn || !adjacencyMatrix || !resultMatrix || !errorMessage || !resultSection) {
        console.error('Один или несколько элементов не найдены:', {
            matrixForm: !!matrixForm,
            matrixSizeInput: !!matrixSizeInput,
            generateMatrixBtn: !!generateMatrixBtn,
            adjacencyMatrix: !!adjacencyMatrix,
            resultMatrix: !!resultMatrix,
            errorMessage: !!errorMessage,
            resultSection: !!resultSection
        });
        alert('Ошибка: Не удалось загрузить элементы страницы. Проверьте консоль.');
        return;
    }

    // Инициализация матрицы при загрузке страницы
    generateMatrix();

    // Event Listeners
    matrixSizeInput.addEventListener('change', generateMatrix);
    generateMatrixBtn.addEventListener('click', generateMatrix);
    matrixForm.addEventListener('submit', calculatePaths);

    // Matrix Generation
    function generateMatrix() {
        const size = Math.min(10, Math.max(2, parseInt(matrixSizeInput.value) || 4));
        matrixSizeInput.value = size;

        let html = '<tr><th>#</th>';
        // Создаем заголовки с буквами (A, B, C, ...)
        for (let i = 0; i < size; i++) {
            html += `<th>${String.fromCharCode(65 + i)}</th>`;
        }
        html += '</tr>';

        // Создаем строки матрицы
        for (let i = 0; i < size; i++) {
            html += `<tr><th>${String.fromCharCode(65 + i)}</th>`;
            for (let j = 0; j < size; j++) {
                const cellClass = i === j ? 'class="diagonal"' : '';
                if (i === j) {
                    html += `<td ${cellClass}><input type="text" id="matrix-${i}-${j}" value="0" readonly></td>`;
                } else {
                    const value = Math.random() > 0.3 ? Math.floor(Math.random() * 9) + 1 : 'INF';
                    html += `<td ${cellClass}><input type="text" id="matrix-${i}-${j}" value="${value}"></td>`;
                }
            }
            html += '</tr>';
        }

        adjacencyMatrix.innerHTML = html;
        resultMatrix.innerHTML = '';
        errorMessage.innerHTML = '';
        resultSection.style.display = 'none';
    }

    // Calculate Paths using Server
    async function calculatePaths(e) {
        e.preventDefault();
        const size = parseInt(matrixSizeInput.value);

        if (size < 2 || size > 10) {
            alert('Размер матрицы должен быть от 2 до 10');
            return;
        }

        const matrix = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                const input = document.getElementById(`matrix-${i}-${j}`);
                const value = input.value === 'INF' ? 'INF' : parseInt(input.value);

                if (value !== 'INF' && (isNaN(value) || value < 0)) {
                    alert('Все значения должны быть неотрицательными числами или "INF"');
                    return;
                }
                if (i === j && value !== 0) {
                    alert('Элементы на диагонали должны быть равны 0');
                    return;
                }
                row.push(value);
            }
            matrix.push(row);
        }

        resultMatrix.innerHTML = '';
        errorMessage.innerHTML = '';
        resultSection.style.display = 'none';

        try {
            console.log('Отправка запроса на /floyd_calculate');
            console.log('Отправляемая матрица:', matrix);
            const response = await fetch('/floyd_calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ matrixSize: size, matrix })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            console.log('Полученный результат:', result);
            displayResult(result);
        } catch (error) {
            console.error('Ошибка при вычислении кратчайших путей:', error);
            alert('Не удалось выполнить вычисление. Проверьте консоль для деталей.');
        }
    }

    // Display Result Matrix
    function displayResult(data) {
        console.log('Вызов displayResult с данными:', data);
        if (data.status === 'error') {
            const errorDiv = document.createElement('div');
            errorDiv.classList.add('alert', 'alert-danger');
            errorDiv.textContent = data.message;
            errorMessage.appendChild(errorDiv);
            resultSection.style.display = 'block';
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return;
        }

        if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
            console.error('Некорректные данные результата:', data);
            errorMessage.innerHTML = '<div class="alert alert-danger">Ошибка: Некорректный результат от сервера.</div>';
            resultSection.style.display = 'block';
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return;
        }

        const size = data.data.length;
        let html = '<tr><th>#</th>';
        // Создаем заголовки с буквами (A, B, C, ...)
        for (let i = 0; i < size; i++) {
            html += `<th>${String.fromCharCode(65 + i)}</th>`;
        }
        html += '</tr>';

        // Создаем строки результата
        for (let i = 0; i < size; i++) {
            html += `<tr><th>${String.fromCharCode(65 + i)}</th>`;
            for (let j = 0; j < size; j++) {
                const cellClass = i === j ? 'class="diagonal"' : '';
                const value = data.data[i][j] === 'INF' ? 'INF' : Math.round(data.data[i][j]);
                html += `<td ${cellClass}>${value}</td>`;
            }
            html += '</tr>';
        }

        resultMatrix.innerHTML = html;
        resultSection.style.display = 'block';
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});