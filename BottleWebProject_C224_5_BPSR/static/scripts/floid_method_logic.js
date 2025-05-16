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

    function calculatePaths() {
        const size = parseInt(sizeInput.value);
        const inputMatrix = [];

        // Read input matrix
        const rows = adjMatrix.querySelectorAll('tr:not(:first-child)');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td input');
            const rowData = [];
            cells.forEach(cell => {
                rowData.push(cell.value === 'INF' ? Infinity : parseInt(cell.value));
            });
            inputMatrix.push(rowData);
        });

        // Initialize result matrix (copy of input)
        const dist = [];
        for (let i = 0; i < size; i++) {
            dist[i] = [...inputMatrix[i]];
        }

        // Floyd-Warshall algorithm
        for (let k = 0; k < size; k++) {
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }

        // Display results
        let html = '<tr><th>#</th>';
        for (let i = 0; i < size; i++) {
            html += `<th>${String.fromCharCode(65 + i)}</th>`;
        }
        html += '</tr>';

        for (let i = 0; i < size; i++) {
            html += `<tr><th>${String.fromCharCode(65 + i)}</th>`;
            for (let j = 0; j < size; j++) {
                const cellClass = i === j ? 'class="diagonal"' : '';
                const value = dist[i][j] === Infinity ? 'INF' : dist[i][j];
                html += `<td ${cellClass}>${value}</td>`;
            }
            html += '</tr>';
        }

        resultMatrix.innerHTML = html;
        resultSection.style.display = 'block';
    }
});