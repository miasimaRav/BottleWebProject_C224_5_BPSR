% rebase('layout.tpl', title=request.translations['prim']['title'], year=2025)
<link rel="stylesheet" href="/static/content/prim_method_styles.css">
<div class="prim-container">
    <!-- Theory -->
    <section class="theory">
        <h2>{{request.translations['prim']['theory_title']}}</h2>
        <p>Prim's algorithm is a <strong>greedy algorithm</strong> used to find the Minimum Spanning Tree (MST) in a connected weighted undirected graph. The MST is a subset of edges that connects all vertices with the minimum total edge weight, without forming any cycles.</p>

        <h3>{{request.translations['prim']['theory_how_it_works']}}</h3>
        <p>{{request.translations['prim']['theory_result']}}</p>
        <ol>
            % for step in request.translations['prim']['theory_steps']:
            <li>{{step}}</li>
            % end
        </ol>
    </section>

    <!-- Interactive Section -->
    <div class="calculator">
        <div class="input-section">
            <h3>{{request.translations['prim']['calculator_input_title']}}</h3>
            <form id="vertex-form">
                <label>{{request.translations['prim']['calculator_input_vertices']}}</label>
                <input type="number" id="vertex-count" min="1" max="12" required>
                <label>{{request.translations['prim']['calculator_input_mode']}}</label>
                <select id="weight-mode">
                    <option value="manual">{{request.translations['prim']['calculator_input_mode_manual']}}</option>
                    <option value="auto">{{request.translations['prim']['calculator_input_mode_auto']}}</option>
                </select>
                <button type="submit" class="create-graph-btn">{{request.translations['prim']['calculator_input_create']}}</button>
            </form>
            <div id="edge-input">
                <h4>{{request.translations['prim']['calculator_input_weights_title']}}</h4>
                <form id="edge-form">
                    <div class="edge-weight-list"></div>
                    <button type="submit" class="confirm-btn">{{request.translations['prim']['calculator_input_confirm']}}</button>
                </form>
            </div>
        </div>
        <div class="graph-section">
            <h3>{{request.translations['prim']['calculator_graph_title']}}</h3>
            <div id="graph" style="height: 400px; width: 100%; border: 1px solid #ccc;"></div>
            <p>{{request.translations['prim']['calculator_graph_instruction']}}</p>
        </div>
        <div class="mst-section">
            <h3>{{request.translations['prim']['calculator_mst_title']}}</h3>
            <div id="mst" style="height: 400px; width: 100%; border: 1px solid #ccc;"></div>
            <p id="mst-weight" class="mst-weight">{{request.translations['prim']['calculator_mst_weight']}}</p>
        </div>
    </div>
</div>
<script src="/static/scripts/vis.min.js"></script>
<script src="/static/scripts/prim_method.js"></script>