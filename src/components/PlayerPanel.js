import React from 'react';
import ResetButton from './ResetButton';

function PlayerPanel({ type, image, score, active, onReset, resetState }) {
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
