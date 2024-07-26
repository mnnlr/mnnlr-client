import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import HeroSection from "./HeroSection";

const AboutSlider = () => {
  const slides = {
      image:
        "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "About Us",
      subtitle: "Welcome to The Digital Agency",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue. Aliquam ornare hendrerit augue.",
    }

  return (
    <div className="bg-white text-black h-full">
      <HeroSection Data={slides} />
    </div>
  );
};

export default AboutSlider;
