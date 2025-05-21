% rebase('layout.tpl', title=request.translations['floyd']['title'], year=year, lang=request.lang, translations=request.translations)

<link rel="stylesheet" href="/static/content/methods_pages_styles.css">

<div class="floyd-header">
    <h1>{{request.translations['floyd']['header']['title']}}</h1>
    <p class="lead">{{request.translations['floyd']['header']['description']}}</p>
</div>

<div class="container">
    <div class="panel panel-default shadow-sm">
        <div class="panel-heading">
            <h3 class="panel-title">{{request.translations['floyd']['panel']['title']}}</h3>
        </div>
        <div class="panel-body text-center">
            <form id="matrixForm">
                <div class="control-panel">
                    <div class="input-group">
                        <span class="input-group-addon">{{request.translations['floyd']['panel']['vertices_label']}}</span>
                        <input type="number" class="form-control" id="matrixSize" name="matrixSize" min="2" max="10" value="4" required>
                    </div>
                    <button type="button" class="btn btn-calculate" id="generateMatrix">{{request.translations['floyd']['panel']['generate_button']}}</button>
                    <button type="submit" class="btn btn-calculate" id="calculatePaths">{{request.translations['floyd']['panel']['calculate_button']}}</button>
                </div>

                <h4>{{request.translations['floyd']['panel']['input_matrix_title']}}</h4>
                <div class="matrix-container">
                    <table class="matrix-table" id="adjacencyMatrix">
                        <!-- Матрица будет сгенерирована здесь -->
                    </table>
                </div>
            </form>
            
            <div id="errorMessage"></div>
            
            <div class="result-section" id="resultSection" style="display: none;">
                <h4>{{request.translations['floyd']['panel']['result_title']}}</h4>
                <div class="matrix-container">
                    <table class="matrix-table" id="resultMatrix">
                        <!-- Результаты будут отображены здесь -->
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="theory-section">
        <h3 class="theory-title">{{request.translations['floyd']['theory']['title']}}</h3>
        <div class="theory-block">
            <h4 class="theory-subtitle">{{request.translations['floyd']['theory']['core_principle']['title']}}</h4>
            <p>{{request.translations['floyd']['theory']['core_principle']['description']}}</p>
        </div>
        <div class="theory-block">
            <h4 class="theory-subtitle">{{request.translations['floyd']['theory']['steps']['title']}}</h4>
            <ol class="theory-steps">
                <li>
                    <span class="step-title">{{request.translations['floyd']['theory']['steps']['initialization']['title']}}</span>
                    <p>{{request.translations['floyd']['theory']['steps']['initialization']['description']}}</p>
                    <ul class="step-details">
                        % for step in request.translations['floyd']['theory']['steps']['initialization']['steps']:
                        <li>{{step}}</li>
                        % end
                    </ul>
                </li>
                <li>
                    <span class="step-title">{{request.translations['floyd']['theory']['steps']['relaxation']['title']}}</span>
                    <p>{{request.translations['floyd']['theory']['steps']['relaxation']['description']}}</p>
                    <pre class="code-block">{{request.translations['floyd']['theory']['steps']['relaxation']['code']}}</pre>
                    <p>{{request.translations['floyd']['theory']['steps']['relaxation']['text']}}</p>
                </li>
                <li>
                    <span class="step-title">{{request.translations['floyd']['theory']['steps']['termination']['title']}}</span>
                    <p>{{request.translations['floyd']['theory']['steps']['termination']['description']}}</p>
                </li>
            </ol>
        </div>
    </div>

    <div class="example-section">
        <h3 class="example-title"> {{request.translations['floyd']['example']['title']}}</h3>
        <div class="example-block">
            <h4 class="example-subtitle">{{request.translations['floyd']['example']['initial_graph']['title']}}</h4>
            <div class="graph-representation">
                <div class="adjacency-matrix">
                    <h5>{{request.translations['floyd']['example']['initial_graph']['adjacency_matrix_title']}}</h5>
                    <pre>{{request.translations['floyd']['example']['initial_graph']['adjacency_matrix']}}</pre>
                </div>
                <div class="graph-visual">
                    <h5>{{request.translations['floyd']['example']['initial_graph']['graph_visualization_title']}}</h5>
                    <img src="/static/resources/Images/floid_graph.png" class="graph-image">
                </div>
            </div>
        </div>
        <div class="example-block">
            <h4 class="example-subtitle">{{request.translations['floyd']['example']['execution']['title']}}</h4>
            <div class="iteration-container">
                % for iteration in request.translations['floyd']['example']['execution']['iterations']:
                <div class="iteration">
                    <h5>{{iteration['title']}}</h5>
                    <pre>{{iteration['content']}}</pre>
                </div>
                % end
            </div>
        </div>
        <div class="example-block">
            <h4 class="example-subtitle">{{request.translations['floyd']['example']['path_reconstruction']['title']}}</h4>
            <p>{{request.translations['floyd']['example']['path_reconstruction']['description']}}</p>
            <ol class="path-steps">
                % for step in request.translations['floyd']['example']['path_reconstruction']['steps']:
                <li>{{step}}</li>
                % end
            </ol>
        </div>
    </div>
</div>

<script src="/static/scripts/floid_method_logic.js"></script>