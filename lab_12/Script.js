const dexContent = document.getElementById('dexContent');
const dexFilters = document.getElementById('dexFilters');
const paginationControls = document.getElementById('paginationControls');
let allPokemon = [];
let displayedPokemon = [];
let currentDexPage = 1;
const pokemonsPerPage = 25;
const typeFilters = ['all', 'fire', 'water', 'grass', 'electric', 'rock', 'ground', 'bug', 'flying', 'psychic'];

initDexFilters();
fetchAllPokemon().then(() => renderPage(displayedPokemon));
function initDexFilters() {
    const fragment = document.createDocumentFragment();
    typeFilters.forEach(type => {
        const btn = document.createElement('button');
        btn.classList.add('filter-btn');
        btn.innerText = type.charAt(0).toUpperCase() + type.slice(1);
        btn.dataset.filter = type;
        fragment.appendChild(btn);
    });
    dexFilters.appendChild(fragment);
    dexFilters.addEventListener('click', event => {
        if (event.target.classList.contains('filter-btn')) {
            applyDexFilter(event.target.dataset.filter);
        }
    });
}
async function fetchAllPokemon() {
    const cached = localStorage.getItem('pokemonCache');
    if (cached) {
        allPokemon = JSON.parse(cached);
    } else {
        const requests = Array.from({ length: 100 }, (_, i) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`).then(res => res.json())
        );
        allPokemon = await Promise.all(requests);
        localStorage.setItem('pokemonCache', JSON.stringify(allPokemon));
    }
    applyDexFilter('all');
}
function applyDexFilter(type) {
    displayedPokemon = type === 'all'
        ? allPokemon
        : allPokemon.filter(pkm => pkm.types.some(t => t.type.name === type));
    currentDexPage = 1;
    renderPage(displayedPokemon);
}
function renderPage(data) {
    dexContent.innerHTML = '';
    const startIdx = (currentDexPage - 1) * pokemonsPerPage;
    const endIdx = startIdx + pokemonsPerPage;
    const paginatedData = data.slice(startIdx, endIdx);

    const fragment = document.createDocumentFragment();
    paginatedData.forEach(pkm => fragment.appendChild(createPokemonCard(pkm)));
    dexContent.appendChild(fragment);

    renderPagination(data.length);
}

function renderPagination(total) {
    paginationControls.innerHTML = '';
    const totalPages = Math.ceil(total / pokemonsPerPage);

    if (currentDexPage > 1) {
        paginationControls.appendChild(createPageButton('← Previous', currentDexPage - 1));
    }
    if (currentDexPage < totalPages) {
        paginationControls.appendChild(createPageButton('Next →', currentDexPage + 1));
    }
}

function createPageButton(text, page) {
    const btn = document.createElement('button');
    btn.innerText = text;
    btn.classList.add('pagination-btn');
    btn.addEventListener('click', () => {
        currentDexPage = page;
        renderPage(displayedPokemon);
    });
    return btn;
}

function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');
    const mainType = pokemon.types[0].type.name;

    card.innerHTML = `
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}">
        <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
        <p>Type: ${mainType}</p>
    `;
    card.addEventListener('click', () => showModal(pokemon));
    return card;
}

function showModal(pokemon) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${pokemon.name}</h2>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png">
            <p>Height: ${pokemon.height / 20}m</p>
            <p>Weight: ${pokemon.weight / 15}kg</p>
            <button onclick="closeModal()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
}
