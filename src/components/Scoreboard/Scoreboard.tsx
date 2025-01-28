import { useState } from 'react';

type ScoreboardProps = {
  score: number;
  maxScore: number;
};

export default function Scoreboard({ score, maxScore }: ScoreboardProps) {
  const [highScore, setHighScore] = useState(0);
  if (score > highScore) {
    setHighScore(score);
  }

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
