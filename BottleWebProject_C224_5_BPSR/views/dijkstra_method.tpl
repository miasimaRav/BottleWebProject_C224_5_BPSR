% rebase('layout.tpl', title='Dijkstra algorithm', year=year)

<link rel="stylesheet" href="/static/content/dijkstra_method_styles.css">


<div class="dijkstra-container">
    <!-- Theory Section -->
    <section class="theory">
        <h2>Theory</h2>
        <p>Dijkstra's algorithm is used to find the shortest path (with the smallest total edge weights) from one vertex to another in a graph. It works only when all edge weights are positive.</p>
        <p>A graph consists of:</p>
        <ul>
            <li><strong>Vertices</strong> (points), e.g., cities A, B, C...</li>
            <li><strong>Edges</strong> (lines connecting them), e.g., a road from A to B with length 5.</li>
        </ul>
        <p>Edges can have weights — a number showing how much it costs/how long/how much time is needed to move between vertices.</p>
        <h4>How it works:</h4>
        <p>The algorithm remembers:</p>
        <ul>
            <li>Distance to each vertex from the start (initially infinity).</li>
            <li>The path used to reach each vertex (for route recovery).</li>
            <li>A queue from which we take the vertex with the smallest distance.</li>
        </ul>
        <h4>Step 1: Initialization</h4>
        <ul>
            <li>Set distance to the start (e.g., A) as 0.</li>
            <li>Set all others to infinity (∞).</li>
            <li>Put the start vertex into the queue.</li>
        </ul>
        <h4>Step 2: Main loop</h4>
        <p>While the queue is not empty:</p>
        <ul>
            <li>Take the vertex with the smallest distance (e.g., A).</li>
            <li>Look at all its neighbors.</li>
            <li>Check: is it shorter to go through this vertex?</li>
        </ul>
        <p><strong>Formula:</strong><br>
            New distance = current vertex distance + edge weight to neighbor</p>
        <p>If this is smaller than the current neighbor's distance — update it.</p>

        <h4>Step 3: Repeat</h4>
        <p>Move to the next vertex in the queue with the smallest distance.</p>

        <h4>Step 4: Stop</h4>
        <p>Once the target vertex (e.g., C) is reached, restore the path and output the result.</p>

        <p>Dijkstra’s algorithm is fundamental for GPS navigation, network routing, and many optimization problems.</p>
    </section>

    <!-- Calculator Section -->
    <div class="calculator">
        <div class="input-section">
            <h3>Graph Input</h3>
            <form method="post" action="/calculate">
                <label for="nodes">Number of nodes (1–100):</label>
                <input type="number" name="nodes" min="1" max="100" value="3" required>

                <label>Edge weight mode:</label>
                <select name="mode">
                    <option value="manual">Manual</option>
                    <option value="auto">Automatic</option>
                </select>

                <button type="submit">Generate</button>
            </form>
        </div>

        <div class="graph-section">
            <h3>Adjacency Matrix</h3>
            <form method="post" action="/calculate">
                <input type="hidden" name="nodes" value="3">
                <table border="1">
                    <tr>
                        <th>Node</th>
                        <th>A</th>
                        <th>B</th>
                        <th>C</th>
                    </tr>
                    % for i, label in enumerate(['A', 'B', 'C']):
                        <tr>
                            <th>{{label}}</th>
                            % for j in range(3):
                                <td>
                                    <input name="cell_{{i}}_{{j}}" type="number" min="0" placeholder="-" value="">
                                </td>
                            % end
                        </tr>
                    % end
                </table>

                <label>From:
                    <select name="start">
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </label>

                <label>To:
                    <select name="end">
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </label>

                <button type="submit" class="run-dijkstra-btn">Find path</button>
                <button type="button" onclick="fillRandom(3)" class="generate-graph-btn">Fill randomly</button>
            </form>
        </div>

        


        <div class="dijkstra-result">
    <h3>Shortest Path Result</h3>
    <!-- Убрали блок визуализации -->

    <p class="dijkstra-result">Length: <span id="path-length">--</span></p>
</div>


        </div>
    </div>
</div>

<script src="/static/scripts/vis.min.js"></script>
<script src="/static/scripts/dijkstra_method.js"></script>
