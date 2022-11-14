import React from 'react';
import '../src/App.css';

function App() {
  const [pokemon, setPokemon] = React.useState([]);
  const [pokename, setPokename] = React.useState(null);
  const [pokephoto, setPokephoto] = React.useState(null);

  React.useEffect(() => {
    async function fetchData(pokemon){
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      const json = await response.json();
      console.log(json);
      setPokemon(json);
      setPokename(json.name);
      setPokephoto(json.sprites.front_default)
    }
    fetchData('25')
  }, [])

  return (
    <div className='App'>
      <img className='pokedex' src='./src/assets/pokedex.png' alt="Pokédex" />
      
      <img className='pokemon' src={pokephoto} alt={pokemon.id} />

      <h1 className='pokeData'>
        <span className='pokeNumber'>{pokemon.id}</span> - {''}
        <span className='pokeName'>{pokename}</span>
      </h1>

      <form className='form' onSubmit={(e)=>{e.preventDefault()}}>
        <input type="search" className='search' placeholder='Name or ID number' required />
      </form>

      <div className='buttons'>
        <button className="button btn-prev">Prev &lt;</button>
        <button className="button btn-next">Next &gt;</button>
      </div>

      
    </div>
  );
}

export default App
