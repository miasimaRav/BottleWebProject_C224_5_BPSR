document.addEventListener('DOMContentLoaded', () => {
    const vertexForm = document.getElementById('vertex-form');
    const edgeForm = document.getElementById('edge-form');
    const edgeInput = document.getElementById('edge-input');

    vertexForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const vertexCount = parseInt(document.getElementById('vertex-count').value);
        const weightMode = document.getElementById('weight-mode').value;

        if (vertexCount < 1 || vertexCount > 20) {
            alert('Количество вершин должно быть от 1 до 20');
            return;
        }

        edgeForm.innerHTML = '';
        if (weightMode === 'manual') {
            edgeInput.style.display = 'block';
            const outerWrapper = document.createElement('div');
            outerWrapper.style.display = 'flex';
            outerWrapper.style.justifyContent = 'center';
            outerWrapper.style.marginTop = '20px';

            const formContainer = document.createElement('div');
            formContainer.style.display = 'flex';
            formContainer.style.flexWrap = 'wrap';
            formContainer.style.gap = '20px';
            formContainer.style.maxWidth = '800px';
            formContainer.style.justifyContent = 'center';

            for (let i = 0; i < vertexCount; i++) {
                for (let j = i + 1; j < vertexCount; j++) {
                    const group = document.createElement('div');
                    group.style.display = 'flex';
                    group.style.flexDirection = 'column';
                    group.style.maxWidth = '180px';

                    const label = document.createElement('label');
                    label.textContent = `Ребро ${i} → ${j}`;
                    label.style.fontWeight = '600';
                    label.style.color = '#2e7d32';
                    label.style.marginBottom = '5px';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.name = `edge-${i}-${j}`;
                    input.min = '0';
                    input.placeholder = 'Вес';
                    input.style.padding = '6px';
                    input.style.fontSize = '16px';
                    input.style.border = '1px solid #ccc';
                    input.style.borderRadius = '4px';

                    group.appendChild(label);
                    group.appendChild(input);
                    formContainer.appendChild(group);
                }
            }

            outerWrapper.appendChild(formContainer);
            edgeForm.appendChild(outerWrapper);

            const submitEdges = document.createElement('button');
            submitEdges.type = 'submit';
            submitEdges.textContent = 'Отправить рёбра';
            submitEdges.style.marginTop = '20px';
            submitEdges.style.display = 'block';
            submitEdges.style.marginLeft = 'auto';
            submitEdges.style.marginRight = 'auto';
            submitEdges.style.backgroundColor = '#2e7d32';
            submitEdges.style.color = 'white';
            submitEdges.style.padding = '10px 20px';
            submitEdges.style.fontSize = '16px';
            submitEdges.style.border = 'none';
            submitEdges.style.borderRadius = '4px';
            submitEdges.style.cursor = 'pointer';

            submitEdges.addEventListener('mouseover', () => {
                submitEdges.style.backgroundColor = '#1b5e20';
            });

            submitEdges.addEventListener('mouseout', () => {
                submitEdges.style.backgroundColor = '#2e7d32';
            });

            edgeForm.appendChild(submitEdges);
        } else {
            edgeInput.style.display = 'none';
            fetchGraphData(vertexCount, [], weightMode);
        }
    });

    edgeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const vertexCount = parseInt(document.getElementById('vertex-count').value);
        const weightMode = document.getElementById('weight-mode').value;
        const edges = [];

        for (let i = 0; i < vertexCount; i++) {
            for (let j = i + 1; j < vertexCount; j++) {
                const input = document.querySelector(`input[name="edge-${i}-${j}"]`);
                const weight = parseInt(input?.value || '0');
                if (weight > 0) {
                    edges.push([i, j, weight]);
                }
            }
        }

        fetchGraphData(vertexCount, edges, weightMode);
    });

    function fetchGraphData(vertexCount, edges, weightMode) {
        fetch('/kruskal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                vertex_count: vertexCount,
                edges: edges,
                weight_mode: weightMode,
            }),
        })
            .then(response => response.json())
            .then(data => {
                renderGraph('graph', data.edges, vertexCount, false);
                renderGraph('mst', data.mst, vertexCount, true);
                document.getElementById('mst-weight').textContent = `Общий вес: ${data.total_weight}`;
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при обработке данных');
            });
    }

    function renderGraph(containerId, edges, vertexCount, isMST) {
        const nodes = [];
        for (let i = 0; i < vertexCount; i++) {
            nodes.push({ id: i, label: `${i}` });
        }

        const edgeData = edges.map((edge, index) => ({
            from: edge[0],
            to: edge[1],
            label: `${edge[2]}`,
            color: isMST ? { color: '#2e7d32' } : { color: '#666' },
            id: index,
        }));

        const container = document.getElementById(containerId);
        const data = {
            nodes: new vis.DataSet(nodes),
            edges: new vis.DataSet(edgeData),
        };

        const options = {
            edges: {
                font: { align: 'middle' },
                smooth: { type: 'continuous' },
            },
            physics: {
                forceAtlas2Based: {
                    gravitationalConstant: -50,
                    centralGravity: 0.01,
                    springLength: 100,
                    springConstant: 0.08,
                },
                maxVelocity: 50,
                solver: 'forceAtlas2Based',
                timestep: 0.35,
            },
        };

        new vis.Network(container, data, options);
    }
});
