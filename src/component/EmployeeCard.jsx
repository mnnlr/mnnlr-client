import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/EmployeeCard.css';

function EmployeeCard({ id,img, name, designation, level }) {
  const navigate = useNavigate();
  return (
    <div className="container" style = {{margin : 10, width : "305px"}}>
      <div className="profile" style = {{backgroundColor : 'white', height : "170px", borderRadius : "10px", display : 'block',  boxShadow : '0 8px 12px rgba(0, 0, 0, 0.2)' }}>
        <div className="image">
          <img src={img} alt="Profile" style={{ height: "100%", width: "100%", objectFit: "cover", borderRadius: "50%" }} />
        </div>
        <h2>{name}</h2>
        <p>{designation}</p>
        <p>Level : {level}</p>
        <button className="button2" onClick={()=>navigate(`/employee/${id}`)}>
          More info..
        </button>
      </div>
    </div>
  );
}

export default EmployeeCard;
