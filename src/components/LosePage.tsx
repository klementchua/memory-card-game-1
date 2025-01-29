type LosePageProps = {
  setGameLost: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayGame: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LosePage({
  setGameLost,
  setDisplayGame,
}: LosePageProps) {
  function clickHandler() {
    setGameLost(false);
    setDisplayGame(true);
  }
  return (
    <div>
      <h1>{'You lost. Play again?'}</h1>
      <button onClick={clickHandler}>Play again</button>
    </div>
  );
}
