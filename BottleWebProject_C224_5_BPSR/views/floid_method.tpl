% rebase('layout.tpl', title='Floyd Algorithm', year=year)

<div class="jumbotron">
    <h1>Floyd-Warshall Algorithm</h1>
    <p class="lead">The Floyd-Warshall algorithm finds shortest paths between all pairs of vertices in a weighted graph.</p>
</div>

<div class="row">
    <div class="col-md-6">
        <h3>Adjacency Matrix Input Form</h3>
        <form action="/floyd" method="post">
            <div class="form-group">
                <label for="size">Number of vertices:</label>
                <input type="number" class="form-control" name="size" id="size" min="2" required>
            </div>
            <div class="form-group">
                <label for="matrix">Enter adjacency matrix (space-separated values, rows on new lines):</label>
                <textarea class="form-control" name="matrix" id="matrix" rows="5" placeholder="0 3 INF&#10;3 0 1&#10;INF 1 0" required></textarea>
                <small class="form-text text-muted">Use INF to represent infinity (no path)</small>
            </div>
            <button type="submit" class="btn btn-primary">Calculate</button>
        </form>
    </div>

    <div class="col-md-6">
        <h3>About the Algorithm</h3>
        <p>
            The Floyd-Warshall algorithm iteratively updates distances between all pairs of vertices, considering intermediate vertices.
            It works with graphs that may contain positive weights and cycles (but no negative cycles).
        </p>
        <ul>
            <li>Time complexity: O(n?), where n is the number of vertices.</li>
            <li>Suitable for dense graphs and complete path information.</li>
            <li>Can handle negative weights (but no negative cycles).</li>
            <li>Can detect the presence of negative cycles in the graph.</li>
        </ul>
    </div>
</div>