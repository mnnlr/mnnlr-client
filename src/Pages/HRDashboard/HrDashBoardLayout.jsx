import { Outlet } from 'react-router-dom';
import NavBar from '../../component/DashboardComponents/NavBar';
import { useState, useEffect } from 'react';
import '../../css/DashboardCss/DashboardLayout.css';
import HRSideNav from './HRSideNav';

const HRDashboardLayout = () => {
  const [isSideNavVisible, setIsSideNavVisible] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSideNavVisible(false); // Collapse the sidebar by default on small screens
      } else {
        setIsSideNavVisible(true); // Show sidebar on larger screens
        setIsSidebarCollapsed(false); // Ensure it's fully expanded on larger screens
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call the function initially to set the right state

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="dashboard-theme">
      <div className="dashboard-app-container">
        {isSideNavVisible && (
          <div
            className={`dashboard-side-nav ${isSidebarCollapsed ? 'collapsed' : ''}`}
          >
            <HRSideNav/>
          </div>
        )}
        <div className="dashboard-main-content">
          <NavBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HRDashboardLayout;
