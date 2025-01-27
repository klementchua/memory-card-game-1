import { useEffect, useState } from 'react';
import Scoreboard from './components/Scoreboard/Scoreboard';
import GameDisplay from './components/GameDisplay/GameDisplay';

type PokemonData = {
  pokemonName: '';
  spriteUrl: '';
}[];

export default function App() {
  // State for pokemon data & selected cards
  const [pokemonData, setPokemonData] = useState<PokemonData>([]);
  const [selectedPokemon, setSelectedPokemon] = useState(['']);
  const [loadingAPI, setLoadingAPI] = useState(true);

  // Effect for fetching random pokemon data from API upon init and reload
  useEffect(() => {
    async function getPokemonData(length: number): Promise<void> {
      // Generate a list of random ids
      const randomIds: number[] = [];
      for (let i = 0; i < length; i++) {
        randomIds.push(Math.floor(Math.random() * 1025) + 1);
      }
      // Fetch the data from PokeAPI
      const pokemonData: PokemonData = await Promise.all(
        randomIds.map((id) => {
          const currentData = fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((response) => response.json())
            .then((result) => ({
              pokemonName: result.name,
              spriteUrl: result.sprites.front_default,
            }));
          return currentData;
        })
      );
      setPokemonData(pokemonData);
      setLoadingAPI(false);
    }
    getPokemonData(5);
  }, []);

  // Function to shuffle pokemon list using Fisher-Yates Shuffle
  function shufflePokemon(): void {
    const shuffle = [...pokemonData];
    for (let i = pokemonData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]];
    }
    setPokemonData(shuffle);
  }

  // Function to add pokemon to selected pokemon list and shuffle
  function addPokemonToList(pokemon: string): void {
    setSelectedPokemon([...selectedPokemon, pokemon]);
    shufflePokemon();
  }

  return (
    <div id="appContainer">
      <Scoreboard />
      <GameDisplay pokemonData={pokemonData} handleClick={addPokemonToList} />
    </div>
  );
}
