% rebase('layout.tpl', title='Алгоритм Флойда', year=year)

<div class="jumbotron">
    <h1>Алгоритм Флойда</h1>
    <p class="lead">Алгоритм Флойда–Уоршелла позволяет найти кратчайшие пути между всеми парами вершин во взвешенном графе.</p>
</div>

<div class="row">
    <div class="col-md-6">
        <h3>Форма ввода матрицы смежности</h3>
        <form action="/floyd" method="post">
            <div class="form-group">
                <label for="size">Количество вершин:</label>
                <input type="number" class="form-control" name="size" id="size" min="2" required>
            </div>
            <div class="form-group">
                <label for="matrix">Введите матрицу смежности (через пробел, строки через новую строку):</label>
                <textarea class="form-control" name="matrix" id="matrix" rows="5" placeholder="0 3 INF&#10;3 0 1&#10;INF 1 0" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Рассчитать</button>
        </form>
    </div>

    <div class="col-md-6">
        <h3>О методе</h3>
        <p>
            Алгоритм Флойда выполняет итеративное обновление расстояний между всеми парами вершин, учитывая промежуточные вершины.
            Он работает с графами, в которых могут присутствовать положительные веса и возможны циклы (без отрицательных циклов).
        </p>
        <ul>
            <li>Сложность: O(n³), где n — количество вершин.</li>
            <li>Подходит для плотных графов и полной информации о путях.</li>
        </ul>
    </div>
</div>

% if result:
<div class="alert alert-success mt-4">
    <h4>Результат:</h4>
    <pre>{{!result}}</pre>
</div>
% end
