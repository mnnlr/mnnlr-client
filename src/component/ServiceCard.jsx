import React from 'react';

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 text-left h-auto">
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-blue-500 mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
        {icon}
      </div>
      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 text-blue-500">
        {title}
      </h3>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;
