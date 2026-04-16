function pokemonMainpageTemplate(pokemon, index) {
    return `
        <div onclick=openOverlay(${index}) class="pokemon_card">
            <div class="pokemon_name">
                <h2>${pokemon.id}</h2>
                <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            </div>
            <div id="pokemonImg_${index}"></div>
            <div class="poke_types" id="poke_types_${index}">
                <h3>Type(s):</h3>
            </div>
        </div>
    `;
}

function pokemonCloseLook(pokemon, index) {
    return `
        <div onclick="disableCloseoverlay(event)" class="pokemon_card_close">
            <div class="pokemon_name">
                <h2>${pokemon.id}</h2>
                <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            </div>
            <div class="style_pokemon_closelook" id="pokemonImage_${index}"></div>
            <div class="space_around">
                <div class="style_onclick_stats" onclick="openMain()"><span>main</span></div>
                <div class="style_border_stats"></div>
                <div class="style_onclick_stats" onclick="openStats(${index})"><span>stats</span></div>
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
            <div id="buttons_next_previous"></div>
        </div>
    `;
}

function templateButtonsNextAndPreviousCard() {
    return `
        <div class="button-previous" id="button-previous" onclick="previousCard()"><</div>
        <div class="button-next" id="button-next" onclick="nextCard()">></div>
    `;
}

function templateButtonOnlyNextCard() {
    return `
        <div class="button-next" id="button-next" onclick="nextCard()">></div>
    `;
}

function templateButtonOnlyPreviousCard() {
    return `
        <div class="button-previous" id="button-previous" onclick="previousCard()"><</div>
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

function templatePokemonTypes(pokeTypes, index) {
    return `
        <span>${pokeTypes[index].type.name}</span>
    `;
}