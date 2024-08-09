import React from 'react'
import '../css/Service.css'

function Card({ icon, title })  {
    return (
        <div className="service-item">
          <span className="service-icon">{icon}</span>
          <h3>{title}</h3>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue.</p>
        </div>
      );
}

export default Card