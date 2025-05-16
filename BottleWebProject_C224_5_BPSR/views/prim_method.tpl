<!-- Подключение базового шаблона layout.tpl и передача параметров -->
% rebase('layout.tpl', title=request.translations['prim']['title'], lang=request.lang, translations=request.translations, year=2025)
    <!-- rebase подключает базовый шаблон layout.tpl -->
    <!-- title: Заголовок страницы из словаря переводов -->
    <!-- lang: Язык страницы (например, 'en' или 'ru') -->
    <!-- translations: Полный словарь переводов -->
    <!-- year: Год для отображения (например, в футере) -->

<!-- Подключение CSS стилей -->
<link rel="stylesheet" href="/static/content/methods_pages_styles.css">
    <!-- Подключение общих стилей для страниц с методами -->
<link rel="stylesheet" href="/static/content/prim_method_styles.css">
    <!-- Подключение специфичных стилей для страницы алгоритма Прима -->

<!-- Основной контейнер страницы -->
<div class="method-container">
    <!-- Контейнер для всей страницы, задаёт общую структуру -->

    <!-- Заголовок страницы -->
    <div class="floyd-header">
        <h1>{{request.translations['prim']['theory_title']}}</h1>
            <!-- Заголовок первого уровня: Название теории (например, "Prim's Algorithm") -->
        <p class="lead">{{request.translations['prim']['theory_description']}}</p>
            <!-- Ведущий текст: Краткое описание алгоритма Прима -->
    </div>

    <!-- Кнопка для перехода к калькулятору -->
    <div style="text-align: center; margin-bottom: 20px;">
        <!-- Контейнер для кнопки с центрированием и отступом снизу -->
        <a href="#calculator" class="btn-calculate">{{request.translations['prim']['calculator_skip_to']}}</a>
            <!-- Ссылка на секцию калькулятора (#calculator), текст кнопки из переводов -->
    </div>

    <!-- Секция теории -->
    <section class="theory-section">
        <!-- Секция с теоретической информацией об алгоритме -->
        <h2 class="theory-title">{{request.translations['prim']['theory_title']}}</h2>
            <!-- Заголовок второго уровня: Название теории (повторяется) -->
        <p>{{request.translations['prim']['theory_description']}}</p>
            <!-- Описание алгоритма (повторяется) -->

        <!-- Подраздел "Как это работает" -->
        <h3 class="theory-subtitle">{{request.translations['prim']['theory_how_it_works']}}</h3>
            <!-- Подзаголовок: "How It Works" или "Как это работает" -->
        <p>{{request.translations['prim']['theory_result']}}</p>
            <!-- Текст: Результат работы алгоритма -->
        <ol class="theory-steps">
            <!-- Упорядоченный список шагов алгоритма -->
            % for step in request.translations['prim']['theory_steps']:
                <!-- Цикл по списку шагов из переводов -->
            <li>{{step}}</li>
                <!-- Элемент списка: Один шаг алгоритма -->
            % end
        </ol>

        <!-- Подраздел "Пример" -->
        <h3 class="theory-subtitle">{{request.translations['prim']['theory_example_title']}}</h3>
            <!-- Подзаголовок: "Example of Prim's Algorithm" или "Пример алгоритма Прима" -->
        <p>{{request.translations['prim']['theory_example_text']}}</p>
            <!-- Текст: Введение в пример -->
        <ul>
            <!-- Ненумерованный список рёбер графа -->
            % for edge in request.translations['prim']['theory_example_edges']:
                <!-- Цикл по списку рёбер из переводов -->
            <li>{{edge}}</li>
                <!-- Элемент списка: Описание ребра (например, "A-B with weight 1") -->
            % end
        </ul>
        <p>{{request.translations['prim']['theory_example_start']}}</p>
            <!-- Текст: Начало выполнения примера -->
        <ol class="theory-steps">
            <!-- Упорядоченный список шагов выполнения примера -->
            % for step in request.translations['prim']['theory_example_steps']:
                <!-- Цикл по списку шагов примера -->
            <li>{{step}}</li>
                <!-- Элемент списка: Один шаг выполнения -->
            % end
        </ol>
        <p>{{request.translations['prim']['theory_example_result']}}</p>
            <!-- Текст: Результат выполнения примера -->

        <!-- Подраздел "Визуальное представление" -->
        <h3 class="theory-subtitle">{{request.translations['prim']['theory_visual_title']}}</h3>
            <!-- Подзаголовок: "Visual Representation" или "Визуальное представление" -->
        <div class="example-section">
            <!-- Контейнер для визуального примера -->
            <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                <!-- SVG-график размером 300x200 пикселей -->
                <!-- Vertices -->
                <circle cx="50" cy="50" r="20" fill="#4facfe" stroke="#2c3e50" stroke-width="2"/>
                    <!-- Круг (вершина A): центр (50,50), радиус 20px, голубая заливка, тёмная обводка -->
                <text x="50" y="55" text-anchor="middle" fill="white" font-size="16">A</text>
                    <!-- Текст: Метка "A" в центре круга, белый цвет, размер шрифта 16px -->
                <circle cx="150" cy="50" r="20" fill="#4facfe" stroke="#2c3e50" stroke-width="2"/>
                    <!-- Круг (вершина B): центр (150,50) -->
                <text x="150" y="55" text-anchor="middle" fill="white" font-size="16">B</text>
                    <!-- Метка "B" -->
                <circle cx="150" cy="150" r="20" fill="#4facfe" stroke="#2c3e50" stroke-width="2"/>
                    <!-- Круг (вершина C): центр (150,150) -->
                <text x="150" y="155" text-anchor="middle" fill="white" font-size="16">C</text>
                    <!-- Метка "C" -->
                <circle cx="250" cy="150" r="20" fill="#4facfe" stroke="#2c3e50" stroke-width="2"/>
                    <!-- Круг (вершина D): центр (250,150) -->
                <text x="250" y="155" text-anchor="middle" fill="white" font-size="16">D</text>
                    <!-- Метка "D" -->

                <!-- Edges with weights -->
                <line x1="50" y1="50" x2="150" y2="50" stroke="#2c3e50" stroke-width="2"/>
                    <!-- Линия (ребро A-B): от (50,50) до (150,50), тёмная обводка -->
                <text x="100" y="40" text-anchor="middle" fill="#2c3e50" font-size="14">1</text>
                    <!-- Вес ребра A-B: "1", позиция (100,40) -->
                <line x1="50" y1="50" x2="150" y2="150" stroke="#2c3e50" stroke-width="2"/>
                    <!-- Ребро A-C: от (50,50) до (150,150) -->
                <text x="90" y="110" text-anchor="middle" fill="#2c3e50" font-size="14">3</text>
                    <!-- Вес ребра A-C: "3" -->
                <line x1="150" y1="50" x2="150" y2="150" stroke="#2c3e50" stroke-width="2"/>
                    <!-- Ребро B-C: от (150,50) до (150,150) -->
                <text x="160" y="100" text-anchor="middle" fill="#2c3e50" font-size="14">3</text>
                    <!-- Вес ребра B-C: "3" -->
                <line x1="150" y1="50" x2="250" y2="150" stroke="#2c3e50" stroke-width="2"/>
                    <!-- Ребро B-D: от (150,50) до (250,150) -->
                <text x="200" y="90" text-anchor="middle" fill="#2c3e50" font-size="14">6</text>
                    <!-- Вес ребра B-D: "6" -->
                <line x1="150" y1="150" x2="250" y2="150" stroke="#2c3e50" stroke-width="2"/>
                    <!-- Ребро C-D: от (150,150) до (250,150) -->
                <text x="200" y="140" text-anchor="middle" fill="#2c3e50" font-size="14">4</text>
                    <!-- Вес ребра C-D: "4" -->
            </svg>
        </div>
        <p>{{request.translations['prim']['theory_visual_text']}}</p>
            <!-- Текст: Описание визуального графа -->

        <!-- Подраздел "Применения" -->
        <h3 class="theory-subtitle">{{request.translations['prim']['theory_applications_title']}}</h3>
            <!-- Подзаголовок: "Applications of Prim's Algorithm" или "Применения алгоритма Прима" -->
        <p>{{request.translations['prim']['theory_applications_text']}}</p>
            <!-- Текст: Общее описание применений -->
        <ul>
            <!-- Ненумерованный список применений -->
            % for app in request.translations['prim']['theory_applications_list']:
                <!-- Цикл по списку применений -->
            <li>{{app}}</li>
                <!-- Элемент списка: Одно применение -->
            % end
        </ul>
    </section>

    <!-- Интерактивная секция (калькулятор) -->
    <div class="calculator" id="calculator">
        <!-- Контейнер калькулятора с id для навигации по ссылке -->
        <div class="input-section">
            <!-- Секция ввода данных -->
            <h3>{{request.translations['prim']['calculator_input_title']}}</h3>
                <!-- Заголовок: "Input Data" или "Входные данные" -->
            <form id="vertex-form">
                <!-- Форма для ввода количества вершин и режима -->
                <label>{{request.translations['prim']['calculator_input_vertices']}}</label>
                    <!-- Метка: "Number of Vertices (1-12)" или "Количество вершин (1-12)" -->
                <input type="number" id="vertex-count" min="1" max="12" required>
                    <!-- Поле ввода числа вершин: от 1 до 12, обязательное -->
                <label>{{request.translations['prim']['calculator_input_mode']}}</label>
                    <!-- Метка: "Edge Weight Mode" или "Режим весов рёбер" -->
                <select id="weight-mode">
                    <!-- Выпадающий список для выбора режима -->
                    <option value="manual">{{request.translations['prim']['calculator_input_mode_manual']}}</option>
                        <!-- Опция: "Manual" или "Ручной" -->
                    <option value="auto">{{request.translations['prim']['calculator_input_mode_auto']}}</option>
                        <!-- Опция: "Automatic" или "Автоматический" -->
                </select>
                <button type="submit" class="create-graph-btn">{{request.translations['prim']['calculator_input_create']}}</button>
                    <!-- Кнопка: "Create Graph" или "Создать граф" -->
            </form>
            <div id="edge-input">
                <!-- Контейнер для ввода весов рёбер (скрыт по умолчанию) -->
                <h4>{{request.translations['prim']['calculator_input_weights_title']}}</h4>
                    <!-- Заголовок: "Enter Edge Weights" или "Введите вес рёбер" -->
                <form id="edge-form">
                    <!-- Форма для ввода весов -->
                    <div class="edge-weight-list"></div>
                        <!-- Пустой контейнер для динамического добавления полей ввода весов -->
                    <button type="submit" class="confirm-btn">{{request.translations['prim']['calculator_input_confirm']}}</button>
                        <!-- Кнопка: "Confirm" или "Подтвердить" -->
                </form>
            </div>
        </div>
        <div class="graph-section">
            <!-- Секция для отображения графа -->
            <h3>{{request.translations['prim']['calculator_graph_title']}}</h3>
                <!-- Заголовок: "Graph" или "Граф" -->
            <div id="graph" style="height: 400px; width: 100%; border: 1px solid #ccc;"></div>
                <!-- Контейнер для визуализации графа: высота 400px, ширина 100%, серая рамка -->
            <p>{{request.translations['prim']['calculator_graph_instruction']}}</p>
                <!-- Инструкция: "Click a vertex to select the starting point" или "Нажмите на вершину..." -->
        </div>
        <div class="mst-section">
            <!-- Секция для отображения минимального остовного дерева (MST) -->
            <h3>{{request.translations['prim']['calculator_mst_title']}}</h3>
                <!-- Заголовок: "Minimum Spanning Tree" или "Минимальное остовное дерево" -->
            <div id="mst" style="height: 400px; width: 100%; border: 1px solid #ccc;"></div>
                <!-- Контейнер для визуализации MST: высота 400px, ширина 100%, серая рамка -->
            <p id="mst-weight" class="mst-weight">{{request.translations['prim']['calculator_mst_weight']}}</p>
                <!-- Текст: "Total Weight:" или "Общая масса:", обновляется динамически -->
        </div>
    </div>
</div>

<!-- Подключение скриптов -->
<script src="/static/scripts/vis.min.js"></script>
    <!-- Подключение библиотеки vis.js для визуализации графа -->
<script src="/static/scripts/prim_method.js"></script>
    <!-- Подключение JavaScript-кода для интерактивности калькулятора -->