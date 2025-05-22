document.addEventListener('DOMContentLoaded', () => {
    const vertexForm = document.getElementById('vertex-form');
    const vertexCountInput = document.getElementById('vertex-count');
    const weightModeSelect = document.getElementById('weight-mode');
    const edgeInputDiv = document.getElementById('edge-input');
    const edgeForm = document.getElementById('edge-form');
    const graphContainer = document.getElementById('graph');
    const mstContainer = document.getElementById('mst');
    const mstWeight = document.getElementById('mst-weight');
    const edgeWeightList = document.querySelector('.edge-weight-list');

    // Делаем graphNetwork и mstNetwork глобальными для тестов
    window.graphNetwork = null;
    window.mstNetwork = null;

    // Проверка подключения vis.js
    if (typeof vis === 'undefined') {
        console.error('vis.js is not loaded. Check the path /static/scripts/vis.min.js');
        alert('Error: vis.js is not loaded. Check the console for details.');
        return;
    }

    // Обработка отправки формы для создания графа
    vertexForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const vertexCount = parseInt(vertexCountInput.value);
        const weightMode = weightModeSelect.value;

        if (vertexCount < 1 || vertexCount > 12) {
            alert('Number of vertices must be between 1 and 12');
            return;
        }

        // Очистка предыдущих данных
        edgeInputDiv.style.display = 'none';
        edgeWeightList.innerHTML = '';
        mstWeight.textContent = 'Total Weight: ';
        mstWeight.classList.remove('updated');
        if (window.graphNetwork) window.graphNetwork.destroy();
        if (window.mstNetwork) window.mstNetwork.destroy();
        console.log('Form submitted:', { vertexCount, weightMode });

        // Генерация формы для ввода весов (ручной режим)
        if (weightMode === 'manual') {
            edgeInputDiv.style.display = 'block';
            for (let i = 0; i < vertexCount; i++) {
                for (let j = i + 1; j < vertexCount; j++) {
                    edgeWeightList.innerHTML += `
                        <div class="weight-row">
                            <label>Edge ${i + 1}-${j + 1}:</label>
                            <input type="number" id="edge-${i}-${j}" min="0" placeholder="0 for no edge">
                        </div>
                    `;
                }
            }

            edgeForm.onsubmit = async (e) => {
                e.preventDefault();
                const edges = [];
                for (let i = 0; i < vertexCount; i++) {
                    for (let j = i + 1; j < vertexCount; j++) {
                        const weightInput = document.getElementById(`edge-${i}-${j}`);
                        const weight = parseInt(weightInput.value);
                        if (weightInput.value === '' || weight === 0) {
                            continue; // Пропускаем ребро, если вес 0 или поле пустое
                        }
                        if (!isNaN(weight) && weight > 0) {
                            edges.push({ from: i, to: j, weight });
                        } else {
                            alert(`Edge weight ${i + 1}-${j + 1} must be a positive number`);
                            return;
                        }
                    }
                }
                console.log('Manual edges:', edges);
                // Если нет рёбер, добавляем минимальное ребро для теста
                if (edges.length === 0) {
                    edges.push({ from: 0, to: 1, weight: 1 });
                    console.log('Added a minimal edge for the test:', edges);
                }
                await renderGraph(vertexCount, edges, weightMode);
            };
        } else {
            try {
                console.log('Sending request to /generate_graph');
                const response = await fetch('/generate_graph', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ vertexCount, weightMode })
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status} - ${await response.text()}`);
                }
                const result = await response.json();
                console.log('Server response from /generate_graph:', result);
                const { edges } = result;
                if (!edges || edges.length === 0) {
                    alert('Generated graph is empty. Try again or switch to manual mode.');
                    return;
                }
                await renderGraph(vertexCount, edges, weightMode);
            } catch (error) {
                console.error('Error generating graph:', error);
                alert('Failed to generate graph. Check the console for details.');
            }
        }
    });

    async function renderGraph(vertexCount, edges, weightMode) {
        const nodes = Array.from({ length: vertexCount }, (_, i) => ({ id: i, label: `${i + 1}` }));
        const visEdges = edges.map(e => ({ from: e.from, to: e.to, label: `${e.weight}` }));

        graphContainer.innerHTML = '';
        graphContainer.style.height = '400px';
        graphContainer.style.width = '100%';

        const graphData = {
            nodes: new vis.DataSet(nodes),
            edges: new vis.DataSet(visEdges)
        };
        const options = {
            edges: { font: { align: 'top' } },
            physics: { enabled: true },
            layout: { improvedLayout: true }
        };
        window.graphNetwork = new vis.Network(graphContainer, graphData, options);
        console.log('Graph rendered, window.graphNetwork:', window.graphNetwork);

        // Автоматически запускаем алгоритм Прима с начальной вершиной 0
        const startVertex = 0; // Фиксированная начальная вершина
        console.log('Automatically running Prim\'s algorithm with start vertex:', startVertex);
        console.log('Sending to /prim:', { vertexCount, edges, startVertex, weightMode });

        try {
            const response = await fetch('/prim', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vertexCount, edges, startVertex, weightMode })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} - ${await response.text()}`);
            }
            const result = await response.json();
            console.log('Server response from /prim:', result);
            const { mstEdges, totalWeight } = result;

            if (!mstEdges || mstEdges.length === 0) {
                alert('MST is empty. The graph might be disconnected.');
                return;
            }

            mstContainer.innerHTML = '';
            mstContainer.style.height = '400px';
            mstContainer.style.width = '100%';

            const mstData = {
                nodes: new vis.DataSet(nodes),
                edges: new vis.DataSet(mstEdges.map(e => ({ from: e.from, to: e.to, label: `${e.weight}` })))
            };
            window.mstNetwork = new vis.Network(mstContainer, mstData, options);
            mstWeight.textContent = `Total Weight: ${totalWeight || 0}`;
            mstWeight.classList.add('updated');

            const logEntry = {
                timestamp: new Date().toISOString(),
                vertex_count: vertexCount,
                weight_mode: weightMode,
                initial_edges: edges,
                start_vertex: startVertex,
                mst_edges: mstEdges,
                total_weight: totalWeight
            };
            console.log('Sending to /log_prim:', logEntry);
            await fetch('/log_prim', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(logEntry)
            }).catch(error => console.error('Error logging:', error));
        } catch (error) {
            console.error('Error building MST:', error);
            alert('Failed to build MST. Check the console for details.');
        }
    }
});