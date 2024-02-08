const pokemonToSearch = document.getElementById('search'); 
const buttonSearch = document.getElementById('button'); 
const pokeInfoName = document.getElementById('pokemon-name'); 
const pokeInfoType = document.getElementById('types'); 
const pokeInfoImg = document.getElementById('imgsrc'); 
const hiddenBox = document.getElementById('result-box'); 


async function getPokemon() {

    if (!pokemonToSearch.value) {
        alert('You need a valid Pokemon name'); 
        return; 
    }

    const lowerCasePokemon = pokemonToSearch.value.toLowerCase(); 

    const url = `https://pokeapi.co/api/v2/pokemon/${lowerCasePokemon}`; 
    const data = await fetch(url);

    if (data.status == 404) {
        alert('Pokemon not found. Try again'); 
    }

    hiddenBox.classList.remove('hidden');
    const result = await data.json();
    
    pokeInfoName.innerHTML = result.name.toUpperCase(); 
    pokeInfoImg.src = result.sprites.front_default; 

    let parsedTypes = ''; 

    for (let i = 0; i < result.types.length; i++) {
        if (parsedTypes) {
            parsedTypes += ', '
        }
        parsedTypes += result.types[i].type.name; 
    }

    pokeInfoType.innerHTML = parsedTypes; 
}

buttonSearch.addEventListener('click', getPokemon); 
