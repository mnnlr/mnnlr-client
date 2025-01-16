import React from 'react';
import ServiceCard from './ServiceCard';

const OurServices = () => {
  const services = [
    {
      icon: '✏️', 
      title: 'Web Services',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue.'
    },
    {
      icon: '📐',
      title: 'App Development',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue.'
    },
    {
      icon: '📧',
      title: 'Digital Marketing',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue.'
    },
    {
      icon: '🧑‍🤝‍🧑',
      title: 'Social Media',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue.'
    },
    {
      icon: '🚀',
      title: 'E-Commerce Solution',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue.'
    },
    {
      icon: '📞',
      title: 'Help & Support',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue.'
    }
  ];

  return (
    <div className="bg-blue-100 py-12 sm:py-16 lg:py-20 mb-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16 lg:mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 sm:mb-8 lg:mb-10 mt-6 sm:mt-8 lg:mt-10">How can we help you?</h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quis fugit molestias adipisci possimus? Corrupti totam tempora praesentium culpa hic ex omnis consequatur. Quam rem reiciendis illum quisquam perspiciatis commodi.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8">
          {services?.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
