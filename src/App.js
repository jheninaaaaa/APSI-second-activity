import React, { useState } from 'react';
import './App.css';

const TILE_COUNT = 36;
const GRID_COLUMNS = 6;

// Chickens and bananas (18 each)
const imageUrls = [
  ...Array(18).fill('https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768'),
  ...Array(18).fill('https://static.vecteezy.com/system/resources/thumbnails/006/325/752/small_2x/chicken-cartoon-colored-clipart-illustration-free-vector.jpg'),
];

const getTileType = (url) => url.includes('banana') ? 'banana' : 'chicken';

function getShuffledTiles() {
  const tiles = imageUrls.map((url) => ({
    img: url,
    type: getTileType(url),
  }));

  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }

  return tiles;
}

function App() {
  const [tiles, setTiles] = useState(getShuffledTiles());
  const [revealed, setRevealed] = useState(Array(TILE_COUNT).fill(false));
  const [lastIncorrect, setLastIncorrect] = useState(null);
  const [player, setPlayer] = useState('chicken');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [scores, setScores] = useState({ chicken: 0, banana: 0 });

  const handleTileClick = (index) => {
    if (revealed[index] || gameOver) return;

    const updatedRevealed = [...revealed];
    updatedRevealed[index] = true;
    setRevealed(updatedRevealed);

    const clickedTile = tiles[index];

    if (clickedTile.type !== player) {
      const opponent = player === 'chicken' ? 'banana' : 'chicken';
      setLastIncorrect(index);
      setWinner(opponent);
      setGameOver(true);

      setScores((prev) => ({
        ...prev,
        [opponent]: prev[opponent] + 1,
      }));
    } else {
      setScores((prev) => ({
        ...prev,
        [player]: prev[player] + 1,
      }));

      setPlayer((prev) => (prev === 'chicken' ? 'banana' : 'chicken'));
    }
  };

  const handleReset = () => {
    setTiles(getShuffledTiles());
    setRevealed(Array(TILE_COUNT).fill(false));
    setLastIncorrect(null);
    setPlayer('chicken');
    setGameOver(false);
    setWinner('');
    setScores({ chicken: 0, banana: 0 });
  };

  return (
    <div className="app-container">
      <h1 className="game-title">Chicken Banana Game!</h1>

      <div className="layout">
        <div className={`player-panel ${player === 'chicken' ? 'active' : 'inactive'}`}>
          <h2>Chicken</h2>
          <p>Score: {scores.chicken}</p>
        </div>

        <div className="grid" style={{ gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)` }}>
          {tiles.map((tile, index) => (
            <button
              key={index}
              onClick={() => handleTileClick(index)}
              disabled={revealed[index] || gameOver}
              className={`tile ${revealed[index] ? 'revealed' : ''} ${index === lastIncorrect ? 'incorrect' : ''}`}
            >
              {revealed[index] ? (
                <img src={tile.img} alt={tile.type} />
              ) : (
                <span>{index + 1}</span>
              )}
            </button>
          ))}
        </div>

        <div className={`player-panel ${player === 'banana' ? 'active' : 'inactive'}`}>
          <h2>Banana</h2>
          <p>Score: {scores.banana}</p>
        </div>
      </div>

      {gameOver && (
        <div className="overlay-screen">
          <h2>{winner.charAt(0).toUpperCase() + winner.slice(1)} Wins!</h2>
          <p>Chicken: {scores.chicken}</p>
          <p>Banana: {scores.banana}</p>
          <button onClick={handleReset}>Reset Game</button>
        </div>
      )}
    </div>
  );
}

export default App;