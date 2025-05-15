document.getElementById('vertex-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const vertexCount = parseInt(document.getElementById('vertex-count').value);
    const weightMode = document.getElementById('weight-mode').value;

    if (vertexCount < 1 || vertexCount > 20) {
        alert('Количество вершин должно быть от 1 до 20');
        return;
    }

    // Очистка предыдущих данных
    document.getElementById('edge-input').style.display = 'none';
    document.getElementById('edge-form').innerHTML = '';
    document.getElementById('mst-weight').textContent = 'Сумма весов: ';

    // Генерация формы для ввода весов (ручной режим)
    if (weightMode === 'manual') {
        const edgeForm = document.getElementById('edge-form');
        for (let i = 0; i < vertexCount; i++) {
            for (let j = i + 1; j < vertexCount; j++) {
                edgeForm.innerHTML += `
                    <label>Вес ребра ${i + 1}-${j + 1}:</label>
                    <input type="number" id="edge-${i}-${j}" min="1" required>
                `;
            }
        }
        edgeForm.innerHTML += '<button type="submit">Подтвердить</button>';
        document.getElementById('edge-input').style.display = 'block';

        edgeForm.onsubmit = async (e) => {
            e.preventDefault();
            const edges = [];
            for (let i = 0; i < vertexCount; i++) {
                for (let j = i + 1; j < vertexCount; j++) {
                    const weight = parseInt(document.getElementById(`edge-${i}-${j}`).value);
                    edges.push({ from: i, to: j, weight });
                }
            }
            await renderGraph(vertexCount, edges);
        };
    } else {
        // Автоматический режим: запрос на сервер для генерации весов
        const response = await fetch('/generate_graph', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ vertexCount })
        });
        const { edges } = await response.json();
        await renderGraph(vertexCount, edges);
    }
});

async function renderGraph(vertexCount, edges) {
    const nodes = Array.from({ length: vertexCount }, (_, i) => ({ id: i, label: `${i + 1}` }));
    const visEdges = edges.map(e => ({ from: e.from, to: e.to, label: `${e.weight}` }));

    const graphContainer = document.getElementById('graph');
    const graphData = { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(visEdges) };
    const graph = new vis.Network(graphContainer, graphData, {});

    graph.on('click', async (params) => {
        if (params.nodes.length > 0) {
            const startVertex = params.nodes[0];
            const response = await fetch('/prim', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vertexCount, edges, startVertex })
            });
            const { mstEdges, totalWeight } = await response.json();

            // Отрисовка MST
            const mstContainer = document.getElementById('mst');
            const mstData = {
                nodes: new vis.DataSet(nodes),
                edges: new vis.DataSet(mstEdges.map(e => ({ from: e.from, to: e.to, label: `${e.weight}` })))
            };
            new vis.Network(mstContainer, mstData, {});
            document.getElementById('mst-weight').textContent = `Сумма весов: ${totalWeight}`;
        }
    });
}
