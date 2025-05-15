<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }} - Algorithm</title>
    <link rel="stylesheet" href="/static/content/bootstrap.min.css" />
    <link rel="stylesheet" href="/static/content/menu_view.css"> 
    <link rel="stylesheet" href="/static/content/drop.css"> 
</head>

<body>
<nav class="navbar navbar-custom navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <a class="navbar-brand" href="/home">
                <img src="/static/images/graph_logo.png" style="height: 40px;">
            </a>
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#mainNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <div class="collapse navbar-collapse" id="mainNavbar">
            <ul class="nav navbar-nav">
                <li><a href="/about">About</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        Algorithms <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="/crascal_method">Kruskal's Algorithm</a></li>
                        <li><a href="/prim_method">Prim's Algorithm</a></li>
                        <li><a href="/dijkstra_method">Dijkstra's Algorithm</a></li>
                        <li><a href="/floid_method">Floyd's Algorithm</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>


    <div class="container body-content">
        {{!base}}
        <footer>
            <p>&copy; {{ year }} - Algorithms</p>
        </footer>
    </div>
</body>
</html>
