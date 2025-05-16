% rebase('layout.tpl', title=request.translations['about']['title'], year=2025)
<link rel="stylesheet" href="/static/content/about_styles.css">
<div class="about-container">
    <!-- Purpose of the Website -->
    <section class="purpose">
        <h2>{{request.translations['about']['purpose_title']}}</h2>
        <p>{{request.translations['about']['purpose_text']}}</p>
    </section>

    <!-- Developers -->
    <section class="developers">
        <h2>{{request.translations['about']['team_title']}}</h2>
        <div class="developer-list">
            % for developer in request.translations['about']['developers']:
            <!-- Фиксированный английский вариант имени для пути к изображению -->
            % english_name = {
            %   'Artem Portov': 'artem',
            %   'Артём Портов': 'artem',
            %   'Vasilisa Savinskaya': 'vasilisa',
            %   'Василиса Савинская': 'vasilisa',
            %   'Daria Ravilova': 'daria',
            %   'Дарья Равилова': 'daria',
            %   'Karina Balabanova': 'karina',
            %   'Карина Балабанова': 'karina'
            % }.get(developer['name'], developer['name'].split()[0].lower())
            <div class="developer">
                <img src="/static/resources/images/{{english_name}}.jpg" alt="{{developer['name']}}" onclick="this.parentElement.classList.add('pulse'); setTimeout(() => this.parentElement.classList.remove('pulse'), 1000);">
                <h3>{{developer['name']}}</h3>
                <p>{{developer['role']}}</p>
            </div>
            % end
        </div>
    </section>
</div>