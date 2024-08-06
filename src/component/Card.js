import React from 'react'
import '../css/Service.css'

function Card({ icon, title, description })  {
    return (
        <div className="service-item">
          <span className="service-icon">{icon}</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      );
}

export default Card