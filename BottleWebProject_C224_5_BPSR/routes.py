"""
Routes and views for the bottle application.
"""

from bottle import route, view
from datetime import datetime

@route('/')
@route('/home')
@view('index')
def home():
    """Renders the home page."""
    return dict(
        year=datetime.now().year
    )

@route('/contact')
@view('contact')
def contact():
    """Renders the contact page."""
    return dict(
        title='Contact',
        message='Your contact page.',
        year=datetime.now().year
    )

@route('/about')
@view('about')
def about():
    """Renders the about page."""
    return dict(
        title='About',
        message='Your application description page.',
        year=datetime.now().year
    )

@route('/floid_method')
@view('floid_method')
def contact():
    """Renders the Floid method page."""
    return dict(
        title='Floyd Warshall algorithm',
        year=datetime.now().year
    )

@route('/prim_method')
@view('prim_method')
def contact():
    """Renders the Prim method page."""
    return dict(
        title='Prim algorithm',
        year=datetime.now().year
    )

@route('/crascal_method')
@view('crascal_method')
def contact():
    """Renders the Crascal method page."""
    return dict(
        title='Crascal algorithm',
        year=datetime.now().year
    )

@route('/dijkstra_method')
@view('dijkstra_method')
def contact():
    """Renders the Dijkstra method page."""
    return dict(
        title='Dijkstra algorithm',
        year=datetime.now().year
    )