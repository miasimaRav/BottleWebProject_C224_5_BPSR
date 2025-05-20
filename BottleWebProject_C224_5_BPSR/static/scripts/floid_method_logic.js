document.addEventListener('DOMContentLoaded', function () {
    const sizeInput = document.getElementById('matrixSize');
    const generateBtn = document.getElementById('generateMatrix');
    const calculateBtn = document.getElementById('calculatePaths');
    const adjMatrix = document.getElementById('adjacencyMatrix');
    const resultMatrix = document.getElementById('resultMatrix');
    const resultSection = document.getElementById('resultSection');

    // Generate matrix when page loads
    generateMatrix();

    // Generate matrix when size changes or button clicked
    sizeInput.addEventListener('input', generateMatrix);
    generateBtn.addEventListener('click', generateMatrix);

    // Calculate paths when button clicked
    calculateBtn.addEventListener('click', calculatePaths);

    function generateMatrix() {
        const size = parseInt(sizeInput.value);
        let html = '<tr><th>#</th>';

        // Create header row
        for (let i = 0; i < size; i++) {
            html += `<th>${String.fromCharCode(65 + i)}</th>`;
        }
        html += '</tr>';

        // Create matrix cells
        for (let i = 0; i < size; i++) {
            html += `<tr><th>${String.fromCharCode(65 + i)}</th>`;
            for (let j = 0; j < size; j++) {
                const cellClass = i === j ? 'class="diagonal"' : '';
                if (i === j) {
                    html += `<td ${cellClass}><input type="text" value="0" readonly></td>`;
                } else {
                    html += `<td ${cellClass}><input type="text" value="${Math.random() > 0.3 ? Math.floor(Math.random() * 9) + 1 : 'INF'}"></td>`;
                }
            }
            html += '</tr>';
        }

        adjMatrix.innerHTML = html;
        resultSection.style.display = 'none';
    }

    async function calculatePaths() {
        try {
            const size = parseInt(document.getElementById('matrixSize').value);
            const inputMatrix = [];

            // Сбор данных матрицы
            const rows = document.querySelectorAll('#adjacencyMatrix tr:not(:first-child)');
            rows.forEach(row => {
                const rowData = [];
                row.querySelectorAll('td input').forEach(cell => {
                    rowData.push(cell.value === 'INF' ? Infinity : Number(cell.value));
                });
                inputMatrix.push(rowData);
            });
            const baseUrl = 'http://localhost:5000'; // url на бэкэкнд
            // Отправка на сервер
            const response = await fetch(`${baseUrl}/calculate_floyd`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ matrix: inputMatrix })
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const result = await response.json();

            // Отображение результатов
            let html = '<tr><th>#</th>';
            for (let i = 0; i < size; i++) {
                html += `<th>${String.fromCharCode(65 + i)}</th>`;
            }
            html += '</tr>';

            result.matrix.forEach((row, i) => {
                html += `<tr><th>${String.fromCharCode(65 + i)}</th>`;
                row.forEach((val, j) => {
                    const cellClass = i === j ? 'class="diagonal"' : '';
                    html += `<td ${cellClass}>${val}</td>`;
                });
                html += '</tr>';
            });

            document.getElementById('resultMatrix').innerHTML = html;
            document.getElementById('resultSection').style.display = 'block';

        } catch (error) {
            console.error('Error:', error);
            alert(`Calculation failed: ${error.message}`);
        }
    }

    // Отображение результатов
    function displayResultMatrix(matrix) {
        const size = matrix.length;
        let html = '<tr><th>#</th>';
        for (let i = 0; i < size; i++) {
            html += `<th>${String.fromCharCode(65 + i)}</th>`;
        }
        html += '</tr>';

        for (let i = 0; i < size; i++) {
            html += `<tr><th>${String.fromCharCode(65 + i)}</th>`;
            for (let j = 0; j < size; j++) {
                const cellClass = i === j ? 'class="diagonal"' : '';
                const value = matrix[i][j] === null ? 'INF' : matrix[i][j];
                html += `<td ${cellClass}>${value}</td>`;
            }
            html += '</tr>';
        }

        resultMatrix.innerHTML = html;
        resultSection.style.display = 'block';
    }
});