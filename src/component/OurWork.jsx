import React from "react";
import img from '../assets/logo4.jpg';

const OurWork = () => {
  return (
    <section className="py-12 bg-blue-50">
      <div className="container mx-auto px-4 text-center">
        <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-semibold italic text-gray-900 mb-8 mt-10">
          "Amazing Designs and Quality Work!"
        </blockquote>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8">
          At our core, we are driven by the passion to deliver cutting-edge digital solutions that exceed expectations. Our team is dedicated to bringing your vision to life with creativity and precision, ensuring that your business stands out in the digital landscape. Trust us to deliver unparalleled quality and innovation.
        </p>
        <div className="flex flex-col items-center mb-10">
          <img
            src={img}
            alt="Annand Anirudh"
            className="w-16 h-16 rounded-full mb-4"
          />
          <div className="text-center">
            <p className="font-bold text-lg sm:text-xl lg:text-2xl">
              Annand Anirudh
            </p>
            <p className="text-gray-500 text-sm sm:text-base">CEO, MNNLR</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurWork;
