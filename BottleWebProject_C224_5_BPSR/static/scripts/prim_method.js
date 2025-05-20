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

    let graphNetwork = null;
    let mstNetwork = null;

    // Проверка подключения vis.js
    if (typeof vis === 'undefined') {
        console.error('vis.js не загружен. Проверьте путь /static/scripts/vis.min.js');
        alert('Ошибка: vis.js не загружен. Проверьте консоль для деталей.');
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
        if (graphNetwork) graphNetwork.destroy();
        if (mstNetwork) mstNetwork.destroy();

        // Генерация формы для ввода весов (ручной режим)
        if (weightMode === 'manual') {
            for (let i = 0; i < vertexCount; i++) {
                for (let j = i + 1; j < vertexCount; j++) {
                    edgeWeightList.innerHTML += `
                        <div class="weight-row">
                            <label>Edge ${i + 1}-${j + 1}:</label>
                            <input type="number" id="edge-${i}-${j}" min="1" required>
                        </div>
                    `;
                }
            }
            edgeInputDiv.style.display = 'block';

            edgeForm.onsubmit = async (e) => {
                e.preventDefault();
                const edges = [];
                for (let i = 0; i < vertexCount; i++) {
                    for (let j = i + 1; j < vertexCount; j++) {
                        const weight = parseInt(document.getElementById(`edge-${i}-${j}`).value);
                        if (isNaN(weight) || weight < 1) {
                            alert(`Edge weight ${i + 1}-${j + 1} must be a positive number`);
                            return;
                        }
                        edges.push({ from: i, to: j, weight });
                    }
                }
                await renderGraph(vertexCount, edges, weightMode);
            };
        } else {
            try {
                const response = await fetch('/generate_graph', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ vertexCount, weightMode })
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const { edges } = await response.json();
                await renderGraph(vertexCount, edges, weightMode);
            } catch (error) {
                console.error('Ошибка при генерации графа:', error);
                alert('Не удалось сгенерировать граф. Проверьте консоль для деталей.');
            }
        }
    });

    async function renderGraph(vertexCount, edges, weightMode) {
        const nodes = Array.from({ length: vertexCount }, (_, i) => ({ id: i, label: `${i + 1}` }));
        const visEdges = edges.map(e => ({ from: e.from, to: e.to, label: `${e.weight}` }));

        graphContainer.innerHTML = '';
        graphContainer.style.height = '400px';
        graphContainer.style.width = '100%';

        const graphData = { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(visEdges) };
        const options = {
            edges: { font: { align: 'top' } },
            physics: { enabled: true }
        };
        graphNetwork = new vis.Network(graphContainer, graphData, options);

        graphNetwork.on('click', async (params) => {
            if (params.nodes.length > 0) {
                const startVertex = params.nodes[0];
                try {
                    const response = await fetch('/prim', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ vertexCount, edges, startVertex, weightMode })
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const { mstEdges, totalWeight } = await response.json();

                    mstContainer.innerHTML = '';
                    mstContainer.style.height = '400px';
                    mstContainer.style.width = '100%';

                    const mstData = {
                        nodes: new vis.DataSet(nodes),
                        edges: new vis.DataSet(mstEdges.map(e => ({ from: e.from, to: e.to, label: `${e.weight}` })))
                    };
                    mstNetwork = new vis.Network(mstContainer, mstData, options);
                    mstWeight.textContent = `Total Weight: ${totalWeight}`;
                    mstWeight.classList.add('updated');
                } catch (error) {
                    console.error('Ошибка при построении MST:', error);
                    alert('Не удалось построить MST. Проверьте консоль для деталей.');
                }
            }
        });
    }
});