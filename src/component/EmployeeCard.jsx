import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/customButton.css';

function EmployeeCard({ id, img, name, designation, level}) {
  const navigate = useNavigate();

  return (
    <div className="bg-light-green p-6 rounded-lg shadow-lg flex flex-col items-center">
      <div className=" w-auto flex justify-between items-center mb-2">
        <div className="flex flex-col items-center ">
          <div className="relative w-28 h-28 bg-custom-green rounded-full flex items-center justify-center mb-4">
            <img
              alt="Profile"
              className="rounded-full w-24 h-24 object-cover"
              src={img}
            />
       
          </div>
          <h2 className="text-xl font-bold text-custom-green">{name}</h2>
          <p className="text-gray-600 text-center">{designation}</p> 
          <p className="text-gray-600">Level: {level}</p>
        </div>
      </div>
      <button
        className=" custom-button"
        onClick={() => navigate(`/employee/${id}`)}
      >
        More Info..
        <div class="arrow-wrapper">
        <div class="arrow"></div>
        </div>
      </button>
    </div>
  );
}

export default EmployeeCard;
