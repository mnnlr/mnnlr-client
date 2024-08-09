import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";

const Slider = ({Data}) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setLoaded(true);
      }, 500); 
  
      return () => clearTimeout(timeout);
    }, []);

    return (
    <Carousel
        showThumbs={false}
        infiniteLoop
        useKeyboardArrows
        autoPlay
        showArrows={false}
        showIndicators={false}
        showStatus={false}
        autoFocus={true}
      >
        {Data.map((slide, index) => (
          <div key={index} className={`transition-opacity duration-1000 mt-20  ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[80vh] object-cover"
            />
            <div className="absolute inset-0 flex bg-[#293264b3] flex-col justify-center items-center bg-black bg-opacity-50 text-white px-4">
              <h1 className="text-2xl sm:text-xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10">
                {slide.title}
              </h1>
              <p className="text-xl sm:text-md md:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 md:mb-8 lg:mb-10">
                {slide.subtitle}
              </p>
              <p className="text-base sm:text-base md:text-sm lg:text-xl text-center w-7/12">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    )
}

export default Slider;