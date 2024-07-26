import React, { useState, useEffect } from 'react';
import Portfolio from '../component/Portfolio';

import img1 from '../assets/Hero.jpg';
// import img2 from '../assets/Heroimage.jpg';
import img3 from '../assets/Heroimg1.jpg';
import img4 from '../assets/Heroimg2.jpg';

import Service from '../component/Service';
import Ceo from '../component/Ceo';

import '../css/Home.css';
import WorkWithUs from '../component/WorkWithUs';

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
      <main className="hero home" style={{ backgroundImage: `url(${images[currentImage]})` }}>
        <h2>Fastest And Most Lightweight WP Theme</h2>
        <h1>Create Amazing Business Websites</h1>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue.</p>
        <div>
          <button className="button">Get Started</button>
        </div>
      </main>
      <Service />
      <Portfolio />
      <Ceo />
      <div className="bg-blue-50 pt-10 pb-20">
        <WorkWithUs />
      </div>
    </div>
  );
}

export default Home;
