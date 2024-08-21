import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Slider from "./Slider";

const ContactUsMain = () => {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Contact Us",
      subtitle: "Contact for Premium Business Services",
      description:
        "If you have any questions or would like to learn more about our services, please don't hesitate to reach out. We look forward to connecting with you!",
    },
    
  ];

  return (
    <div className="bg-white text-black h-full">
      <Slider Data={slides} />
    </div>
  );
};

export default ContactUsMain;
