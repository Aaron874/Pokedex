const PokemonNames = [];
const currentAmountofPokemon = [];
const currentIndexObject = {};

let currentIndex = 21;

function init() {
    fetchPokemon();
    showSpinnerAndLoadPokemon();
    fetchPokeNames();
    console.log(currentAmountofPokemon);
}

function showLoadingSpinner() {
    let loadingSpinner = document.getElementById('loadingspinner');
    loadingSpinner.style = 'display: flex';
    document.getElementById('content').style = 'display: none';
    document.getElementById('loadingbutton').style = 'display: none';
}

function disableLoadingSpinner() {
    let loadingSpinner = document.getElementById('loadingspinner');
    loadingSpinner.style = '';
    document.getElementById('content').style = '';
    document.getElementById('loadingbutton').style = '';
}

async function showSpinnerAndLoadPokemon(event) {
    showLoadingSpinner();
    await fetchingAndLoadingPokemon(event);
    disableLoadingSpinner();
}

async function fetchingAndLoadingPokemon(event) {
    if (document.getElementById('input_field').value !== '') {
        await showSearchedPoke();
    } else if (document.getElementById('input_field').value == '' && document.getElementById('content').childElementCount < 20) {
        await showSearchedPoke();
    } else if (event.target.id === 'loadingbutton') {
        await countAndFetchMorePokemon();
    } else {
        await fetchPokemon();
    }
}

async function fetchPokeNames() {
    const NAMES_URL = 'https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0';
    try {
        let response = await fetch(NAMES_URL);
        let responseToJson = await response.json();

        for (let index = 0; index < responseToJson.results.length; index++) {
            PokemonNames.push(responseToJson.results[index].name);
        }
    } catch (error) {
        console.error('Fehler beim Laden der Pokemonnamen:', error);

    }
}

async function fetchCurrentAmountOfPokemon() {
    let allPokemon = document.getElementById('content');
    allPokemon.innerHTML = '';
    for (let index = 1; index < currentAmountofPokemon.length + 1; index++) {
        const SOME_URL = `https://pokeapi.co/api/v2/pokemon/${index}`;
        let response = await fetch(SOME_URL);
        let responseToJson = await response.json();
        allPokemon.innerHTML += pokemonMainpageTemplate(responseToJson, index);
        backgroundPokemonCard(responseToJson, index);
    }
}

async function showSearchedPoke() {
    let input = document.getElementById('input_field').value.toLowerCase();
    let content = document.getElementById('content');
    let loadingbutton = document.getElementById('loadingbutton');
    if (input.length >= 3) {
        await searchPoke();
        loadingbutton.classList.add('loading_button_disabled');
    } else if (input.length < 1 && content.childElementCount < 20) {
        await fetchCurrentAmountOfPokemon();
        loadingbutton.classList.remove('loading_button_disabled');
        document.getElementById('alert_searchbar').style = '';
    } else if (input.length > 0 && input.length < 3) {
        document.getElementById('alert_searchbar').style = 'display: flex';
    } else if (input.length < 1) {
        document.getElementById('alert_searchbar').style = 'display: flex';
    }
}

async function searchPoke() {
    let input = document.getElementById('input_field').value.toLowerCase();
    let results = currentAmountofPokemon.filter(name =>
        name.toLowerCase().includes(input));
    let selectedPokemon = document.getElementById('content');
    selectedPokemon.innerHTML = '';
    if (results.length > 0) {
        for (let index = 0; index < results.length; index++) {
            const SOME_URL = `https://pokeapi.co/api/v2/pokemon/${results[index]}`;
            let response = await fetch(SOME_URL);
            let responseToJson = await response.json();
            selectedPokemon.innerHTML += pokemonMainpageTemplate(responseToJson, index);
            backgroundPokemonCard(responseToJson, index);
        }
        document.getElementById('alert_searchbar').style = '';
    } else { noPokemonFound(); }
}

function noPokemonFound() {
    let content = document.getElementById('content');
    content.innerHTML += "NO POKEMON FOUND";
}

async function fetchPokemon() {
    let allPokemon = document.getElementById('content');
    allPokemon.innerHTML = '';
    for (let index = 1; index < 21; index++) {
        const SOME_URL = `https://pokeapi.co/api/v2/pokemon/${index}`;
        let response = await fetch(SOME_URL);
        let responseToJson = await response.json();
        allPokemon.innerHTML += pokemonMainpageTemplate(responseToJson, index);
        backgroundPokemonCard(responseToJson, index);
        currentIndexObject.value = 21;
        currentAmountofPokemon.push(responseToJson.forms[0].name);
    }
    console.log(currentAmountofPokemon);
}

async function countAndFetchMorePokemon() {
    let allPokemon = document.getElementById('content');
    if (allPokemon.childElementCount < 20) {
    } else {
        await fetchMorePokemon();
    }
}

async function fetchMorePokemon() {
    let allPokemon = document.getElementById('content');
    let start = currentIndex;
    let end = currentIndex + 19;
    for (let index = start; index <= end; index++) {
        const SOME_URL = `https://pokeapi.co/api/v2/pokemon/${index}`;
        let response = await fetch(SOME_URL);
        let responseToJson = await response.json();
        allPokemon.innerHTML += pokemonMainpageTemplate(responseToJson, index);
        backgroundPokemonCard(responseToJson, index);
        currentAmountofPokemon.push(responseToJson.forms[0].name);
    }
    currentIndex += 20;
    currentIndexObject.value = currentIndex;
    console.log(currentAmountofPokemon);
}


async function openOverlay(index) {
    let pokemonCard = document.getElementById('overlay_content');
    pokemonCard.innerHTML = "";
    let results = PokemonNames;
    let currentIndex = index - 1;
    const SOME_URL = `https://pokeapi.co/api/v2/pokemon/${results[currentIndex]}`;
    let response = await fetch(SOME_URL);
    let responseToJson = await response.json();
    document.getElementById('overlay').style = 'display: flex';
    pokemonCard.innerHTML += pokemonCloseLook(responseToJson, currentIndex, currentAmountofPokemon.length);
    document.getElementById('stats_stats').style = 'display: none';
    backgroundPokemonCardCloselook(responseToJson, currentIndex);
    showAbilities(responseToJson);
    let body = document.getElementById('body');
    body.classList.add("overflow");
    renderButtonsNextAndPrevious(index);
}

function renderButtonsNextAndPrevious(index) {
    let currentIndex = index - 1;
    if (currentIndex >= 1 && currentIndex <= currentAmountofPokemon.length - 2) {
        document.getElementById('buttons_next_previous').innerHTML += templateButtonsNextAndPreviousCard(index);
    } else if (currentIndex >= currentAmountofPokemon.length - 1 && currentIndex <= currentAmountofPokemon.length) {
        document.getElementById('buttons_next_previous').innerHTML += templateButtonOnlyPreviousCard(index);
    } else if (currentIndex <= 1) {
        document.getElementById('buttons_next_previous').innerHTML += templateButtonOnlyNextCard(index);
        document.getElementById('button-next').classList.add('button-next-extrastyle');
    }
}

function showAbilities(responseToJson) {
    for (let i = 0; i < responseToJson.abilities.length; i++) {
        if (i === responseToJson.abilities.length - 1) {
            document.getElementById('abilities_Id').innerHTML += responseToJson.abilities[i].ability.name;
        } else {
            document.getElementById('abilities_Id').innerHTML += responseToJson.abilities[i].ability.name + ", ";
        }
    }
}

async function openStats(index) {
    document.getElementById('stats_inner').innerHTML = "";
    document.getElementById('stats_main').style = 'display: none';
    document.getElementById('stats_stats').style = '';
    let currentIndex = index + 1;
    const SOME_URL = `https://pokeapi.co/api/v2/pokemon/${currentIndex}`;
    let response = await fetch(SOME_URL);
    let responseToJson = await response.json();
    for (let ix = 0; ix < responseToJson.stats.length; ix++) {
        document.getElementById('stats_inner').innerHTML += templateInnerStats(responseToJson, ix);
    }
}

function nextCard(index) {
    let currentIndex = index;
    if (currentIndex <= currentAmountofPokemon.length) {
        closeOverlay();
        openOverlay(currentIndex + 1);
    } else {
        document.getElementById('button-next').classList.add('button-next-disabled');
    }
}

function previousCard(index) {
    if (index <= currentAmountofPokemon.length) {
        if (index >= 1) {
            closeOverlay();
            openOverlay(index - 1);
        }
    } else { }
}

function openMain() {
    document.getElementById('stats_main').style = '';
    document.getElementById('stats_stats').style = 'display: none';
}

function closeOverlay() {
    document.getElementById('overlay').style = '';
    let body = document.getElementById('body');
    body.classList.remove("overflow");
}

function backgroundPokemonCard(responseToJson, index) {
    let pokemonImgUrl = responseToJson.sprites.other["official-artwork"].front_default;
    let pokemonImg = document.createElement('img');
    pokemonImg.src = pokemonImgUrl;
    document.getElementById(`pokemonImg_${index}`).appendChild(pokemonImg);
    const className = responseToJson.types[0].type.name;
    let pokeTypes = responseToJson.types;
    for (let i = 0; i < pokeTypes.length; i++) {
        document.getElementById(`poke_types_${index}`).innerHTML += templatePokemonTypes(pokeTypes, i);
    }
    pokemonImg.classList.add("pokemon_img");
    pokemonImg.classList.add(className);
}

function backgroundPokemonCardCloselook(responseToJson, index) {
    let pokemonImgUrl = responseToJson.sprites.other["official-artwork"].front_default;
    let pokemonImg = document.createElement('img');
    pokemonImg.src = pokemonImgUrl;
    document.getElementById(`pokemonImage_${index}`).appendChild(pokemonImg);
    const className = responseToJson.types[0].type.name;
    pokemonImg.classList.add("pokemon_img");
    pokemonImg.classList.add(className);
}

function disableCloseoverlay(event) {
    event.stopPropagation("onclick");
}

async function reloadPage() {
    location.reload();
}
