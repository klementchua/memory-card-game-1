type ScoreboardProps = {
  score: number;
  highScore: number;
  maxScore: number;
};

export default function Scoreboard({
  score,
  highScore,
  maxScore,
}: ScoreboardProps) {
  return (
    <div>
      <span>
        Score: {score} / {maxScore}
      </span>
      <br />
      <span>
        High Score: {highScore} / {maxScore}
      </span>
    </div>
  );
}
