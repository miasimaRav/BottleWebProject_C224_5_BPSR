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
            caption: `How does this algorithm work visually? Let's consider a weighted, connected, undirected graph with 6 vertices. We list its edges in sorted order:\n\n1 ↔ 3 weight 1\n 3 ↔ 4 weight 1\n3 ↔ 6 weight 2\n1 ↔ 2 weight 3\n5 ↔ 6 weight 4\n1 ↔ 6 weight 5\n2 ↔ 3 weight 5\n4 ↔ 5 weight 8\n4 ↔ 6 weight 9\n\nNow, we add edges to our tree in order, avoiding cycles.`
        },
        {
            src: '/static/resources/Images/graph2.png',
            caption: `Continuing to add edges, we notice that, for example, we cannot add the edge between vertices 1 and 6, as it would form a cycle. After the second pass, we get the following result:`
        },
        {
            src: '/static/resources/Images/graph3.png',
            caption: `As a result, we form the following subgraph. We have connected all vertices with edges of the minimum possible weights, meaning our minimum spanning tree is complete! :)`
        },
        {
            src: '/static/resources/Images/graph4.png',
            caption: `The total weight of the resulting MST is the sum of the weights of all highlighted edges, which is 11.`
        }
    ];

    let currentIllustrationIndex = 0;

    if (nextImageButton && illustrationImage && illustrationCaption) {
        nextImageButton.addEventListener('click', () => {
            currentIllustrationIndex = (currentIllustrationIndex + 1) % illustrations.length;
            illustrationImage.src = illustrations[currentIllustrationIndex].src;
            illustrationCaption.textContent = illustrations[currentIllustrationIndex].caption;
        });

        // Initialize with the first image and caption
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

        for (let i = 0; i < vertexCount; i++) {
            for (let j = i + 1; j < vertexCount; j++) {
                const input = document.querySelector(`input[name="edge-${i + 1}-${j + 1}"]`);
                const weight = parseInt(input?.value || '0');
                if (weight > 0) {
                    edges.push([i + 1, j + 1, weight]);
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
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                renderGraph('graph', data.edges, vertexCount, false);
                renderGraph('mst', data.mst, vertexCount, true);
                document.getElementById('mst-weight').textContent = `Total weight: ${data.total_weight}`;
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while processing the data');
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