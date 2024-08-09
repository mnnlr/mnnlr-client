import React from 'react';
import '../css/Contact.css'; // You'll need to create this CSS file for styling

const HeroSection = ({Data}) => {
  return (
    <div className="other-contact-page">
      <section className="other-hero" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <h1>{Data?.title?Data?.title:'Contact Us'}</h1>
        <h2>{Data?.subtitle?Data?.subtitle:'Contact for Premium Business Services'}</h2>
        <p>
            {Data?.description?Data?.description:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue. Aliquam ornare hendrerit augue.'}
        </p>
      </section>
    </div>
  );
};

export default HeroSection;
