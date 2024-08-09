import React from "react";
import OurCustomers from "../component/OurCustormers";
import OurWork from "../component/OurWork";
import ServicesMain from "../component/ServicesMain";
import Service from "../component/Service";
import WorkWithUs from "../component/WorkWithUs";

const Services = () => {
  return (
    <div>
      <ServicesMain />
      <Service/>
      <OurCustomers/>
      <OurWork/>
      <div className="bg-blue-50 pt-10 pb-20">
        <WorkWithUs />
      </div>
    </div>
  );
};

export default Services;
