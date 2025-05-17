% rebase('layout.tpl', title='Algorithms and Graphs', year=year)

 <link rel="stylesheet" href="/static/content/site.css"> 

<div class="jumbotron">
    <h1>Algorithms and Methods</h1>
    <p class="lead">Need help solving graph problems with visual clarity? Choose the algorithm you need and calculate with ease!</p>
</div>

<div class="container">
    <div class="algorithms-wrapper">
        <div class="section-heading">
            <h1>Algorithms and Methods</h1>
            <p class="lead">Need help solving graph problems with visual clarity? Choose the algorithm you need and calculate with ease!</p>
        </div>

        <div class="row">
            <div class="col-md-6">
                <a href="/crascal_method" class="square-btn shadow-sm mb-4">
                    <h4>Kruskal's Algorithm</h4>
                    <p>A greedy algorithm for finding the Minimum Spanning Tree (MST) in a graph by adding the smallest edge that doesn't form a cycle.</p>
                </a>
            </div>
            <div class="col-md-6">
                <a href="/prim_method" class="square-btn shadow-sm mb-4">
                    <h4>Prim's Algorithm</h4>
                    <p>Another greedy approach to find the MST by growing the tree one vertex at a time from an initial node.</p>
                </a>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <a href="/dijkstra_method" class="square-btn shadow-sm mb-4">
                    <h4>Dijkstra's Algorithm</h4>
                    <p>A shortest-path algorithm that finds the minimum distance from a source node to all other nodes in a graph with non-negative weights.</p>
                </a>
            </div>
            <div class="col-md-6">
                <a href="/floid_method" class="square-btn shadow-sm mb-4">
                    <h4>Floyd's Algorithm</h4>
                    <p>A dynamic programming algorithm that computes the shortest paths between all pairs of vertices in a weighted graph.</p>
                </a>
            </div>
    <div class="panel panel-default mt-4">
        <div class="panel-heading">
            <h4 class="panel-title">
                <a class="btn btn-link" href="/FAQ">Frequently Asked Questions</a>
            </h4>
        </div>
    </div>
        <div class="about-authors-panel">
            <div class="panel panel-default">
                <a class="panel-heading clickable-area" data-toggle="collapse" href="#about" role="button" aria-expanded="false" aria-controls="about">
                    <h4 class="panel-title">About the Authors</h4>
                </a>
                <div id="about" class="panel-collapse collapse">
                    <div class="panel-body about-text">
                        Learn more about the developers behind this project and their goals in creating accessible graph algorithm tools.
                            <a class="btn btn-default" href="/about">See more</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>