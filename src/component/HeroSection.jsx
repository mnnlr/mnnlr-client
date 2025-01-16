import React from 'react';
import '../css/Contact.css'; // You'll need to create this CSS file for styling

const HeroSection = ({Data}) => {
  return (
    <div className="other-contact-page">
      <section className="other-hero" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <h1>{Data?.title?Data?.title:'jlk'}</h1>
        <h2>{Data?.subtitle?Data?.subtitle:'df'}</h2>
        <p>
            {Data?.description?Data?.description:'sdf'}
        </p>
      </section>
    </div>
  );
};

export default HeroSection;
