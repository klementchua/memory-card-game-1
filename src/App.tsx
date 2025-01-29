import { useEffect, useState } from 'react';
import TitlePage from './components/TitlePage/TitlePage';
import Scoreboard from './components/Scoreboard/Scoreboard';
import GameDisplay from './components/GameDisplay/GameDisplay';
import LosePage from './components/LosePage';

type PokemonData = {
  pokemonName: string;
  spriteUrl: string;
}[];

export default function App() {
  // State initialisation
  const [pokemonData, setPokemonData] = useState<PokemonData>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<string[]>([]);
  const [loadingAPI, setLoadingAPI] = useState(true);
  const [difficulty, setDifficulty] = useState<number>(5);
  const [displayTitlePage, setDisplayTitlePage] = useState(true);
  const [displayGame, setDisplayGame] = useState(false);
  const [gameLost, setGameLost] = useState(false);

  // Calculate all derived state
  const currScore = selectedPokemon.length;
  const gameWon = currScore === pokemonData.length && !loadingAPI;

  // Effect for fetching random pokemon data from API upon init and reload
  useEffect(() => {
    setSelectedPokemon([]);

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
    if (selectedPokemon.includes(pokemon)) {
      setGameLost(true);
      setDisplayGame(false);
      setSelectedPokemon([]);
      return;
    }

    setSelectedPokemon([...selectedPokemon, pokemon]);
    shufflePokemon();
  }

  return (
    <div id="appContainer">
      {displayTitlePage && (
        <TitlePage
          setDifficulty={setDifficulty}
          setDisplayTitlePage={setDisplayTitlePage}
          setDisplayGame={setDisplayGame}
        />
      )}
      <div style={{ display: displayGame ? 'block' : 'none' }}>
        <Scoreboard score={currScore} maxScore={difficulty} />
        <GameDisplay pokemonData={pokemonData} handleClick={addPokemonToList} />
      </div>
      {gameLost && (
        <LosePage setGameLost={setGameLost} setDisplayGame={setDisplayGame} />
      )}
    </div>
  );
}
