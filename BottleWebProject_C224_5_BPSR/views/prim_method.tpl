% rebase('layout.tpl', title="Prim's Algorithm")
<link rel="stylesheet" href="/static/content/prim_method_styles.css">
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
                <label>Number of Vertices (1-12):</label>
                <input type="number" id="vertex-count" min="1" max="12" required>
                <label>Edge Weight Mode:</label>
                <select id="weight-mode">
                    <option value="manual">Manual</option>
                    <option value="auto">Automatic</option>
                </select>
                <button type="submit" class="create-graph-btn">Create Graph</button>
            </form>
            <div id="edge-input">
                <h4>Enter Edge Weights</h4>
                <form id="edge-form">
                    <div class="edge-weight-list"></div>
                    <button type="submit" class="confirm-btn">Confirm</button>
                </form>
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
<script src="/static/scripts/vis.min.js"></script>
<script src="/static/scripts/prim_method.js"></script>