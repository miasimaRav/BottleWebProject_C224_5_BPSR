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
            <a class="navbar-brand" href="/home?lang={{request.lang}}">
                <img src="/static/resources/images/graph_logo.png" style="height: 40px;">
            </a>
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#mainNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <div class="collapse navbar-collapse" id="mainNavbar">
            <ul class="nav navbar-nav">
                <li><a href="/about?lang={{request.lang}}">{{request.translations['layout']['about']}}</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        {{request.translations['layout']['algorithms']}} <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="/crascal_method?lang={{request.lang}}">{{request.translations['layout']['kruskal']}}</a></li>
                        <li><a href="/prim_method?lang={{request.lang}}">{{request.translations['layout']['prim']}}</a></li>
                        <li><a href="/dijkstra_method?lang={{request.lang}}">{{request.translations['layout']['dijkstra']}}</a></li>
                        <li><a href="/floid_method?lang={{request.lang}}">{{request.translations['layout']['floyd']}}</a></li>
                    </ul>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        {{request.lang.upper()}} <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="?lang=en">English</a></li>
                        <li><a href="?lang=ru">Русский</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>

    <div class="container body-content">
        {{!base}}
        <footer>
            <p>{{request.translations['layout']['footer'].replace('{{ year }}', str(year))}}</p>        </footer>
    </div>

    <script src="/static/content/jquery.min.js"></script>
    <script src="/static/content/bootstrap.min.js"></script>
</body>
</html>