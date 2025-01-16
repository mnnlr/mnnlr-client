// src/Components/ProcessCard.js
import React from 'react';

const ProcessCard = ({ number, title, description }) => {
    return (
        <div className="p-6 rounded-lg ">
            <div className="text-9xl text-start text-gray-200 font-bold mb-4">{number}</div>
            <h3 className="text-2xl text-start font-bold mb-2 mt-[-6vh] text-[#12999F]">{title}</h3>
            <p className='text-start'>{description}</p>
        </div>
    );
};

export default ProcessCard;
