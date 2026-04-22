import React, { useState } from 'react';

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
      setError('¡Ups! No pudimos encontrar ese Pokémon. Revisa el nombre e intenta de nuevo.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div style={styles.container}>
      <h2>Buscador de Pokémon 🔴⚪</h2>
      
      {}
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          placeholder="Ej. Pikachu, Charizard, 150..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          Buscar
        </button>
      </form>

      {}
      {loading && <p style={styles.message}>Buscando en la Pokédex... ⏳</p>}

      {}
      {error && <p style={{ ...styles.message, color: 'red' }}>{error} ❌</p>}

      {}
      {pokemon && !loading && !error && (
        <div style={styles.card}>
          <h3 style={styles.pokemonName}>{pokemon.name.toUpperCase()}</h3>
          <img 
            src={pokemon.image} 
            alt={`Imagen de ${pokemon.name}`} 
            style={styles.image}
          />
          
          <div style={styles.info}>
            <p><strong>Tipo(s):</strong> {pokemon.types.join(', ')}</p>
            <p><strong>Peso:</strong> {pokemon.weight} kg</p>
            <p><strong>Altura:</strong> {pokemon.height} m</p>
          </div>
        </div>
      )}
    </div>
  );
};


const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '400px',
    margin: '40px auto',
    textAlign: 'center',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#ffcb05', // Amarillo Pokémon
    color: '#3b4cca', // Azul Pokémon
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  message: {
    fontWeight: 'bold',
    margin: '20px 0'
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #eee'
  },
  pokemonName: {
    margin: '0 0 15px 0',
    letterSpacing: '2px'
  },
  image: {
    width: '150px',
    height: '150px',
    objectFit: 'contain'
  },
  info: {
    textAlign: 'left',
    marginTop: '15px',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd'
  }
};

export default PokemonSearch;