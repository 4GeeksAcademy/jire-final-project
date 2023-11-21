import React from 'react';
import '../../styles/cards.css'
import {Card} from './card'

export const Cards = () => {
  return (

      <div className="cards-container">
        <Card buttonText="Encontrar un servicio" />
        <Card buttonText="Ofrecer un servicio" />
      </div>
    );
 
}

export default Cards;