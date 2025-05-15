% rebase('layout.tpl', title="Prim's Algorithm")
<div class="prim-container">
    <!-- Theory -->
    <section class="theory">
        <h2>Prim's Algorithm</h2>
        <p>Prim's algorithm is a greedy algorithm used to find the Minimum Spanning Tree (MST) in a connected weighted graph. It works as follows:</p>
        <ol>
            <li>Choose an arbitrary vertex as the starting point.</li>
            <li>Add the edge with the smallest weight that connects an included vertex to an unvisited vertex to the MST.</li>
            <li>Repeat step 2 until all vertices are included in the MST.</li>
        </ol>
        <p>The result is a tree that connects all vertices with the minimum total edge weight.</p>
    </section>

    <!-- Interactive Section -->
    <div class="calculator">
        <div class="input-section">
            <h3>Input Data</h3>
            <form id="vertex-form">
                <label>Number of Vertices (1-20):</label>
                <input type="number" id="vertex-count" min="1" max="20" required>
                <label>Edge Weight Mode:</label>
                <select id="weight-mode">
                    <option value="manual">Manual</option>
                    <option value="auto">Automatic</option>
                </select>
                <button type="submit">Create Graph</button>
            </form>
            <div id="edge-input" style="display: none;">
                <h4>Enter Edge Weights</h4>
                <form id="edge-form"></form>
            </div>
        </div>
        <div class="graph-section">
            <h3>Graph</h3>
            <div id="graph" style="height: 400px; width: 100%; border: 1px solid #ccc;"></div>
            <p>Click a vertex to select the starting point.</p>
        </div>
        <div class="mst-section">
            <h3>Minimum Spanning Tree</h3>
            <div id="mst" style="height: 400px; width: 100%; border: 1px solid #ccc;"></div>
            <p id="mst-weight" class="mst-weight">Total Weight: </p>
        </div>
    </div>
</div>
<style>
.mst-weight {
    font-size: 1.2em;
    font-weight: bold;
    color: #2c3e50;
    background: linear-gradient(90deg, #AFD9C3, #B8DFDC, #6CAEBC);
    padding: 10px 20px;
    border-radius: 8px;
    display: inline-block;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.mst-weight.updated {
    animation: highlight 0.5s ease;
}

@keyframes highlight {
    0% { transform: scale(1); box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); }
    50% { transform: scale(1.05); box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); }
    100% { transform: scale(1); box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); }
}
</style>
<script src="/static/scripts/vis.min.js"></script>
<script src="/static/scripts/prim_method.js"></script>