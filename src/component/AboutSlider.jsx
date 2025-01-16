import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import AboutUsMain from "./AboutUsMain";
import HeroSection from "./HeroSection";
import ContactUsMain from "./ContactUsMain";

const AboutSlider = () => {
  const slides = {
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "About Us",
    subtitle: "Empowering Your Digital Presence",
    description:
      "We specialize in creating stunning websites and robust web applications that help businesses thrive online. Our team of experienced developers and designers work closely with clients to deliver customized solutions that meet their unique needs. From concept to launch, we ensure your digital experience is seamless and impactful.",
  };

  return (
    <div className="bg-white text-black h-full">
      {/* <HeroSection Data={slides} /> */}
      {/* <ContactUsMain/> */}
      <AboutUsMain/>
    </div>
  );
};

export default AboutSlider;
