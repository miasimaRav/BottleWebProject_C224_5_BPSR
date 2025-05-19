document.getElementById('vertex-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const mode = document.getElementById('weight-mode').value;
    const edgeInput = document.getElementById('edge-input');
    const edgeForm = document.getElementById('edge-form');
    edgeForm.innerHTML = '';

    if (mode === 'manual') {
        edgeInput.style.display = 'block';

        const vertexCount = parseInt(document.getElementById('vertex-count').value);

        // Обёртка, центрирующая форму
        const outerWrapper = document.createElement('div');
        outerWrapper.style.display = 'flex';
        outerWrapper.style.justifyContent = 'center';
        outerWrapper.style.marginTop = '20px';

        // Внутренний flex-контейнер
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
                label.textContent = `Edge ${i} → ${j}`;
                label.style.fontWeight = '600';
                label.style.color = '#2e7d32';
                label.style.marginBottom = '5px';

                const input = document.createElement('input');
                input.type = 'number';
                input.name = `edge-${i}-${j}`;
                input.min = 0;
                input.placeholder = 'Enter weight';
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

        // Кнопка отправки
        const submitEdges = document.createElement('button');
        submitEdges.type = 'submit';
        submitEdges.textContent = 'Submit Edges';
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
    }
});

