% rebase('layout.tpl', title=request.translations['prim']['title'], lang=request.lang, translations=request.translations, year=2025)
<link rel="stylesheet" href="/static/content/prim_method_styles.css">
<div class="prim-container">
    <div class="prim-header">
        <h1>{{request.translations['prim']['theory_title']}}</h1>
        <p class="lead">{{request.translations['prim']['theory_description']}}</p>
    </div>

    <!-- Кнопка для перехода к калькулятору -->
    <div style="text-align: center; margin-bottom: 20px;">
        <a href="#calculator" class="create-graph-btn">{{request.translations['prim']['calculator_skip_to']}}</a>
    </div>

    <!-- Theory -->
    <section class="theory">
        <h2>{{request.translations['prim']['theory_title']}}</h2>
        <p>{{request.translations['prim']['theory_description']}}</p>

        <h3>{{request.translations['prim']['theory_how_it_works']}}</h3>
        <p>{{request.translations['prim']['theory_result']}}</p>
        <ol>
            % for step in request.translations['prim']['theory_steps']:
            <li>{{step}}</li>
            % end
        </ol>

        <h3>{{request.translations['prim']['theory_example_title']}}</h3>
        <p>{{request.translations['prim']['theory_example_text']}}</p>
        <ul>
            % for edge in request.translations['prim']['theory_example_edges']:
            <li>{{edge}}</li>
            % end
        </ul>
        <p>{{request.translations['prim']['theory_example_start']}}</p>
        <ol>
            % for step in request.translations['prim']['theory_example_steps']:
            <li>{{step}}</li>
            % end
        </ol>
        <p>{{request.translations['prim']['theory_example_result']}}</p>

        <h3>{{request.translations['prim']['theory_visual_title']}}</h3>
        <div class="graph-example">
            <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                <!-- Vertices -->
                <circle cx="50" cy="50" r="20" fill="#4facfe" stroke="#2c3e50" stroke-width="2"/>
                <text x="50" y="55" text-anchor="middle" fill="white" font-size="16">A</text>
                <circle cx="150" cy="50" r="20" fill="#4facfe" stroke="#2c3e50" stroke-width="2"/>
                <text x="150" y="55" text-anchor="middle" fill="white" font-size="16">B</text>
                <circle cx="150" cy="150" r="20" fill="#4facfe" stroke="#2c3e50" stroke-width="2"/>
                <text x="150" y="155" text-anchor="middle" fill="white" font-size="16">C</text>
                <circle cx="250" cy="150" r="20" fill="#4facfe" stroke="#2c3e50" stroke-width="2"/>
                <text x="250" y="155" text-anchor="middle" fill="white" font-size="16">D</text>

                <!-- Edges with weights -->
                <line x1="50" y1="50" x2="150" y2="50" stroke="#2c3e50" stroke-width="2"/>
                <text x="100" y="40" text-anchor="middle" fill="#2c3e50" font-size="14">1</text>
                <line x1="50" y1="50" x2="150" y2="150" stroke="#2c3e50" stroke-width="2"/>
                <text x="90" y="110" text-anchor="middle" fill="#2c3e50" font-size="14">3</text>
                <line x1="150" y1="50" x2="150" y2="150" stroke="#2c3e50" stroke-width="2"/>
                <text x="160" y="100" text-anchor="middle" fill="#2c3e50" font-size="14">3</text>
                <line x1="150" y1="50" x2="250" y2="150" stroke="#2c3e50" stroke-width="2"/>
                <text x="200" y="90" text-anchor="middle" fill="#2c3e50" font-size="14">6</text>
                <line x1="150" y1="150" x2="250" y2="150" stroke="#2c3e50" stroke-width="2"/>
                <text x="200" y="140" text-anchor="middle" fill="#2c3e50" font-size="14">4</text>
            </svg>
        </div>
        <p>{{request.translations['prim']['theory_visual_text']}}</p>

        <h3>{{request.translations['prim']['theory_applications_title']}}</h3>
        <p>{{request.translations['prim']['theory_applications_text']}}</p>
        <ul>
            % for app in request.translations['prim']['theory_applications_list']:
            <li>{{app}}</li>
            % end
        </ul>
    </section>

    <!-- Interactive Section -->
    <div class="calculator" id="calculator">
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