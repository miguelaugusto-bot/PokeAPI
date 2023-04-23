const pokemonName = document.querySelector('.pokemon_name'); //chamar a linha no html para inserir o nome
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form'); //enviar dados 
const input = document.querySelector('.input_search'); //input do valor

const buttonPrev = document.querySelector('.btn-prev'); 
const buttonNext = document.querySelector('.btn-next'); 

let searcPokemon = 1;

//chamar a api e tratar o retorno

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`); //chamar a api e inserir o valor


    if(APIResponse.status == 200){
        const data = await APIResponse.json(); //receber o retorno em um objeto json
        return data;
    }
   
    // console.log(data); para testar o retorno do objeto 
}

const renderPokemon = async(pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    if(data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        //console.log(data); teste
        input.value = '';
        searcPokemon = data.id;
    }else{
        pokemonImage.src = "./gif/loading-loading-forever.gif";
        pokemonName.innerHTML = 'Not found ';
        pokemonNumber.innerHTML = '';
    }
}

//pesquisar o pokemon

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', (event) => {
    if(searcPokemon > 1){
        searcPokemon -= 1;
        renderPokemon(searcPokemon);
    }
});

buttonNext.addEventListener('click', (event) => {
    searcPokemon += 1;
    renderPokemon(searcPokemon);
});

renderPokemon(searcPokemon);