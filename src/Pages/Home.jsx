import React, { useState, useEffect, Suspense, lazy } from "react";
import Portfolio from "../component/Portfolio";
import img1 from "../assets/Hero.jpg";
import img3 from "../assets/Heroimg1.jpg";
import img4 from "../assets/Heroimg2.jpg";
import "../css/Home.css";

const Service = lazy(() => import("../component/Service"));
// const Portfolio = lazy(() => import('../component/Portfolio'));
const Ceo = lazy(() => import("../component/Ceo"));
const WorkWithUs = lazy(() => import("../component/WorkWithUs"));
const OurCustomers = lazy(() => import("../component/OurCustormers"));

function Home() {
  const images = [img1, img3, img4];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      <main
        className="hero home"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      >
        <h2>Innovative Product Solutions</h2>
        <h1>Empower Your Business with Our Cutting-Edge Products</h1>
        <p>
          Our products are designed to streamline your operations, enhance
          productivity, and drive success. Explore our range of innovative
          solutions tailored to meet the unique needs of your business.
        </p>
        <div>
          <button className="button">Get Started</button>
        </div>
      </main>
      <Suspense fallback={<div>Loading...</div>}>
        <Service />
      </Suspense>
      <Portfolio />
      <Suspense fallback={<div>Loading...</div>}>
        <OurCustomers />
        <Ceo />
        <div className="bg-blue-50 pt-10 pb-20">
          <WorkWithUs />
        </div>
      </Suspense>
    </div>
  );
}

export default Home;
