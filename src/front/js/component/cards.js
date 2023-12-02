import React from 'react';
import '../../styles/cards.css'
import { Link } from 'react-router-dom';

export const Cards = () => {
  return (
      <div className="cards-container">
        <div className="card-buttons">
        <Link to='/ofertas'><button className="button-card">Encontrar un servicio</button></Link>
      </div>
      <div className="card-buttons">
        <Link to='/solicitudes'><button className="button-card">Ofrecer un servicio</button></Link>
      </div>
      </div>
    );
 
}

export default Cards;