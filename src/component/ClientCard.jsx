import React from 'react';
import '../css/ClientCard.css';

function ClientCard({ name, color, imageUrl }) {
  return (
    <div className="card" style={{ '--color': color }}>
      <div className="image-container">
        <img 
          src={imageUrl} 
          alt={name} 
          className="image" 
        />
      </div>
      <h3 className="name">{name}</h3>
      <p className="description">
        Sample text: Click to select the text box. Click again or double click to start editing the text.
      </p>
    </div>
  );
}

export default ClientCard;
