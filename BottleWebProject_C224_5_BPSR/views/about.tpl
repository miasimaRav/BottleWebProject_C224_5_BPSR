% rebase('layout.tpl', title='About')
<div class="about-container">
    <!-- Purpose of the Website -->
    <section class="purpose">
        <h2>Purpose of the Website</h2>
        <p>This website is designed as an educational tool to help students and enthusiasts understand and visualize four fundamental graph algorithms: Kruskal’s, Prim’s, Dijkstra’s, and Floyd-Warshall’s algorithms. Each algorithm is presented with interactive tools, allowing users to input graph data, explore step-by-step executions, and visualize results, fostering a deeper understanding of graph theory and algorithmic problem-solving.</p>
        <!-- Russian version (commented for potential localization) -->
        <!--
        <h2>Цель сайта</h2>
        <p>Этот сайт создан как образовательный инструмент, чтобы помочь студентам и энтузиастам понять и визуализировать четыре фундаментальных алгоритма на графах: алгоритмы Краскала, Прима, Дейкстры и Флойда-Уоршалла. Каждый алгоритм представлен с интерактивными инструментами, позволяющими вводить данные графа, изучать пошаговое выполнение и визуализировать результаты, способствуя более глубокому пониманию теории графов и алгоритмического решения задач.</p>
        -->
    </section>

    <!-- Developers -->
    <section class="developers">
        <h2>Our Team</h2>
        <div class="developer-grid">
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
                <p>Done the Russian localization of the site and developed a page for the Floyd-Warshall algorithm.</p>
            </div>
            <div class="developer">
                <img src="/static/resources/images/karina.jpg" alt="Karina Balabanova" onclick="this.parentElement.classList.add('pulse'); setTimeout(() => this.parentElement.classList.remove('pulse'), 1000);">
                <h3>Karina Balabanova</h3>
                <p>Developed a page with frequently asked questions and created a page for the Dijkstra’s algorithm.</p>
            </div>
        </div>
        <!-- Russian version (commented for potential localization) -->
        <!--
        <h2>Наша команда</h2>
        <div class="developer-grid">
            <div class="developer">
                <img src="/static/resources/artem.jpg" alt="Артём Портов">
                <h3>Артём Портов</h3>
                <p>Создал страницы "О нас" и алгоритм Прима. Помог разработать стиль фона.</p>
            </div>
            <div class="developer">
                <img src="/static/resources/vasilisa.jpg" alt="Василиса Савинская">
                <h3>Василиса Савинская</h3>
                <p>Разработала главную страницу сайта и страницу для алгоритма Краскала.</p>
            </div>
            <div class="developer">
                <img src="/static/resources/daria.jpg" alt="Дарья Равилова">
                <h3>Дарья Равилова</h3>
                <p>Выполнила русскую локализацию сайта и разработала страницу для алгоритма Флойда-Уоршалла.</p>
            </div>
            <div class="developer">
                <img src="/static/resources/karina.jpg" alt="Карина Балабанова">
                <h3>Карина Балабанова</h3>
                <p>Разработала страницу с часто задаваемыми вопросами и создала страницу для алгоритма Дейкстры.</p>
            </div>
        </div>
        -->
    </section>
</div>

<style>
.developer {
    position: relative;
    display: inline-block;
    margin: 10px;
}

.developer img {
    width: 200px;
    height: auto;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.developer.pulse img {
    animation: pulse 1s ease-out;
}

@keyframes pulse {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4); }
    50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(0, 0, 0, 0); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }
}
</style>