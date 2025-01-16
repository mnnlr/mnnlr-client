import React from 'react';
import image from '../assets/logo4.jpg';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black/30 p-4">
      <img 
        src={image}
        alt="Loading" 
        className="w-32 h-32 mb-4 rounded-lg shadow-2xl md:w-40 md:h-40"
      />
      <p className="text-[#0c3032] mt-4 text-lg font-semibold animate-bounce text-center sm:text-xl md:text-2xl">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loading;
