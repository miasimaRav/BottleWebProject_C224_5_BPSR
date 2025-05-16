% rebase('layout.tpl', title='Frequently Asked Questions', year=year)


<link rel="stylesheet" href="/static/content/faq_styles.css">

<div class="faq-container">

 <div class="faq-header-box">
   
    <h1>Frequently Asked Questions</h1>


</div>


<div class="faq-box">
    <section class="faq-intro">
        <p>Welcome to the FAQ page! Here you'll find answers related to graph algorithms covered on our site, including Kruskal’s, Prim’s, Dijkstra’s, and Floyd-Warshall’s algorithms. We've also included useful external resources for deeper learning.</p>
    </section>

    <section class="faq-list">
        <article class="faq-item">
            <h2>What is the difference between Kruskal's and Prim's algorithms?</h2>
            <p>Both algorithms find the Minimum Spanning Tree (MST) of a graph, but they use different approaches: Kruskal’s algorithm sorts edges and picks the smallest ones avoiding cycles, while Prim’s algorithm grows the MST from a starting vertex by adding the smallest edge at each step.</p>
            <p>Learn more in the <a href="/kruskal">Kruskal’s algorithm theory</a> and <a href="/prim">Prim’s algorithm theory</a> sections.</p>
        </article>

        <article class="faq-item">
            <h2>Can Dijkstra's algorithm handle graphs with negative edge weights?</h2>
            <p>No, Dijkstra’s algorithm requires all edge weights to be non-negative. For graphs with negative weights, consider using the <a href="/floyd-warshall">Floyd-Warshall algorithm</a> or the Bellman-Ford algorithm (not covered on this site).</p>
        </article>

        <article class="faq-item">
            <h2>What is the time complexity of Floyd-Warshall's algorithm?</h2>
            <p>Floyd-Warshall has a time complexity of O(n³), where n is the number of vertices. It computes shortest paths between all pairs of vertices and is useful for dense graphs.</p>
            <p>Read more in our <a href="/floyd-warshall">Floyd-Warshall algorithm theory</a> page.</p>
        </article>

        <article class="faq-item">
            <h2>Where can I learn more about graph algorithms?</h2>
            <p>Here are some great external resources:</p>
            <ul>
                <li><a href="https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/" target="_blank" rel="noopener noreferrer">GeeksforGeeks: Graph Data Structure</a></li>
                <li><a href="https://visualgo.net/en/graphds" target="_blank" rel="noopener noreferrer">VisuAlgo: Visualizing Graph Algorithms</a></li>
                <li><a href="https://cp-algorithms.com/graph/" target="_blank" rel="noopener noreferrer">CP-Algorithms: Graph Theory</a></li>
            </ul>
        </article>

        <article class="faq-item">
            <h2>How can I contribute or report issues?</h2>
            <p>If you'd like to contribute or have found an issue, please contact the development team via the <a href="/about">About page</a>. We welcome feedback and collaboration!</p>
        </article>
    </section>
</div>
</div>
