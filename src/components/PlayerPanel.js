import React from 'react';

function PlayerPanel({ type, image, score, active, onReset, resetState }) {
    function ResetButton({ clicked, onClick }) {
    return (
      <button className="reset-button" onClick={onClick}>
        reset ({clicked ? '1' : '0'}/2)
      </button>
    );
  }

  return (
    <div className={`player-panel ${active ? 'active' : 'inactive'}`}>
      <h3>{type.toUpperCase()}</h3>
      <img src={image} alt={type} className="player-img" />
      <p className="score">{score} score</p>
      <ResetButton clicked={resetState} onClick={onReset} />
    </div>
  );
}

export default PlayerPanel;
