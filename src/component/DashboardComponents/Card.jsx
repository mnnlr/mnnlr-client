import React from 'react';

const Card = ({ title, amount, percentage, icon: Icon, bgColorFrom, bgColorTo, textsize }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md cursor-pointer" style={{ width: '250px', margin: "20px" }}>
      <div className="flex-grow">
        <p className="text-gray-500 flex font-bold text-sm">{title}</p>
        <div className="flex items-baseline">
          <h2 className={`text-${textsize} } font-bold`}>{amount}</h2>
          <span className="text-green-500 ml-2">{percentage}</span>
        </div>
      </div>
      {Icon && <div className={`bg-gradient-to-r ${bgColorFrom} ${bgColorTo} p-4 rounded-full text-white`}>
        <Icon />
      </div>}
    </div>
  );
};

export default Card;
