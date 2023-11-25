import React from 'react';

export const Card = ({ buttonText }) => {
    return (
      <div className="card-buttons">
        <button class="button-card">{buttonText}</button>
      </div>
  );
}