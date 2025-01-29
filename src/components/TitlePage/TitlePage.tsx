type TitlePageProps = {
  setDifficulty: React.Dispatch<React.SetStateAction<number>>;
  setDisplayGame: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayTitlePage: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TitlePage({
  setDifficulty,
  setDisplayGame,
  setDisplayTitlePage,
}: TitlePageProps) {
  function clickHandler(length: number): void {
    setDifficulty(length);
    setDisplayGame(true);
    setDisplayTitlePage(false);
  }

  return (
    <div>
      <h1>Welcome to PokeMind! Choose a difficulty level.</h1>
      <div className="buttonContainers">
        <button
          onClick={() => {
            clickHandler(5);
          }}
        >
          Easy
        </button>
        <button
          onClick={() => {
            clickHandler(10);
          }}
        >
          Medium
        </button>
        <button
          onClick={() => {
            clickHandler(15);
          }}
        >
          Hard
        </button>
      </div>
    </div>
  );
}
