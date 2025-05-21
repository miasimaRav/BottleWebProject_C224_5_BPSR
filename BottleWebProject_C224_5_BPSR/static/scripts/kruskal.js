document.addEventListener('DOMContentLoaded', () => {
    const vertexForm = document.getElementById('vertex-form');
    const edgeForm = document.getElementById('edge-form');
    const edgeInput = document.getElementById('edge-input');
    const nextImageButton = document.getElementById('next-image-button');
    const illustrationImage = document.getElementById('illustration-image');
    const illustrationCaption = document.getElementById('illustration-caption');

    const illustrations = [
        {
            src: '/static/resources/Images/graph1.png',
            caption: `How does this algorithm work visually?...`
        },
        {
            src: '/static/resources/Images/graph2.png',
            caption: `Continuing to add edges...`
        },
        {
            src: '/static/resources/Images/graph3.png',
            caption: `As a result, we form the following subgraph...`
        },
        {
            src: '/static/resources/Images/graph4.png',
            caption: `The total weight of the resulting MST is...`
        }
    ];

    let currentIllustrationIndex = 0;

    if (nextImageButton && illustrationImage && illustrationCaption) {
        nextImageButton.addEventListener('click', () => {
            currentIllustrationIndex = (currentIllustrationIndex + 1) % illustrations.length;
            illustrationImage.src = illustrations[currentIllustrationIndex].src;
            illustrationCaption.textContent = illustrations[currentIllustrationIndex].caption;
        });

        illustrationImage.src = illustrations[0].src;
        illustrationCaption.textContent = illustrations[0].caption;
    }

    vertexForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const vertexCount = parseInt(document.getElementById('vertex-count').value);
        const weightMode = document.getElementById('weight-mode').value;

        if (vertexCount < 1 || vertexCount > 20) {
            alert('Number of vertices must be between 1 and 20');
            return;
        }

        edgeForm.innerHTML = '';

        if (weightMode === 'manual') {
            edgeInput.classList.add('visible');

            const outerWrapper = document.createElement('div');
            outerWrapper.classList.add('edge-form-outer-wrapper');

            const formContainer = document.createElement('div');
            formContainer.classList.add('edge-form-container');

            for (let i = 0; i < vertexCount; i++) {
                for (let j = i + 1; j < vertexCount; j++) {
                    const group = document.createElement('div');
                    group.classList.add('edge-group');

                    const label = document.createElement('label');
                    label.textContent = `Edge ${i + 1} → ${j + 1}`;
                    label.classList.add('edge-label');

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.name = `edge-${i + 1}-${j + 1}`;
                    input.id = `edge-${i + 1}-${j + 1}`;  // <-- ключевая строка
                    input.min = '0';
                    input.placeholder = 'Weight';
                    input.classList.add('edge-input');

                    group.appendChild(label);
                    group.appendChild(input);
                    formContainer.appendChild(group);
                }
            }

            outerWrapper.appendChild(formContainer);
            edgeForm.appendChild(outerWrapper);

            const submitEdges = document.createElement('button');
            submitEdges.type = 'submit';
            submitEdges.textContent = 'Submit Edges';
            submitEdges.classList.add('submit-edges');
            edgeForm.appendChild(submitEdges);
        } else {
            edgeInput.classList.remove('visible');
            fetchGraphData(vertexCount, [], weightMode);
        }
    });

    edgeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const vertexCount = parseInt(document.getElementById('vertex-count').value);
        const weightMode = document.getElementById('weight-mode').value;
        const edges = [];

        for (let i = 1; i <= vertexCount; i++) {
            for (let j = i + 1; j <= vertexCount; j++) {
                const input = document.getElementById(`edge-${i}-${j}`);
                if (input) {
                    const raw = input.value.trim();
                    const weight = parseInt(raw);
                    if (!isNaN(weight) && weight > 0) {
                        edges.push([i, j, weight]);
                    }
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
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errData => {
                        throw new Error(errData.detail || 'Server error');
                    });
                }
                return response.json();
            })
            .then(data => {
                renderGraph('graph', data.edges, vertexCount, false);

                if (data.disconnected) {
                    renderGraph('mst', [], vertexCount, true);
                    document.getElementById('mst-weight').textContent =
                        'Минимальный путь не может быть построен, так как граф не соединён. Общий вес: 0';
                } else {
                    renderGraph('mst', data.mst, vertexCount, true);
                    document.getElementById('mst-weight').textContent =
                        `Общий вес: ${data.total_weight}`;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message || 'An error occurred while processing the data');
            });
    }

    function renderGraph(containerId, edges, vertexCount, isMST) {
        const nodes = [];
        for (let i = 0; i < vertexCount; i++) {
            nodes.push({ id: i + 1, label: `${i + 1}` });
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
