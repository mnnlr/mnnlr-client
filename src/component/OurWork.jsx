import React from "react";

const OurWork = () => {
  return (
    <section className="py-12 bg-blue-50">
      <div className="container mx-auto px-4 text-center">
        <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-semibold italic text-gray-900 mb-8 mt-10">
          "Amazing Designs and Quality Work!"
        </blockquote>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At
          voluptatibus consequatur fugiat ullam voluptatum veritatis sequi harum
          eum doloremque repellendus? Pariatur expedita beatae nesciunt
          accusamus illum eos commodi ducimus voluptas.
        </p>
        <div className="flex flex-col items-center mb-10">
          <img
            src="https://media-del2-1.cdn.whatsapp.net/v/t61.24694-24/438801814_2626423667537826_7681033577023385378_n.jpg?ccb=11-4&oh=01_Q5AaIFPwr8mqCQoqsGM8HGVwIjyq5cTed-wqAPXS2LKwdlq9&oe=6690C61E&_nc_sid=e6ed6c&_nc_cat=110"
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
