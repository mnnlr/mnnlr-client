import { Outlet } from 'react-router-dom';
import NavBar from '../../component/DashboardComponents/NavBar';
import SideNav from '../../component/DashboardComponents/SideNav';
import { useState, useEffect } from 'react';
import '../../css/DashboardCss/DashboardLayout.css'; 

const DashboardLayout = () => {
  const [isSideNavVisible, setIsSideNavVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSideNavVisible(false);
      } else {
        setIsSideNavVisible(true);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="dashboard-theme">
      <div className="dashboard-app-container">
        {isSideNavVisible && (
          <div className="dashboard-side-nav">
            <SideNav />
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

export default DashboardLayout;
