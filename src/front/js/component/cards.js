import React from 'react';
import '../../styles/cards.css'

export const Cards = () => {
  return (
    <div className="cards-container">
      <Card buttonText="Encontrar un servicio" />
      <Card buttonText="Ofrecer un servicio" />
    </div>
  );
}

const Card = ({ buttonText }) => {
  return (
    <div className="card">
      <button className='button'>{buttonText}</button>
    </div>
  );
}

export default Cards;