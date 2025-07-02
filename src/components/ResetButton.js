import React from 'react';

function ResetButton({ clicked, onClick }) {
  return (
    <button className="reset-button" onClick={onClick}>
      reset ({clicked ? '1' : '0'}/2)
    </button>
  );
}

export default ResetButton;
