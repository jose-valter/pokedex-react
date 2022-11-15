import React from 'react';
import '../src/App.css';

function App() {
  const [pokemon, setPokemon] = React.useState([]);
  const [pokeid, setPokeid] = React.useState('1');
  const [pokename, setPokename] = React.useState(null);
  const [pokephoto, setPokephoto] = React.useState(null);
  const [search, setSearch] = React.useState('');


  async function fetchData(pokemon){
    try{
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      const json = await response.json();
      setPokemon(json);
      setPokeid(json.id);
      try{
        let name = await json.name;
        if (json.name.length > 15){
          name = json.name.slice(0,10)+'...'
        }
        setPokename(name)
      }catch(erro){
        console.log(erro)
      }
      try{
        let photo = await json.sprites.versions['generation-v']['black-white'].animated['front_default'];
        if(photo){
          setPokephoto(photo)
        }else{
          setPokephoto(json.sprites.other['official-artwork']['front_default'])
        }
      } catch(erro){
        console.log(erro)
      }
     
    } catch(error){
      alert('Ocorreu um erro. Por favor, procure por um Pokémon válido');
      setSearch('');
    } finally{
      setSearch('');
    }
  }
  

  function handleSubmit(event){
    event.preventDefault();
    const lowercaseSearch = search.toLowerCase();
    fetchData(lowercaseSearch);
    setSearch('');
  }

  function previousPoke(){
    if(pokeid > 1){
      let newPoke = pokeid - 1;
      setPokeid(newPoke)
    }
   
  }

  function nextPoke(){
    if(pokeid < 905){
      let newPoke = pokeid + 1;
      setPokeid(newPoke)
    }
   
  }


  React.useEffect(() => {
    fetchData(pokeid)
  }, [pokeid])




  return (
    <div className='App'>
      <img className='pokedex' src='./src/assets/pokedex.png' alt="Pokédex" />
      
      <img className='pokemon' src={pokephoto} alt={pokemon.id} />

      <h1 className='pokeData'>
        <span className='pokeNumber'>{pokeid}</span> - {''}
        <span className='pokeName'>{pokename}</span>
      </h1>

      <form className='form' onSubmit={handleSubmit}>
        <input type="search" className='search' value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder='Name or ID number' required />
      </form>

      <div className='buttons'>
        <button className="button" onClick={previousPoke}> &lt; Prev</button>
        <button className="button" onClick={nextPoke}>Next &gt;</button>
      </div>

      
    </div>
  );
}

export default App
