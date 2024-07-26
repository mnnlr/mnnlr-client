import { useRef } from "react";
import { NavLink } from "react-router-dom";

import ActualCard from "../../component/DashboardComponents/AcutualCard";
import EmployeeOverView from "../../component/DashboardComponents/EmployeeOverView";
import ActiveUsers from "../../component/DashboardComponents/ActiveUsers"; 

import "../../css/DashboardCss/DashboardHome.css";
import EmployeeTable from "../../component/DashboardComponents/EmployeeTable";

function Dashboard() {
  const employeeTableRef = useRef(null);

  const focusEmployeeTable = () => {
    employeeTableRef.current.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <div>

      <div className="dashboard-actual-card-container">
        <ActualCard empFun={focusEmployeeTable} />
      </div>

      <div className="dashboard-card-container">
        <div className="dashboard-card dashboard-light-card">
          <h2>New Applicant</h2>
          <p>Review the latest applications from candidates.</p>
          <NavLink to="/dashboard/new-applicants" className="dashboard-read-more">
            Review →
          </NavLink>
        </div>
        <div className="dashboard-card dashboard-dark-card">
          <h2>Manage Candidates Leave</h2>
          <p>
            Manage and track the leave status of candidates. Ensure smooth workflow
            by staying informed about who is currently on leave.
          </p>
          <NavLink to='/dashboard/track-leave' className="dashboard-read-more">
            Track Leave →
          </NavLink>
        </div>
        <div className="dashboard-card dashboard-light-card">
          <h2>Track Leaves</h2>
          <p>There are so many leaves to Track</p>
          <NavLink to="/dashboard/candidates-on-leave" className="dashboard-read-more">
            Track →
          </NavLink>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row md:space-x-20 space-y-10 md:space-y-0 mt-10 mb-10">
        <div className="w-full md:w-1/2 h-6">
          <ActiveUsers />
        </div>
        <div className="w-full md:w-3/4 mb-10">
          <EmployeeOverView />
        </div>
      </div>

      <div ref={employeeTableRef}>
        <EmployeeTable />
      </div>
    </div>
  );
}

export default Dashboard;
