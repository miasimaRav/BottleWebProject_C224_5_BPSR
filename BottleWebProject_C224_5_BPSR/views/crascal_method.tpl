% rebase('layout.tpl', title="Kruskal's Algorithm")

<div class="container">
    <div class="kruskal-wrapper">
        <div class="algorithms-wrapper">
            <div class="section-heading">
                <h1>Kruskal's Algorithm</h1>
                <p class="lead">
                    Kruskal's algorithm is a greedy method for finding a minimum spanning tree by sorting edges and choosing the lowest-weight ones that don't form cycles.
                    It is efficient for sparse graphs and uses the Union-Find data structure to detect cycles.
                </p>
                <a href="#calculator" class="btn btn-calculator">Go to Calculator</a>
            </div>

            <div class="panel">
                <div class="panel-heading">
                    <h4 class="panel-title">Algorithm Overview</h4>
                </div>
                <div class="panel-body">
                    <p>
                        Kruskal's algorithm is a classical greedy approach for finding a <strong>Minimum Spanning Tree (MST)</strong> in a connected, weighted, undirected graph.
                        It was first proposed by Joseph Kruskal in 1956.
                    </p>
                    <p>
                        A spanning tree connects all vertices of the graph with the minimum number of edges and no cycles.
                        Among all possible spanning trees, the one with the smallest total edge weight is the <em>minimum</em> spanning tree.
                    </p>
                    <p><strong>Steps of Kruskal's Algorithm:</strong></p>
                    <ol>
                        <li>Sort all edges in non-decreasing order of their weights.</li>
                        <li>Initialize the MST as an empty set.</li>
                        <li>For each edge in the sorted list:
                            <ul>
                                <li>If it connects two different components (no cycle), add it to the MST.</li>
                                <li>If it forms a cycle, discard it.</li>
                            </ul>
                        </li>
                        <li>Repeat until the MST contains (V - 1) edges (V is the number of vertices).</li>
                    </ol>
                    <p>
                        This algorithm uses the <strong>Union-Find</strong> (Disjoint Set Union, DSU) data structure to efficiently detect cycles.
                    </p>
                    <p>
                        The time complexity of Kruskal's algorithm is <strong>O(E log E)</strong>, where E is the number of edges, primarily due to sorting the edges.
                    </p>
                    <p>
                        Kruskal's method is especially useful when the graph is sparse (i.e., has relatively few edges compared to the number of vertices).
                    </p>
                </div>
            </div>

            <div class="panel">
                <div class="panel-heading">
                    <h4 class="panel-title">Example Illustration</h4>
                </div>
                <div class="panel-body image-panel">
                    <img id="illustration-image" src="/static/resources/Images/graph1.png">
                    <p id="illustration-caption"></p>
                    <button id="next-image-button" class="illustration-button">Next Step</button>
                </div>
            </div>

            <!-- Interactive Section -->
            <div class="panel" id="calculator">
                <div class="panel-heading">
                    <h4 class="panel-title">Interactive Calculator</h4>
                </div>
                <div class="panel-body">
                    <div class="calculator">
                        <div class="input-section">
                            <h3>Input Data</h3>
                            <form id="vertex-form">
                                <label for="vertex-count">Vertices (1-20):</label>
                                <input type="number" id="vertex-count" min="1" max="20" required>

                                <label for="weight-mode">Edge Weight:</label>
                                <select id="weight-mode">
                                    <option value="manual">Manual</option>
                                    <option value="auto">Automatic</option>
                                </select>

                                <button type="submit">Create Graph</button>
                            </form>

                            <div id="edge-input">
                                <h4>Enter Edge Weights</h4>
                                <form id="edge-form"></form>
                            </div>
                        </div>

                        <div class="graph-section">
                            <h3>Original Graph</h3>
                            <div id="graph" class="graph-box"></div>
                        </div>

                        <div class="mst-section">
                            <h3>Minimum Spanning Tree (MST)</h3>
                            <div id="mst" class="graph-box"></div>
                            <p id="mst-weight">Total Weight: </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="/static/scripts/vis.min.js"></script>
<link rel="stylesheet" href="/static/styles/style.css">
<script src="/static/scripts/kruskal.js"></script>