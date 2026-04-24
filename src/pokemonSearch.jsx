import React, { useState } from 'react';
// Importamos el archivo CSS
import './pokemonSearch.css';

const PokemonSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError('');
    setPokemon(null);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase().trim()}`);
      
      if (!response.ok) {
        throw new Error('Pokémon no encontrado');
      }

      const data = await response.json();
      
      setPokemon({
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
        types: data.types.map((typeInfo) => typeInfo.type.name),
        weight: data.weight / 10,
        height: data.height / 10
      });
    } catch (err) {
      setError('No existe ese pokemon');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="pokemon-container">
      <h2>Buscador de Pokémon</h2>
      
      <form onSubmit={handleSearch} className="pokemon-form">
        <input
          type="text"
          placeholder="Ej. Pikachu, Charizard, 150..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pokemon-input"
        />
        <button type="submit" className="pokemon-button" disabled={loading}>
          Buscar
        </button>
      </form>

      {loading && <p className="pokemon-message">Buscando en la Pokédex</p>}

      {/* Usamos una clase específica para el error */}
      {error && <p className="pokemon-error">{error} </p>}

      {pokemon && !loading && !error && (
        <div className="pokemon-card">
          <h3 className="pokemon-name">{pokemon.name.toUpperCase()}</h3>
          <img 
            src={pokemon.image} 
            alt={`Imagen de ${pokemon.name}`} 
            className="pokemon-image"
          />
          
          <div className="pokemon-info">
            <p><strong>Tipo(s):</strong> {pokemon.types.join(', ')}</p>
            <p><strong>Peso:</strong> {pokemon.weight} kg</p>
            <p><strong>Altura:</strong> {pokemon.height} m</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonSearch;