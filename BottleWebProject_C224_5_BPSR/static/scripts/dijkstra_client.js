document.addEventListener('DOMContentLoaded', () => {
    const matrixForm = document.getElementById('matrixForm');
    const sizeInput = document.getElementById('matrixSize');
    const generateBtn = document.getElementById('generateMatrix');
    const calculateBtn = document.getElementById('calculateDijkstra');
    const adjMatrix = document.getElementById('adjacencyMatrix');
    const resultSection = document.getElementById('resultSection');
    const resultPathP = document.getElementById('resultPath');
    const resultLengthP = document.getElementById('resultLength');
    const startSelect = document.getElementById('startNode');
    const endSelect = document.getElementById('endNode');
    const messageBox = document.getElementById('messageBox');

    if (!matrixForm || !sizeInput || !generateBtn || !calculateBtn || !adjMatrix || !resultSection || !resultPathP || !resultLengthP || !startSelect || !endSelect || !messageBox) {
        console.error('One or more elements not found:', {
            matrixForm: !!matrixForm,
            sizeInput: !!sizeInput,
            generateBtn: !!generateBtn,
            calculateBtn: !!calculateBtn,
            adjMatrix: !!adjMatrix,
            resultSection: !!resultSection,
            resultPathP: !!resultPathP,
            resultLengthP: !!resultLengthP,
            startSelect: !!startSelect,
            endSelect: !!endSelect,
            messageBox: !!messageBox
        });
        alert('Error: Could not load page elements. Check console.');
        return;
    }

    function clearMessages() {
        messageBox.innerHTML = '';
        messageBox.style.color = '';
    }

    function setErrorMessage(msg) {
        messageBox.style.color = 'crimson';
        messageBox.textContent = msg;
    }

    function setSuccessMessage(msg) {
        messageBox.style.color = 'green';
        messageBox.textContent = msg;
    }

    function highlightInputError(elem) {
        elem.style.backgroundColor = '#ffd6d6'; // light red
    }

    function clearInputHighlight() {
        sizeInput.style.backgroundColor = '';
        startSelect.style.backgroundColor = '';
        endSelect.style.backgroundColor = '';
        const inputs = adjMatrix.querySelectorAll('input[type="text"]');
        inputs.forEach(inp => inp.style.backgroundColor = '');
    }

    function generateMatrix() {
        const size = parseInt(sizeInput.value);
        if (isNaN(size) || size < 2 || size > 13) {
            setErrorMessage('Number of nodes must be between 2 and 13');
            highlightInputError(sizeInput);
            adjMatrix.innerHTML = '';
            startSelect.innerHTML = '';
            endSelect.innerHTML = '';
            resultSection.style.display = 'none';
            return;
        }

        startSelect.innerHTML = '';
        endSelect.innerHTML = '';
        for (let i = 0; i < size; i++) {
            const label = String.fromCharCode(65 + i);
            startSelect.innerHTML += `<option value="${label}">${label}</option>`;
            endSelect.innerHTML += `<option value="${label}">${label}</option>`;
        }

        let html = '<tr><th>#</th>';
        for (let i = 0; i < size; i++) {
            html += `<th>${String.fromCharCode(65 + i)}</th>`;
        }
        html += '</tr>';

        for (let i = 0; i < size; i++) {
            html += `<tr><th>${String.fromCharCode(65 + i)}</th>`;
            for (let j = 0; j < size; j++) {
                const cellClass = i === j ? 'class="diagonal"' : '';
                if (i === j) {
                    html += `<td ${cellClass}><input type="text" id="matrix-${i}-${j}" value="∞" readonly disabled></td>`;
                } else if (j > i) {
                    const value = Math.random() > 0.3 ? Math.floor(Math.random() * 9) + 1 : '∞';
                    html += `<td ${cellClass}><input type="text" id="matrix-${i}-${j}" value="${value}"></td>`;
                } else {
                    html += `<td ${cellClass}><input type="text" id="matrix-${i}-${j}" value="" readonly disabled></td>`;
                }
            }
            html += '</tr>';
        }

        adjMatrix.innerHTML = html;
        resultSection.style.display = 'none';
        resultPathP.innerHTML = '';
        resultLengthP.innerHTML = '';
        clearMessages();
        clearInputHighlight();
    }

    async function calculatePaths(e) {
        e.preventDefault();
        clearMessages();
        clearInputHighlight();

        const size = parseInt(sizeInput.value);
        const start = startSelect.value;
        const end = endSelect.value;

        // Проверка размера матрицы
        if (isNaN(size) || size < 2 || size > 13) {
            setErrorMessage('Number of nodes must be between 2 and 13');
            highlightInputError(sizeInput);
            resultSection.style.display = 'none';
            return;
        }

        // Проверка, что начальная и конечная вершины разные
        if (start === end) {
            setErrorMessage('Start and end nodes cannot be the same');
            highlightInputError(startSelect);
            highlightInputError(endSelect);
            resultSection.style.display = 'none';
            return;
        }

        // Сбор данных матрицы
        const matrix = [];
        let hasInvalidWeight = false;
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                let value;
                if (i === j) {
                    value = 'INF'; // Диагональ всегда бесконечность
                } else if (j > i) {
                    const input = document.getElementById(`matrix-${i}-${j}`);
                    value = input.value.trim();
                    if (value.toUpperCase() === 'INF' || value === '∞') {
                        value = 'INF';
                    } else if (!/^\d+$/.test(value) || parseInt(value) === 0) {
                        highlightInputError(input);
                        hasInvalidWeight = true;
                        value = 'INF';
                    } else {
                        value = parseInt(value);
                    }
                } else {
                    // Для нижнего треугольника (j < i) берем значение из верхнего (matrix[j][i])
                    value = matrix[j] ? matrix[j][i] : 'INF';
                }
                row.push(value);
            }
            matrix.push(row);
        }

        if (hasInvalidWeight) {
            setErrorMessage('Edge weights must be positive integers or infinity (∞)');
            resultSection.style.display = 'none';
            return;
        }

        try {
            console.log('Sending request to server with:', { matrixSize: size, matrix, startNode: start, endNode: end });
            const response = await fetch('/dijkstra_calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ matrixSize: size, matrix, startNode: start, endNode: end })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Received result:', result);
            displayResult(result);
        } catch (error) {
            console.error('Error calculating paths:', error);
            setErrorMessage('Failed to compute path. Check console for details.');
            resultSection.style.display = 'none';
        }
    }

    function displayResult(data) {
        if (data.status === 'error') {
            setErrorMessage(data.message);
            resultSection.style.display = 'none';
            return;
        }

        resultSection.style.display = 'block';
        if (data.path.length === 0) {
            resultPathP.innerHTML = `<div class="result-box error">No path from <strong>${data.startNode}</strong> to <strong>${data.endNode}</strong></div>`;
            resultLengthP.innerHTML = '';
            setErrorMessage('No path exists between the selected nodes');
        } else {
            resultPathP.innerHTML = `<div class="result-box success">Shortest path: <strong>${data.path.join(' → ')}</strong></div>`;
            resultLengthP.innerHTML = `<div class="result-box info">Path length: <strong>${data.distance}</strong></div>`;
            setSuccessMessage('Shortest path calculated successfully');
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    sizeInput.addEventListener('input', () => {
        clearMessages();
        clearInputHighlight();
        generateMatrix();
    });

    generateBtn.addEventListener('click', () => {
        clearMessages();
        clearInputHighlight();
        generateMatrix();
    });

    matrixForm.addEventListener('submit', calculatePaths);

    calculateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        calculatePaths(e);
    });

    generateMatrix(); // Инициализация матрицы при загрузке
});