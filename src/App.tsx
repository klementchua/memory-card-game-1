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
  const [selectedPokemon, setSelectedPokemon] = useState<string[]>([]);
  const [loadingAPI, setLoadingAPI] = useState(true);
  const [difficulty, setDifficulty] = useState<number>(5);

  // Calculate all derived state
  // Check for duplicates in gameLost and reset game if game lost
  const gameLost =
    Array.from(new Set(selectedPokemon)).length !== selectedPokemon.length;
  if (gameLost) {
    setSelectedPokemon([]);
    shufflePokemon();
  }
  const currScore = selectedPokemon.length;
  const gameWon = currScore === pokemonData.length && !loadingAPI;

  // Effect for fetching random pokemon data from API upon init and reload
  useEffect(() => {
    async function getPokemonData(length: number): Promise<void> {
      setLoadingAPI(true);
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
      setSelectedPokemon([]);
      setLoadingAPI(false);
    }
    getPokemonData(difficulty);
  }, [gameWon, difficulty]);

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
      <div className="buttonContainers">
        <button
          onClick={() => {
            setDifficulty(5);
          }}
        >
          Easy
        </button>
        <button
          onClick={() => {
            setDifficulty(10);
          }}
        >
          Medium
        </button>
        <button
          onClick={() => {
            setDifficulty(15);
          }}
        >
          Hard
        </button>
      </div>
      <Scoreboard score={currScore} maxScore={difficulty} />
      <GameDisplay pokemonData={pokemonData} handleClick={addPokemonToList} />
    </div>
  );
}
