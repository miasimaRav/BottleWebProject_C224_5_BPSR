% rebase('layout.tpl', title='About')
<link rel="stylesheet" href="/static/content/about_styles.css">
<div class="about-container">
    <!-- Purpose of the Website -->
    <section class="purpose">
        <h2>Purpose of the Website</h2>
        <p>This website is designed as an educational tool to help students and enthusiasts understand and visualize four fundamental graph algorithms: Kruskal’s, Prim’s, Dijkstra’s, and Floyd-Warshall’s algorithms. Each algorithm is presented with interactive tools, allowing users to input graph data, explore step-by-step executions, and visualize results, fostering a deeper understanding of graph theory and algorithmic problem-solving.</p>
    </section>

    <!-- Developers -->
    <section class="developers">
        <h2>Our Team</h2>
        <div class="developer-list">
            <div class="developer">
                <img src="/static/resources/images/artem.jpg" alt="Artem Portov" onclick="this.parentElement.classList.add('pulse'); setTimeout(() => this.parentElement.classList.remove('pulse'), 1000);">
                <h3>Artem Portov</h3>
                <p>Made the about pages and the Prim’s algorithm. Helped develop the background style.</p>
            </div>
            <div class="developer">
                <img src="/static/resources/images/vasilisa.jpg" alt="Vasilisa Savinskaya" onclick="this.parentElement.classList.add('pulse'); setTimeout(() => this.parentElement.classList.remove('pulse'), 1000);">
                <h3>Vasilisa Savinskaya</h3>
                <p>Developed the main page of the website, made a page for the Kruskal’s algorithm.</p>
            </div>
            <div class="developer">
                <img src="/static/resources/images/daria.jpg" alt="Daria Ravilova" onclick="this.parentElement.classList.add('pulse'); setTimeout(() => this.parentElement.classList.remove('pulse'), 1000);">
                <h3>Daria Ravilova</h3>
                <p>Developed a page for the Floyd-Warshall algorithm.</p>
            </div>
            <div class="developer">
                <img src="/static/resources/images/karina.jpg" alt="Karina Balabanova" onclick="this.parentElement.classList.add('pulse'); setTimeout(() => this.parentElement.classList.remove('pulse'), 1000);">
                <h3>Karina Balabanova</h3>
                <p>Developed a page with frequently asked questions and created a page for the Dijkstra’s algorithm.</p>
            </div>
        </div>
    </section>
</div>