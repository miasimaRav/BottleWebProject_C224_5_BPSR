% rebase('layout.tpl', title="Kruskal's Algorithm")

<div class="kruskal-container">
    <!-- Theory Section -->
    <section class="theory">
        <h2>Kruskal's Algorithm</h2>
        <p>Kruskal's algorithm is a greedy method to find the Minimum Spanning Tree (MST) of a connected, weighted graph. The steps are as follows:</p>
        <ol>
            <li>Sort all edges of the graph in non-decreasing order of their weight.</li>
            <li>Initialize the MST as an empty set.</li>
            <li>Add the smallest edge to the MST that doesn’t form a cycle with the edges already in the MST.</li>
            <li>Repeat until the MST contains (V - 1) edges, where V is the number of vertices.</li>
        </ol>
        <p>The result is a tree that connects all vertices with the minimum total edge weight.</p>
    </section>

    <!-- Interactive Section -->
    <div class="calculator">
        <div class="input-section">
            <h3>Input Data</h3>
            <form id="vertex-form">
                <label>Number of Vertices (1–20):</label>
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
            <h3>Original Graph</h3>
            <div id="graph" style="height: 400px; border: 1px solid #ccc;"></div>
        </div>

        <div class="mst-section">
            <h3>Minimum Spanning Tree (MST)</h3>
            <div id="mst" style="height: 400px; border: 1px solid #ccc;"></div>
            <p id="mst-weight">Total Weight: </p>
        </div>
    </div>
</div>

<script src="/static/scripts/vis.min.js"></script>
<script src="/static/scripts/kruskal.js"></script>
