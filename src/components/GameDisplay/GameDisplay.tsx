import styles from './gameDisplay.module.css';

type GameDisplayProps = {
  pokemonData: {
    pokemonName: '';
    spriteUrl: '';
  }[];
};

export default function GameDisplay({ pokemonData }: GameDisplayProps) {
  return (
    <div className={styles.container}>
      {pokemonData.map((currData) => {
        return (
          <div key={currData.pokemonName} className={styles.card}>
            <img src={currData.spriteUrl} alt={currData.pokemonName} />
            {currData.pokemonName}
          </div>
        );
      })}
    </div>
  );
}
