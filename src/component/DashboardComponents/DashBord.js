import React from "react";
import { FaDollarSign } from "react-icons/fa";
import "../css/Dashbord.css";
import ActualCard from "./AcutualCard";
import EmployeeOverView from "./EmployeeOverView";
import { NavLink } from "react-router-dom";
import ActiveUsers from "./ActiveUsers"; 
import Table from "./Table";

function Dashboard() {
  const authors = [
    {
      name: "John Michael",
      email: "john@creative-tim.com",
      function: "Manager",
      subFunction: "Organization",
      status: "ONLINE",
      employed: "23/04/18",
    },
    {
      name: "Alexa Liras",
      email: "alexa@creative-tim.com",
      function: "Programator",
      subFunction: "Developer",
      status: "OFFLINE",
      employed: "11/01/19",
    },
    {
      name: "Laurent Perrier",
      email: "laurent@creative-tim.com",
      function: "Executive",
      subFunction: "Projects",
      status: "ONLINE",
      employed: "19/09/17",
    },
    {
      name: "Michael Levi",
      email: "michael@creative-tim.com",
      function: "Programator",
      subFunction: "Developer",
      status: "ONLINE",
      employed: "24/12/08",
    },
    {
      name: "Richard Gran",
      email: "richard@creative-tim.com",
      function: "Manager",
      subFunction: "Executive",
      status: "OFFLINE",
      employed: "04/10/21",
    },
    {
      name: "Miriam Eric",
      email: "miriam@creative-tim.com",
      function: "Programator",
      subFunction: "Developer",
      status: "OFFLINE",
      employed: "14/09/20",
    },
  ];

  return (
    <div>

      <div className="actual-card-container">
        <ActualCard />
      </div>

      <div className="card-container">
        <div className="card light-card">
          <div className="sh">
            <h2>Build by developers</h2>
            <h3>Soft UI Dashboard</h3>
            <p>
              From colors, cards, typography to complex elements, you will find
              the full documentation.
            </p>
            <NavLink to='' className="read-more">
              Read More →
            </NavLink>
          </div>
          <div className="rocket-image">
            <FaDollarSign />
          </div>
        </div>
        <div className="card dark-card">
          <h2>Work with the rockets</h2>
          <p>
            Wealth creation is an evolutionarily recent positive-sum game. It is
            all about who take the opportunity first.
          </p>
          <NavLink to='' className="read-more">
            Read More →
          </NavLink>
        </div>
        <div className="card light-card">
          <h2>Leave Application Form</h2>
          <p>Apply For Leave</p>
          <NavLink to={"/leaveform"} className="read-more">
            Apply
          </NavLink>
        </div>
        <div className="card dark-card">
          <h2>Leaves Attendance</h2>
          <p>There are so many leaves on there</p>
          <NavLink to="/leave" className="read-more">
            Read More →
          </NavLink>
        </div>
      </div>

      {/* Charts */}
      <div className="w-full flex flex-col md:flex-row md:space-x-20 space-y-10 md:space-y-0 mt-10 mb-10">
        <div className="w-full md:w-1/2 h-6">
          <ActiveUsers />
        </div>
        <div className="w-full md:w-3/4 mb-10">
          <EmployeeOverView />
        </div>
      </div>

      {/* Authors Table */}
      <Table 
        TableTitle={'Employees'}
        TableHeaderData={["Employee","Name", "Designation", "Status", "Employed","ACTION"]} 
        TableBodyData={authors} 
      />
    </div>
  );
}

export default Dashboard;
