% rebase('layout.tpl', title='Dijkstra Algorithm', year=year)

<link rel="stylesheet" href="/static/content/methods_pages_styles.css">
<script src="/static/scripts/dijkstra_method_logic.js"></script>

<div class="floyd-header">
    <h1>Dijkstra's Algorithm</h1>
    <p class="lead">Find the shortest path from a single source to a specific target vertex in a weighted graph</p>
</div>

<div class="container">
    <div class="panel panel-default shadow-sm">
        <div class="panel-heading">
            <h3 class="panel-title">Matrix Configuration</h3>
        </div>
        <div class="panel-body text-center">
           <div class="control-panel">
    <div class="input-group">
        <span class="input-group-addon">Vertices:</span>
        <input type="number" class="form-control" id="matrixSize" min="2" max="13" value="2">
    </div>
    <div class="input-group">
        <span class="input-group-addon">Start Vertex:</span>
        <select class="form-control" id="startNode"></select>
    </div>
    <div class="input-group">
        <span class="input-group-addon">End Vertex:</span>
        <select class="form-control" id="endNode"></select>
    </div>
    <button class="btn btn-calculate" id="generateMatrix">Generate Random</button>
    <button class="btn btn-calculate" id="calculateDijkstra">Find Shortest Path</button>

    <!-- Блок для сообщений об ошибках/успехе -->
    <div id="messageBox" style="margin-top:10px; min-height:20px; font-weight: 600;"></div>
</div>


            <h4>Adjacency Matrix</h4>
            <div class="matrix-container">
                <table class="matrix-table" id="adjacencyMatrix">
                    <!-- Matrix will be generated dynamically -->
                </table>
            </div>

            <div class="result-section" id="resultSection" style="display: none;">
                <h4>Shortest Path Result</h4>
                <div class="matrix-container">
                    <p id="resultPath" class="result-path"></p>
                    <p id="resultLength" class="result-length"></p>
                </div>
            </div>
        </div>
    </div>

    <!-- Theory Section -->
    <div class="theory-section">
        <h3 class="theory-title">Algorithm Theory</h3>

        <div class="theory-block">
            <h4 class="theory-subtitle">Concept</h4>
            <p>Dijkstra's algorithm finds the shortest path from a starting node to all other nodes in a weighted graph with non-negative edge weights. It maintains a set of visited nodes and updates shortest distances using a priority queue or greedy approach.</p>
        </div>

        <div class="theory-block">
            <h4 class="theory-subtitle">Steps</h4>
            <ol class="theory-steps">
                <li>
                    <span class="step-title">Initialization</span>
                    <ul class="step-details">
                        <li>Set distance to source = 0</li>
                        <li>Set distances to all other vertices = ∞</li>
                        <li>Mark all vertices as unvisited</li>
                    </ul>
                </li>
                <li>
                    <span class="step-title">Relaxation</span>
                    <p>Repeat:</p>
                    <ul class="step-details">
                        <li>Choose unvisited vertex with smallest distance</li>
                        <li>Update distances to its neighbors if a shorter path is found</li>
                        <li>Mark current vertex as visited</li>
                    </ul>
                </li>
                <li>
                    <span class="step-title">Termination</span>
                    <p>When all vertices are visited, algorithm ends. Distances represent the shortest paths from source to all other nodes.</p>
                </li>
            </ol>
        </div>
    </div>

   <!-- Example Section -->
<div class="example-section">
    <h3 class="example-title"><i class="glyphicon glyphicon-blackboard"></i> Example</h3>

    <div class="example-block">
        <h4 class="example-subtitle">Initial Graph</h4>
        <div class="graph-representation">
            <div class="adjacency-matrix">
                <h5>Adjacency Matrix</h5>
                <pre>
    A   B   C   D   E
A [ 0,  50, INF, INF, 90]
B [INF,  0,  90, INF, INF]
C [INF, INF,  0,  80,  60]
D [INF, INF, INF,  0,  70]
E [INF, INF, INF, INF,  0]
                </pre>
            </div>
            <div class="graph-visual">
                <h5>Graph Visualization</h5>
                <img src="/static/resources/Images/DijkstraTheory.jpg" class="graph-image">
                <!-- Замени путь на актуальный, если нужно -->
            </div>
        </div>
    </div>

    <div class="example-block">
        <h4 class="example-subtitle">Step-by-Step Execution from A (source)</h4>
        <div class="iteration">
            <h5>Iteration 1 (Start at A)</h5>
            <pre>
Visited: A
Distances: A=0, B=50, C=∞, D=∞, E=90
            </pre>
        </div>

        <div class="iteration">
            <h5>Iteration 2 (Choose B)</h5>
            <pre>
Visited: A, B
Distances: A=0, B=50, C=140 (via B), D=∞, E=90
            </pre>
        </div>

        <div class="iteration">
            <h5>Iteration 3 (Choose E)</h5>
            <pre>
Visited: A, B, E
Distances: A=0, B=50, C=140, D=160 (via E), E=90
            </pre>
        </div>

        <div class="iteration">
            <h5>Iteration 4 (Choose C)</h5>
            <pre>
Visited: A, B, E, C
Distances: A=0, B=50, C=140, D=160, E=90
            </pre>
        </div>

        <div class="iteration">
            <h5>Iteration 5 (Choose D)</h5>
            <pre>
Visited: A, B, E, C, D
Distances: A=0, B=50, C=140, D=160, E=90
            </pre>
        </div>
    </div>

    <div class="example-block">
        <h4 class="example-subtitle">Final Shortest Distances from A</h4>
        <pre>

 A → B → C → D (50 + 90 + 80 = 220)</li>
 A → E → D (90 + 70 = 160)</li>
 A → B → C → E → D (50 + 90 + 60 + 70 = 270)</li>
        
        <p><strong>Shortest Path from A to D:</strong> A → E → D with total weight = 160</p>
        </pre>
    </div>
</div>




