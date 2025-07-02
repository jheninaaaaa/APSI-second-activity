import React, { useState } from 'react';
import './App.css';
import PlayerPanel from './components/PlayerPanel';
import GameBoard from './components/GameBoard';
import { chicken, banana } from './assets/images';

const TILE_COUNT = 36;
const GRID_COLUMNS = 6;

function getShuffledTiles() {
  const chickenTiles = Array(18).fill(null).map(() => ({
    img: chicken,
    type: 'chicken',
  }));

  const bananaTiles = Array(18).fill(null).map(() => ({
    img: banana,
    type: 'banana',
  }));

  const allTiles = [...chickenTiles, ...bananaTiles];

  for (let i = allTiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allTiles[i], allTiles[j]] = [allTiles[j], allTiles[i]];
  }

  return allTiles;
}

function App() {
  const [tiles, setTiles] = useState(getShuffledTiles());
  const [revealed, setRevealed] = useState(Array(TILE_COUNT).fill(false));
  const [lastIncorrect, setLastIncorrect] = useState(null);
  const [player, setPlayer] = useState('chicken');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [scores, setScores] = useState({ chicken: 0, banana: 0 });
  const [resetClicks, setResetClicks] = useState({ chicken: false, banana: false });

  const handleTileClick = (index) => {
    if (revealed[index] || gameOver) return;

    const updatedRevealed = [...revealed];
    updatedRevealed[index] = true;
    setRevealed(updatedRevealed);

    const clickedTile = tiles[index];

    if (clickedTile.type !== player) {

      setLastIncorrect(index);
      const opponent = player === 'chicken' ? 'banana' : 'chicken';
      setWinner(opponent);
      setGameOver(true);

      setScores(prev => ({
        ...prev,
        [opponent]: prev[opponent] + 1,
      }));
    } else {

      setScores(prev => ({
        ...prev,
        [player]: prev[player] + 1,
      }));

      setPlayer(prev => (prev === 'chicken' ? 'banana' : 'chicken'));
    }
  };

  const handleResetClick = (playerId) => {
    const updatedClicks = { ...resetClicks, [playerId]: true };
    setResetClicks(updatedClicks);

    if (updatedClicks.chicken && updatedClicks.banana) {
      setTiles(getShuffledTiles());
      setRevealed(Array(TILE_COUNT).fill(false));
      setLastIncorrect(null);
      setPlayer('chicken');
      setGameOver(false);
      setWinner('');
      setScores({ chicken: 0, banana: 0 });
      setResetClicks({ chicken: false, banana: false });
    }
  };

  return (
    <div className="app-container">
      <h1 className="game-title">MineSweeper</h1>
      <div className="game-layout">
        <PlayerPanel
          type="chicken"
          image={chicken}
          score={scores.chicken}
          active={player === 'chicken'}
          onReset={() => handleResetClick('chicken')}
          resetState={resetClicks.chicken}
        />

        <GameBoard
          tiles={tiles}
          revealed={revealed}
          onTileClick={handleTileClick}
          columns={GRID_COLUMNS}
          lastIncorrect={lastIncorrect}
        />

        <PlayerPanel
          type="banana"
          image={banana}
          score={scores.banana}
          active={player === 'banana'}
          onReset={() => handleResetClick('banana')}
          resetState={resetClicks.banana}
        />
      </div>

      {gameOver && (
        <div className="overlay-screen winner-screen">
          <h1>{winner.charAt(0).toUpperCase() + winner.slice(1)} Wins!</h1>
          <div className="score-display">
            <p>Chicken: {scores.chicken}</p>
            <p>Banana: {scores.banana}</p>
          </div>
          <button onClick={() => {
            setTiles(getShuffledTiles());
            setRevealed(Array(TILE_COUNT).fill(false));
            setLastIncorrect(null);
            setPlayer('chicken');
            setGameOver(false);
            setWinner('');
            setScores({ chicken: 0, banana: 0 });
            setResetClicks({ chicken: false, banana: false });
          }}>
            Reset
          </button>
        </div>
      )}
      <div>

      </div>
    </div>
  );
}

export default App;
