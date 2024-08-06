import React from 'react'
import '../css/Service.css'
import Card from './Card';
import ServiceCard from './ServiceCard';
function Service() {
    const serviceItems = [
        { icon: '✏️', title: 'Design', description: 'Crafting visually stunning and user-friendly interfaces to enhance user experience.' },
        { icon: '🖥️', title: 'Development', description: 'Building robust and scalable websites tailored to your business needs.' },
        { icon: '📈', title: 'Marketing', description: 'Driving growth through targeted and effective digital marketing strategies.' },
        { icon: '💡', title: 'Strategy', description: 'Providing actionable insights and strategies to help your business succeed.' },
        { icon: '💳', title: 'Payments', description: 'Integrating secure and efficient payment solutions for seamless transactions.' },
        { icon: '👤', title: 'Support', description: 'Offering reliable and responsive support to ensure your operations run smoothly.' },
      ];
  return (
    <section className="services">
      <h2>How can we help you?</h2>
      <p className="services-description">We specialize in web development that elevates your online presence and drives business growth. Our tailored solutions ensure your website stands out and performs optimally. </p>
      <div className="services-grid">
        {serviceItems.map((item, index) => (
          <div key={index}>
            <Card icon={item.icon} title = {item.title} description={item.description}/>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Service