document.addEventListener('DOMContentLoaded', function () {
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

    generateMatrix();

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
    calculateBtn.addEventListener('click', () => {
        clearMessages();
        clearInputHighlight();
        calculatePaths();
    });

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

        // clear highlights of weights in the table
        const inputs = adjMatrix.querySelectorAll('input[type="text"]');
        inputs.forEach(inp => inp.style.backgroundColor = '');
    }

    function generateMatrix() {
        const size = parseInt(sizeInput.value);
        if (isNaN(size) || size < 2 || size > 12) return;

        // Update start and end node selectors
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
                if (i === j) {
                    html += `<td><input type="text" value="∞" readonly disabled></td>`;
                } else if (j > i) {
                    // Random weight or ∞
                    const val = Math.random() > 0.3 ? (Math.floor(Math.random() * 9) + 1).toString() : '∞';
                    html += `<td><input type="text" value="${val}"></td>`;
                } else {
                    html += `<td><input type="text" value="" readonly disabled></td>`;
                }
            }
            html += '</tr>';
        }

        adjMatrix.innerHTML = html;
        resultSection.style.display = 'none';
        resultPathP.innerHTML = '';
        resultLengthP.innerHTML = '';
    }

    function calculatePaths() {
        const size = parseInt(sizeInput.value);

        // Check number of nodes
        if (isNaN(size) || size < 2 || size > 12) {
            setErrorMessage('Number of nodes must be between 2 and 12');
            highlightInputError(sizeInput);
            resultSection.style.display = 'none';
            return;
        }

        const start = startSelect.value;
        const end = endSelect.value;

        // Check that start and end are different
        if (start === end) {
            setErrorMessage('Start and end nodes cannot be the same');
            highlightInputError(startSelect);
            highlightInputError(endSelect);
            resultSection.style.display = 'none';
            return;
        }

        // Build the graph with weight checks
        const graph = {};
        for (let i = 0; i < size; i++) {
            graph[String.fromCharCode(65 + i)] = [];
        }

        const rows = adjMatrix.querySelectorAll('tr:not(:first-child)');
        let hasInvalidWeight = false;

        for (let i = 0; i < size; i++) {
            const cells = rows[i].querySelectorAll('td input');
            for (let j = 0; j < size; j++) {
                if (i === j) continue;
                if (j > i) {
                    const input = cells[j];
                    let val = input.value.trim();

                    // Replace INF → ∞ for checking
                    if (val.toUpperCase() === 'INF') val = '∞';

                    if (val === '' || val === '∞') {
                        // edge absent (∞)
                        continue;
                    }

                    // Check weight is positive integer
                    if (!/^\d+$/.test(val) || parseInt(val) === 0) {
                        highlightInputError(input);
                        hasInvalidWeight = true;
                    } else {
                        const weight = parseInt(val);
                        const from = String.fromCharCode(65 + i);
                        const to = String.fromCharCode(65 + j);
                        graph[from].push([to, weight]);
                        graph[to].push([from, weight]);
                    }
                }
            }
        }

        if (hasInvalidWeight) {
            setErrorMessage('Edge weights must be positive integers or infinity (∞)');
            resultSection.style.display = 'none';
            return;
        }

        const result = dijkstra(graph, start);

        resultSection.style.display = 'block';

        if (
            result.distances[end] === Infinity ||
            (result.previous[end] === undefined && start !== end)
        ) {
            resultPathP.innerHTML = `<div class="result-box error">No path from <strong>${start}</strong> to <strong>${end}</strong></div>`;
            resultLengthP.innerHTML = '';
        } else {
            const path = reconstructPath(result.previous, start, end);
            resultPathP.innerHTML = `<div class="result-box success">Shortest path: <strong>${path.join(' → ')}</strong></div>`;
            resultLengthP.innerHTML = `<div class="result-box info">Path length: <strong>${result.distances[end]}</strong></div>`;
        }
    }

    function dijkstra(graph, start) {
        const distances = {};
        const previous = {};
        const visited = new Set();
        const pq = new MinPriorityQueue();

        for (const node in graph) {
            distances[node] = Infinity;
        }
        distances[start] = 0;
        pq.enqueue(start, 0);

        while (!pq.isEmpty()) {
            const { element: current } = pq.dequeue();
            if (visited.has(current)) continue;
            visited.add(current);

            for (const [neighbor, weight] of graph[current]) {
                const alt = distances[current] + weight;
                if (alt < distances[neighbor]) {
                    distances[neighbor] = alt;
                    previous[neighbor] = current;
                    pq.enqueue(neighbor, alt);
                }
            }
        }

        return { distances, previous };
    }

    function reconstructPath(previous, start, end) {
        const path = [];
        let current = end;
        while (current !== undefined) {
            path.unshift(current);
            if (current === start) break;
            current = previous[current];
        }
        return path;
    }

    class MinPriorityQueue {
        constructor() {
            this.items = [];
        }
        enqueue(element, priority) {
            this.items.push({ element, priority });
            this.items.sort((a, b) => a.priority - b.priority);
        }
        dequeue() {
            return this.items.shift();
        }
        isEmpty() {
            return this.items.length === 0;
        }
    }
});
