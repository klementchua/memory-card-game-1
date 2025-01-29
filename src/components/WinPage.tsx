type WinPageProps = {
  setGameWon: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayTitlePage: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function WinPage({
  setGameWon,
  setDisplayTitlePage,
}: WinPageProps) {
  function clickHandler() {
    setGameWon(false);
    setDisplayTitlePage(true);
  }
  return (
    <div>
      <h1>{'You win! :D'}</h1>
      <button onClick={clickHandler}>Go back to title page</button>
    </div>
  );
}
