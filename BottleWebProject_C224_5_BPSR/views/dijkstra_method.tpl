% rebase('layout.tpl', title=request.translations['dijkstra']['title'], year=year, lang=request.lang, translations=request.translations)

<link rel="stylesheet" href="/static/content/methods_pages_styles.css">
<script src="/static/scripts/dijkstra_client.js"></script>

<div class="floyd-header">
    <h1>{{request.translations['dijkstra']['header']['title']}}</h1>
    <p class="lead">{{request.translations['dijkstra']['header']['description']}}</p>
</div>

<div class="container">
    <div class="panel panel-default shadow-sm">
        <div class="panel-heading">
            <h3 class="panel-title">{{request.translations['dijkstra']['panel']['title']}}</h3>
        </div>
        <div class="panel-body text-center">
            <form id="matrixForm">
                <div class="control-panel">
                    <div class="input-group">
                        <span class="input-group-addon">Vertices:</span>
                        <input type="number" class="form-control" id="matrixSize" name="matrixSize" min="2" max="13" value="2" required>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">Start Vertex:</span>
                        <select class="form-control" id="startNode" name="startNode"></select>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">End Vertex:</span>
                        <select class="form-control" id="endNode" name="endNode"></select>
                    </div>
                    <button type="button" class="btn btn-calculate" id="generateMatrix">Generate Random</button>
                    <button type="submit" class="btn btn-calculate" id="calculateDijkstra">Find Shortest Path</button>
                </div>
            </form>

            <!-- Блок для сообщений об ошибках/успехе -->
            <div id="messageBox" style="margin-top:10px; min-height:20px; font-weight: 600;"></div>

            <h4>{{request.translations['dijkstra']['panel']['adjacency_matrix_title']}}</h4>
            <div class="matrix-container">
                <table class="matrix-table" id="adjacencyMatrix">
                    <!-- Matrix will be generated dynamically -->
                </table>
            </div>

            <div class="result-section" id="resultSection" style="display: none;">
                <h4>{{request.translations['dijkstra']['panel']['result_title']}}</h4>
                <div class="matrix-container">
                    <p id="resultPath" class="result-path"></p>
                    <p id="resultLength" class="result-length"></p>
                </div>
            </div>
        </div>
    </div>

    <!-- Theory Section -->
    <div class="theory-section">
        <h3 class="theory-title">{{request.translations['dijkstra']['theory']['title']}}</h3>

        <div class="theory-block">
            <h4 class="theory-subtitle">{{request.translations['dijkstra']['theory']['concept']['title']}}</h4>
            <p>{{request.translations['dijkstra']['theory']['concept']['description']}}</p>
        </div>

        <div class="theory-block">
            <h4 class="theory-subtitle">{{request.translations['dijkstra']['theory']['steps']['title']}}</h4>
            <ol class="theory-steps">
                <li>
                    <span class="step-title">{{request.translations['dijkstra']['theory']['steps']['initialization']['title']}}</span>
                    <ul class="step-details">
                        % for step in request.translations['dijkstra']['theory']['steps']['initialization']['steps']:
                        <li>{{step}}</li>
                        % end
                    </ul>
                </li>
                <li>
                    <span class="step-title">{{request.translations['dijkstra']['theory']['steps']['relaxation']['title']}}</span>
                    <p>{{request.translations['dijkstra']['theory']['steps']['relaxation']['description']}}</p>
                    <ul class="step-details">
                        % for step in request.translations['dijkstra']['theory']['steps']['relaxation']['steps']:
                        <li>{{step}}</li>
                        % end
                    </ul>
                </li>
                <li>
                    <span class="step-title">{{request.translations['dijkstra']['theory']['steps']['termination']['title']}}</span>
                    <p>{{request.translations['dijkstra']['theory']['steps']['termination']['description']}}</p>
                </li>
            </ol>
        </div>
    </div>

    <!-- Example Section -->
    <div class="example-section">
        <h3 class="example-title"><i class="glyphicon glyphicon-blackboard"></i> {{request.translations['dijkstra']['example']['title']}}</h3>

        <div class="example-block">
            <h4 class="example-subtitle">{{request.translations['dijkstra']['example']['initial_graph']['title']}}</h4>
            <div class="graph-representation">
                <div class="adjacency-matrix">
                    <h5>{{request.translations['dijkstra']['example']['initial_graph']['adjacency_matrix_title']}}</h5>
                    <pre>{{request.translations['dijkstra']['example']['initial_graph']['adjacency_matrix']}}</pre>
                </div>
                <div class="graph-visual">
                    <h5>{{request.translations['dijkstra']['example']['initial_graph']['graph_visualization_title']}}</h5>
                    <img src="/static/resources/Images/DijkstraTheory.jpg" class="graph-image">
                </div>
            </div>
        </div>

        <div class="example-block">
            <h4 class="example-subtitle">{{request.translations['dijkstra']['example']['execution']['title']}}</h4>
            % for iteration in request.translations['dijkstra']['example']['execution']['iterations']:
            <div class="iteration">
                <h5>{{iteration['title']}}</h5>
                <pre>{{iteration['content']}}</pre>
            </div>
            % end
        </div>

        <div class="example-block">
            <h4 class="example-subtitle">{{request.translations['dijkstra']['example']['final_result']['title']}}</h4>
            <pre>{{request.translations['dijkstra']['example']['final_result']['content']}}</pre>
        </div>

        <div class="example-block">
            <h4 class="example-subtitle">Final Shortest Distances from A</h4>
            <pre>
A → B → C → D (50 + 90 + 80 = 220)
A → E → D (90 + 70 = 160)
A → B → C → E → D (50 + 90 + 60 + 70 = 270)
<p><strong>Shortest Path from A to D:</strong> A → E → D with total weight = 160</p>
            </pre>
        </div>
    </div>
</div>