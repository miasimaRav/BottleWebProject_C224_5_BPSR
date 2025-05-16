% rebase('layout.tpl', title='Floyd Algorithm', year=year)

<link rel="stylesheet" href="/static/content/floid_method_style.css">
<script src="/static/scripts/floid_method_logic.js"></script>

<div class="jumbotron floyd-header">
    <h1>Floyd-Warshall Algorithm</h1>
    <p class="lead">Find shortest paths between all pairs of vertices in a weighted graph</p>
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
                    <input type="number" class="form-control" id="matrixSize" min="2" max="10" value="2">
                </div>
                <button class="btn btn-calculate" id="generateMatrix">Generate Random</button>
                <button class="btn btn-calculate" id="calculatePaths">Calculate Paths</button>
            </div>
            
            <h4>Input Matrix</h4>
            <div class="matrix-container">
                <table class="matrix-table" id="adjacencyMatrix">
                    <!-- Matrix will be generated here -->
                </table>
            </div>
            
            <div class="result-section" id="resultSection">
                <h4>Result Matrix (Shortest Paths)</h4>
                <div class="matrix-container">
                    <table class="matrix-table" id="resultMatrix">
                        <!-- Results will appear here -->
                    </table>
                </div>
            </div>
        </div>
    </div>
    
    <div class="theory-section">
    <h3 class="theory-title">Algorithm Theory</h3>
    
    <div class="theory-block">
        <h4 class="theory-subtitle">Core Principle</h4>
        <p>The Floyd-Warshall algorithm solves the all-pairs shortest path problem through dynamic programming. It builds a solution by gradually improving shortest path estimates between all vertex pairs.</p>
    </div>
    
    <div class="theory-block">
        <h4 class="theory-subtitle">Algorithm Steps</h4>
        <ol class="theory-steps">
            <li>
                <span class="step-title">Initialization Phase</span>
                <p>Create distance matrix D where:</p>
                <ul class="step-details">
                    <li>D[i][j] = weight of edge from i to j (if exists)</li>
                    <li>D[i][j] = INF if no direct connection</li>
                    <li>D[i][i] = 0 for all vertices</li>
                </ul>
            </li>
            <li>
                <span class="step-title">Relaxation Phase</span>
                <p>For each intermediate vertex k (from 1 to n):</p>
                <pre class="code-block">D[i][j] = min(D[i][j], D[i][k] + D[k][j])</pre>
                <p>This checks if path through k is shorter than current estimate.</p>
            </li>
            <li>
                <span class="step-title">Result Interpretation</span>
                <p>Final matrix contains shortest paths between all pairs. Negative values on diagonal indicate negative cycles.</p>
            </li>
        </ol>
    </div>
</div>

<div class="example-section">
    <h3 class="example-title"><i class="glyphicon glyphicon-blackboard"></i> Detailed Example</h3>
    
    <div class="example-block">
        <h4 class="example-subtitle">Initial Graph</h4>
        <div class="graph-representation">
            <div class="adjacency-matrix">
                <h5>Adjacency Matrix</h5>
                <pre>   A  B   C  D
A [0, 3, INF, 7]
B [8, 0, 2, INF]
C [5, INF, 0, 1]
D [2, INF, INF, 0]</pre>
            </div>
            <div class="graph-visual">
                <h5>Graph Visualization</h5>
                <img src="/static/resources/Images/floid_graph.png" class="graph-image">
            </div>
        </div>
    </div>
    
    <div class="example-block">
        <h4 class="example-subtitle">Iteration Process</h4>
        
        <div class="iteration">
            <h5>After k=A (Intermediate vertex A)</h5>
            <pre>   A  B   C  D
A [0, 3, INF, 7]
B [8, 0, 2, 15]  <-  B-D updated through A (8+7)
C [5, 8, 0, 1]   <-  C-B updated through A (5+3)
D [2, 5, INF, 0]   <-  D-B updated through A (2+3)</pre>
        </div>
        
        <div class="iteration">
            <h5>Final Result (k=D)</h5>
            <pre>   A  B  C  D
A [0, 3, 5,6]  <-  A-D through C (5+1)
B [5, 0, 2,3]  <-  B-A through D (8+2)
C [3, 6, 0,1]  <-  C-A through D (5+2)
D [2, 5, 7,0]  <-  D-C through B (INF -> 5+2)</pre>
        </div>
    </div>
    
    <div class="example-block">
        <h4 class="example-subtitle">Path Reconstruction</h4>
        <p>To find path from B to D (cost=3):</p>
        <ol class="path-steps">
            <li>Check intermediate vertices in reverse order</li>
            <li>B  ->  A  ->  D (cost 8+7=15)  ->  not optimal</li>
            <li>B  ->  C  ->  D (cost 2+1=3) <- optimal path</li>
        </ol>
    </div>
</div>
