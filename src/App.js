import React, { useState } from 'react';
import './App.css';
import chickenImage from 'https://static.vecteezy.com/system/resources/thumbnails/006/325/752/small_2x/chicken-cartoon-colored-clipart-illustration-free-vector.jpg'
import bananaImage from 'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768'

const tile_count = 36
const chicken_display = chickenImage
const banana_display = bananaImage
const grid_columns = 6
const tile_size = 100

function getShuffledTiles () {
  const tiles = [
    ...Array(18).fill().map(chicken_display),
    ...Array(18).fill().map(banana_display)
  ]

  for (let i = tiles.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i+1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  return tiles;
}

function App() {
  const [tiles, setTiles] = useState(getShuffledTiles());
  const [revealed, setRevealed] = useState(Array(tile_count).fill(false));
  const [lastIncorrect, setLastIncorrect] = useState(Array(tile_count).fill(false));
  const [player, setPlayer] = useState('chicken');
  const [gameOver, setGameOver] = useState(false);
  const [setWinner] = useState('');
  const [scores, setScores] = useState({chicken: 0, banana: 0});
  /**const getRemainingTiles = (type) => {
    return tiles.filter((tiles, i) => tiles.type === type && !revealed[i]).length;
  }
  const chickenLeft = getRemainingTiles('chicken');
  const bananaLeft = getRemainingTiles('banana');*/
  const getCurrentPlayerImage = () => {
    return player === 'chicken' ? chicken_display : banana_display;
  }
  const handleTileClick = (i) => {
    if (revealed[i] || gameOver) return;

    const newRevealed = [...revealed];
    newRevealed[i] = true;
    setRevealed(newRevealed);

    if (tiles[i].type !== player) {
      setLastIncorrect(i);
      const nextPlayer = player === 'chicken' ? 'banana': 'chicken';
      setPlayer(nextPlayer);

      const winner = nextPlayer.charAt(0).toUpperCase()+nextPlayer.slice(1);
      setWinner(winner);
      setGameOver(true);

      setScores(prev => ({
        ...prev, [nextPlayer]: prev[nextPlayer] + 1
      }));
    }

    setScores(prev => ({
      ...prev, [player]: prev[player] + 1
    }));

    setPlayer(prev => prev === 'chicken' ? 'banana': 'chicken');
  };

  const handleRestart = () => {
    setTiles(getShuffledTiles());
    setRevealed(Array(tile_count).fill(false));
    setLastIncorrect(null);
    setPlayer('chicken');
    setGameOver(false);
    setWinner('');
    setScores({chicken: 0, banana: 0});
  };

  return (
    <div className="container">
      <div className="info-section">
        <div className="score-display">
          <h3 className="section-title">Score Board</h3>
          <div className="score-items">
            <div className="score-item">
              <span className="score-chicken">Chicken</span>
              <span className="score-value"></span>{scores.chicken}<span/>
            </div>
            <div className="score-item">
              <span className="score-banana">Banana</span>
              <span className="score-value"></span>{scores.banana}<span/>
            </div>
          </div>
        </div>

      <div className="game-status">
        <h3 className="section-title">Game Status</h3>
        <div className="game-status-content">
          <p>Two players: <b>Chicken</b> and <b>Banana</b></p>
          {gameOver ? (
            <div className="winner-message">
              <img
                src={player === 'chicken' ? chicken_display : banana_display}
                alt=""
                className="player-icon"
                aria-hidden="true"
              />
              <span style={{ color: 'green' }}>{player.charAt(0).toUpperCase() + player.slice(1)} Wins!</span>
            </div>
            ) : (
              <div className="current-player">
                <img
                  src={getCurrentPlayerImage()}
                  alt=""
                  className="player-icon"
                  aria-hidden="true"
                />
                <span>{player.charAt(0).toUpperCase() + player.slice(1)}'s Turn</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="game-section">
        <div className="grid" style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${grid_columns}, ${tile_size}px)`,
          gap: '8px',
          justifyContent: 'center'
        }}>
          {tiles.map((tile, index) => (
            <button
              key={index}
              className="grid-tile"
              style={{
                width: tile_size,
                height: tile_size,
                background: revealed[index] ? '#f0f0f0' : '#ddd',
                border: '2px solid #aaa',
                cursor: gameOver || revealed[index] ? 'not-allowed' : 'pointer',
                padding: 0,
              }}
              onClick={() => handleTileClick(index)}
              disabled={gameOver || revealed[index]}
              data-incorrect={index === lastIncorrect}
            >
              {revealed[index] ? (
                <img src={tile.img} alt={tile.type} style={{ width: '90%', height: '90%' }} />
              ) : (
                <span style={{ fontSize: 18 }}>{index + 1}</span>
              )}
            </button>
          ))}
        </div>

        <button className="restart-button" onClick={handleRestart}> Reset</button>
      </div>
    </div>
  );
}
        
export default App;