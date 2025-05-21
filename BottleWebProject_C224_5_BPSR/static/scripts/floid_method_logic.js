document.addEventListener('DOMContentLoaded', () => {
    const matrixForm = document.getElementById('matrixForm');
    const matrixSizeInput = document.getElementById('matrixSize');
    const generateMatrixBtn = document.getElementById('generateMatrix');
    const adjacencyMatrix = document.getElementById('adjacencyMatrix');
    const resultSection = document.getElementById('resultSection');
    const resultPath = document.getElementById('resultPath');
    const resultLength = document.getElementById('resultLength');
    const errorMessage = document.getElementById('errorMessage');
    const startSelect = document.getElementById('startNode');
    const endSelect = document.getElementById('endNode');

    if (!matrixForm || !matrixSizeInput || !generateMatrixBtn || !adjacencyMatrix || !resultSection || !resultPath || !resultLength || !errorMessage || !startSelect || !endSelect) {
        console.error('One or more elements not found:', {
            matrixForm: !!matrixForm,
            matrixSizeInput: !!matrixSizeInput,
            generateMatrixBtn: !!generateMatrixBtn,
            adjacencyMatrix: !!adjacencyMatrix,
            resultSection: !!resultSection,
            resultPath: !!resultPath,
            resultLength: !!resultLength,
            errorMessage: !!errorMessage,
            startSelect: !!startSelect,
            endSelect: !!endSelect
        });
        alert('Error: Could not load page elements. Check console.');
        return;
    }

    generateMatrix();

    matrixSizeInput.addEventListener('change', generateMatrix);
    generateMatrixBtn.addEventListener('click', generateMatrix);
    matrixForm.addEventListener('submit', calculatePaths);

    function generateMatrix() {
        const size = Math.min(13, Math.max(2, parseInt(matrixSizeInput.value) || 2));
        matrixSizeInput.value = size;

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
                    html += `<td ${cellClass}><input type="text" id="matrix-${i}-${j}" value="∞" readonly></td>`;
                } else if (j > i) {
                    const value = Math.random() > 0.3 ? Math.floor(Math.random() * 9) + 1 : '∞';
                    html += `<td ${cellClass}><input type="text" id="matrix-${i}-${j}" value="${value}"></td>`;
                } else {
                    html += `<td ${cellClass}><input type="text" id="matrix-${i}-${j}" value="" readonly></td>`;
                }
            }
            html += '</tr>';
        }

        adjacencyMatrix.innerHTML = html;
        resultSection.style.display = 'none';
        resultPath.innerHTML = '';
        resultLength.innerHTML = '';
        errorMessage.innerHTML = '';
    }

    async function calculatePaths(e) {
        e.preventDefault();
        const size = parseInt(matrixSizeInput.value);
        const startNode = startSelect.value;
        const endNode = endSelect.value;

        if (size < 2 || size > 13) {
            errorMessage.innerHTML = '<div class="alert alert-danger">Number of vertices must be between 2 and 13</div>';
            return;
        }

        if (startNode === endNode) {
            errorMessage.innerHTML = '<div class="alert alert-danger">Start and end nodes cannot be the same</div>';
            return;
        }

        const matrix = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                const input = document.getElementById(`matrix-${i}-${j}`);
                let value = input.value.trim();
                if (value.toUpperCase() === 'INF' || value === '∞') {
                    value = 'INF';
                } else if (!/^\d+$/.test(value) || parseInt(value) === 0) {
                    errorMessage.innerHTML = '<div class="alert alert-danger">Edge weights must be positive integers or infinity (∞)</div>';
                    input.style.backgroundColor = '#ffd6d6';
                    return;
                } else {
                    value = parseInt(value);
                }
                row.push(value);
            }
            matrix.push(row);
        }

        resultSection.style.display = 'none';
        errorMessage.innerHTML = '';

        try {
            console.log('Sending request to server');
            console.log('Matrix:', matrix, 'Start:', startNode, 'End:', endNode);
            const response = await fetch('/dijkstra_calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ matrixSize: size, matrix, startNode, endNode })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Received result:', result);
            displayResult(result);
        } catch (error) {
            console.error('Error calculating paths:', error);
            errorMessage.innerHTML = '<div class="alert alert-danger">Failed to compute path. Check console for details.</div>';
        }
    }

    function displayResult(data) {
        if (data.status === 'error') {
            errorMessage.innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
            resultSection.style.display = 'block';
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        if (!data.path || !Array.isArray(data.path)) {
            errorMessage.innerHTML = '<div class="alert alert-danger">Invalid result from server.</div>';
            resultSection.style.display = 'block';
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        resultSection.style.display = 'block';
        if (data.path.length === 0) {
            resultPath.innerHTML = `<div class="result-box error">No path from <strong>${data.startNode}</strong> to <strong>${data.endNode}</strong></div>`;
            resultLength.innerHTML = '';
        } else {
            resultPath.innerHTML = `<div class="result-box success">Shortest path: <strong>${data.path.join(' → ')}</strong></div>`;
            resultLength.innerHTML = `<div class="result-box info">Path length: <strong>${data.distance}</strong></div>`;
        }
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});