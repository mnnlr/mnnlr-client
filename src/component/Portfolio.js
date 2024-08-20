import React from 'react';
import '../css/Portfolio.css'; // Import your CSS file

import img1 from '../assets/p1.jpg';
import img2 from '../assets/P2.jpg';
import img3 from '../assets/P3.jpg';
import img4 from '../assets/P4.jpg';

const portfolioItems = [
    { id: 1, image: img1, alt: 'Design sketches on a wall' },
    { id: 2, image: img2, alt: 'Smartphone with notes and coffee' },
    { id: 3, image: img3, alt: 'Laptop with code on screen' },
    { id: 4, image: img4, alt: 'Desk setup with laptop and plant' },
];

const customer = [
    { id: 1, alt: 'Design sketches on a wall' },
    { id: 2, alt: 'Smartphone with notes and coffee' },
    { id: 3, alt: 'Laptop with code on screen' },
    { id: 4,  alt: 'Desk setup with laptop and plant' },
];

function Portfolio() {
    return (
        <div>
            <section className="portfolio">
                <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold mb-6 sm:mb-8 md:mb-10'>Portfolio</h2>
                <p className="portfolio-description">
                We serve a diverse range of clients, including leaders in insurance, retail, festive shopping, and web development.
                </p>
                <div className="portfolio-grid">
                    {portfolioItems.map((item) => (
                        <div key={item.id} className="portfolio-item">
                            <img src={item.image} alt={item.alt} />
                        </div>
                    ))}
                </div>
                <button className="explore-more  shadow-xl">EXPLORE MORE</button>
            </section>

            {/* <section className="portfolio" style={{ textAlign: 'center' }}>
                <h2>Our Customers</h2>
                <p style={{ marginBottom: '50px', width: '40%', margin: 'auto' }}>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo.
                    Praesent mattis commodo augue.
                </p>
                <div className="customers-grid">
                    {customer.map((item) => (
                        <div key={item.id} className="customer-item">
                            <div className="customer-content">
                                
                                <h3>{item.alt}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section> */}
        </div>
    );
}

export default Portfolio;

