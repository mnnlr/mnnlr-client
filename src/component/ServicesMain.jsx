import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Slider from "./Slider";

const ServicesMain = () => {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Services",
      subtitle: "We provide a comprehensive range of web development services.",
      description:
        "From designing visually stunning and user-friendly interfaces to developing robust and scalable web applications, our team ensures your digital presence stands out. Whether you need strategic insights, secure payment integrations, or reliable support, we deliver solutions tailored to your business needs.",
    },
    {
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Services",
      subtitle: "We offer specialized services to elevate your digital presence.",
      description:
        "Crafting visually appealing and user-centric designs to enhance your brand's identity and engage your audience effectively.",
    },
    {
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Services",
      subtitle: "We provide a comprehensive range of web development services.",
      description:
        "From designing visually stunning and user-friendly interfaces to developing robust and scalable web applications, our team ensures your digital presence stands out. Whether you need strategic insights, secure payment integrations, or reliable support, we deliver solutions tailored to your business needs.",
    },
  ];

  return (
    <div className="bg-white text-black h-full">
      <Slider Data={slides} />
    </div>
  );
};

export default ServicesMain;
