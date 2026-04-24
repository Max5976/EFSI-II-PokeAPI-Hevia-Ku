import { useEffect, useState } from 'react'
import PokemonSearch from './pokemonSearch.jsx';
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/" + name)
      .then(res => res.json())
      .then(data => setPokemon(data))
      .catch(err => console.error(err));
  }, [name]);

  return (
    <>
      <div>
        {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
        )}
      </div>  
      <div className="App">
      {}
      <PokemonSearch />
    </div>
    </>
    
  )
}

export default App
