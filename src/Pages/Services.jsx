import React from "react";
import OurCustomers from "../component/OurCustormers";
import ServicesMain from "../component/ServicesMain";
import Service from "../component/Service";
import WorkWithUs from "../component/WorkWithUs";
import Ceo from "../component/Ceo";

const Services = () => {
  return (
    <div>
      <ServicesMain />
      <Service/>
      <OurCustomers/>
      <Ceo/>
      <div className="bg-blue-50 pt-10 pb-20">
        <WorkWithUs />
      </div>
    </div>
  );
};

export default Services;
