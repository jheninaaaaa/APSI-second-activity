import React from 'react';

function GameBoard({ tiles, revealed, onTileClick, columns, lastIncorrect }) {
  return (
    <div
      className="game-board"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {tiles.map((tile, index) => (
        <button
          key={index}
          className={`tile ${lastIncorrect === index ? 'incorrect' : ''}`}
          onClick={() => onTileClick(index)}
          disabled={revealed[index]}
        >
          {revealed[index] ? (
            <img src={tile.img} alt={tile.type} className="tile-img" />
          ) : (
            <span>{index + 1}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export default GameBoard;
