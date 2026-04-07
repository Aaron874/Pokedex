function pokemonMainpageTemplate(pokemon, index) {
    return `
        <div onclick=openOverlay(${pokemon.id}) class="pokemon_card">
            <div class="pokemon_name">
                <h2>${pokemon.id}</h2>
                <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            </div>
            <div id="pokemonImg_${index}"></div>
            <div>
                <img>
                <img>
            </div>
        </div>
    `;
}

function pokemonCloseLook(pokemon, index) {
    return `
        <div onclick="disableCloseoverlay(event)" class="pokemon_card_close pokemon_card">
            <div class="pokemon_name">
                <h2>${pokemon.id}</h2>
                <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            </div>
            <div class="style_pokemon_closelook" id="pokemonImage_${index}"></div>
            <div class="space_around">
                <div class="style_onclick_stats" onclick="openMain()">main</div>
                <div class="style_border_stats"></div>
                <div class="style_onclick_stats" onclick="openStats(${index})">stats</div>
            </div>
            <div class="style_div_underline">
                <div class="style_underline"></div>
                <div class="style_underline"></div>
            </div>
            <div id="stats_main" class="backgroundcolor_stats">
                <div>
                    <span>height</span>
                    <span>: ${pokemon.height / 10 + ' m'}</span>
                </div>
                <div>
                    <span>weight</span>
                    <span>: ${pokemon.weight / 10 + ' kg'}</span>
                </div>
                <div>
                    <span>base experience</span>
                    <span>: ${pokemon.base_experience}</span>
                </div>
                <div>
                    <span>abilities</span>
                    <span id="abilities_Id">: </span>
                </div>
            </div>
            <div id="stats_stats" class="backgroundcolor_stats">
                <div id="stats_inner">
                </div>
            </div>
            <div class="button-previous" onclick="previousCard(${index})"><</div>
            <div class="button-next" onclick="nextCard(${index})">></div>
        </div>
    `;
}

function templateInnerStats(pokemon, ix) {
    return `
        <div>
            <span>${pokemon.stats[ix].stat.name}</span>
            <span id="stats_${ix}">: ${pokemon.stats[ix].base_stat}</span>
        </div>
    `;
}