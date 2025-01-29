import styles from './gameDisplay.module.css';

type GameDisplayProps = {
  pokemonData: {
    pokemonName: string;
    spriteUrl: string;
  }[];
  handleClick: (pokemon: string) => void;
};

export default function GameDisplay({
  pokemonData,
  handleClick,
}: GameDisplayProps) {
  return (
    <div className={styles.container}>
      {pokemonData.map((currData) => {
        return (
          <div
            key={currData.pokemonName}
            className={styles.card}
            onClick={() => handleClick(currData.pokemonName)}
          >
            <img src={currData.spriteUrl} alt={currData.pokemonName} />
            {currData.pokemonName}
          </div>
        );
      })}
    </div>
  );
}
