import React from 'react';
import mnnlrlogo from '../assets/logo4.jpg'

const OurCustomers = () => {
  const customers = [
    { id: 2, logo: 'https://png.pngtree.com/template/20190316/ourmid/pngtree-insurance-logo-vector-image_80257.jpg', title: 'I-insure' },
    { id: 1, logo: 'https://png.pngtree.com/png-clipart/20191122/original/pngtree-diwali-sale-festival-banner-design-template-png-image_5172854.jpg', title: 'Diwali Shopping' },
    { id: 3, logo: mnnlrlogo, title: 'MNNLR' },
    { id: 4, logo: 'https://s3-alpha.figma.com/hub/file/2803917671/44684719-217d-4a19-af7f-9dbe77d60128-cover.png', title: 'Web Development' },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold mb-6 sm:mb-8 md:mb-10">Our Customers</h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-xl mb-6 sm:mb-8 md:mb-10 text-gray-600">
        We are a product-based IT company specializing in innovative solutions to enhance business productivity and efficiency. Our team is dedicated to delivering high-quality designs and exceptional service.
        </p>
        <div className="flex flex-wrap justify-center items-center">
          {customers.map((customer) => (
            <div key={customer.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <div className="flex flex-col items-center">
                <img src={customer.logo} alt={`${customer.title} logo`} className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 mb-4"/>
                <p className="text-base sm:text-lg md:text-xl lg:text-lg w-7/12">{customer.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurCustomers;
