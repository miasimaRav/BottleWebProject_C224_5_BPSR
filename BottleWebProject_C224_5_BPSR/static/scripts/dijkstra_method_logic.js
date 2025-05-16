
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

    generateMatrix();

    sizeInput.addEventListener('input', generateMatrix);
    generateBtn.addEventListener('click', generateMatrix);
    calculateBtn.addEventListener('click', calculatePaths);

    function generateMatrix() {
        const size = parseInt(sizeInput.value);
    if (isNaN(size) || size < 2) return;

    // Обновление селекторов начальной и конечной вершины
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
        html += `<td><input type="text" value=""></td>`;
                } else if (j > i) {
        html += `<td><input type="text" value="${Math.random() > 0.3 ? Math.floor(Math.random() * 9) + 1 : 'INF'}"></td>`;
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
    if (isNaN(size) || size < 2) return;

    const graph = {};
    for (let i = 0; i < size; i++) {
        graph[String.fromCharCode(65 + i)] = [];
    }

    const rows = adjMatrix.querySelectorAll('tr:not(:first-child)');
    for (let i = 0; i < size; i++) {
        const cells = rows[i].querySelectorAll('td input');
        for (let j = 0; j < size; j++) {
            if (i === j) continue;
            if (j > i) {
                const val = cells[j].value.trim();
                if (val === '' || val.toUpperCase() === 'INF') continue;
                const weight = parseInt(val);
                if (!isNaN(weight)) {
                    const from = String.fromCharCode(65 + i);
                    const to = String.fromCharCode(65 + j);
                    graph[from].push([to, weight]);
                    graph[to].push([from, weight]);
                }
            }
        }
    }

    const start = startSelect.value;
    const end = endSelect.value;
    const result = dijkstra(graph, start);

    resultSection.style.display = 'block';

    if (
        result.distances[end] === Infinity ||
        (result.previous[end] === undefined && start !== end)
    ) {
        resultPathP.innerHTML = `<div class="result-box error">Нет пути от <strong>${start}</strong> до <strong>${end}</strong></div>`;
        resultLengthP.innerHTML = '';
    } else {
        const path = reconstructPath(result.previous, start, end);
        resultPathP.innerHTML = `<div class="result-box success">Кратчайший путь: <strong>${path.join(' → ')}</strong></div>`;
        resultLengthP.innerHTML = `<div class="result-box info">Длина пути: <strong>${result.distances[end]}</strong></div>`;
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


