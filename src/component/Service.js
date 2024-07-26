import React from 'react'
import '../css/Service.css'
import Card from './Card';
function Service() {
    const serviceItems = [
        { icon: '✏️', title: 'Design', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue.' },
        { icon: '🖥️', title: 'Development', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue.' },
        { icon: '📈', title: 'Marketing', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue.' },
        { icon: '💡', title: 'Strategy', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue.' },
        { icon: '💳', title: 'Payments', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue.' },
        { icon: '👤', title: 'Support', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue.' },
      ];
  return (
    <section className="services">
      <h2>How can we help you?</h2>
      <p className="services-description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue.</p>
      <div className="services-grid">
        {serviceItems.map((item, index) => (
          <div key={index}>
            <Card icon={item.icon} title = {item.title}/>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Service