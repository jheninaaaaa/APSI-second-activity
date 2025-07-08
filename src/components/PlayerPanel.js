import React from 'react';

function PlayerPanel({ type, image, score, active}) {
  return (
    <div className={`player-panel ${active ? 'active' : 'inactive'}`}>
      <h3>{type.toUpperCase()}</h3>
      <img src={image} alt={type} className="player-img" />
      <p className="score">{score} score</p>
    </div>
  );
}

export default PlayerPanel;
