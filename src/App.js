import React, { useState } from 'react';
import './App.css';
import PlayerPanel from './components/PlayerPanel';
import GameBoard from './components/GameBoard';
export const chicken = 'https://static.vecteezy.com/system/resources/previews/011/216/290/original/cartoon-cute-chicken-free-png.png';
export const banana = 'https://clipart-library.com/newimages/banana-clip-art-13.png';

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
  const [winner, setWinner] = useState('');
  const [scores, setScores] = useState({ chicken: 0, banana: 0 });
  const [player, setPlayer] = useState('');
  const [playerSelected, setPlayerSelected] = useState(false);

  // Select player and close overlay
  function selectPlayer(choice) {
    setPlayer(choice);
    setPlayerSelected(true);
  }

  const handleTileClick = (index) => {
    if (revealed[index] || winner) return;
    
    const updatedRevealed = [...revealed];
    updatedRevealed[index] = true;
    setRevealed(updatedRevealed);
    const clickedTile = tiles[index];

    if (clickedTile.type !== player) {
      setLastIncorrect(index);
      const opponent = player === 'chicken' ? 'banana' : 'chicken';
      setWinner(opponent);
      setScores(prev => ({
        ...prev,
        [opponent]: prev[opponent] + 1,
      }));
    } else {
      setScores(prev => ({
        ...prev,
        [player]: prev[player] + 1,
      }));
    }
  };

  // Reset game state
  const handleResetClick = () => {
    setTiles(getShuffledTiles());
    setRevealed(Array(TILE_COUNT).fill(false));
    setLastIncorrect(null);
    setWinner();
    setScores({ chicken: 0, banana: 0 });
    setPlayer('');
    setPlayerSelected(false); // show overlay again for player selection
  };

  // Reveal all tiles 
  const handleRevealClick = () => {
    setRevealed(Array(TILE_COUNT).fill(true));
  };

  return (
    <div className="app-container">
      <h1 className="game-title">Chicken Banana Game</h1>

      {/* Player selection overlay */}
      {!playerSelected && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>Choose Your Player</h2>
            <button onClick={() => selectPlayer('chicken')}>Chicken</button>
            <button onClick={() => selectPlayer('banana')}>Banana</button>
          </div>
        </div>
      )}

      <div className="game-layout">
        <PlayerPanel
          type="chicken"
          image={chicken}
          score={scores.chicken}
          active={player === 'chicken'}
          onReset={handleResetClick} 
          resetState={false} 
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
          onReset={handleResetClick}
          resetState={false} 
        />
      </div>

      <div className="bottom-controls">
          <button className="reset-btn" onClick={handleResetClick}>Reset Game</button>
          <button className="reveal-btn" onClick={handleRevealClick}>Reveal All</button>
      </div>

      {winner && (
        <div className='winner-overlay'>
          <div className='winner-overlay-content'>
            <h2>{winner.charAt(0).toLocaleUpperCase() + winner.slice(1)} WINS!</h2>
            <button onClick={handleResetClick}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
