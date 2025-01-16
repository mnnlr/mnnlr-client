import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Slider from "./Slider";

const CareerMain = () => {
    const slides =[ {
        image:
          "	https://mnnlr-e2600.web.app/static/media/hiring.0e83a600899c47e21102.jpg",
        title: "Careers Page MNNLR",
        subtitle: "For more about careers",
        description:
          "We are hiring talented candidates",
          button: 'true',
      },
    ]

  return (
    <div className="bg-white text-black h-full">
      <Slider Data={slides} />
    </div>
  );
};

export default CareerMain;
