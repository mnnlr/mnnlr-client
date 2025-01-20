import React, { useState, useEffect } from 'react';
import Breadcrumb from './BreadCrumb';
import '../../css/DashboardCss/Navbar.css';
import SideNav from './SideNav';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isSideNavVisible, setIsSideNavVisible] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 670);
    setIsSideNavVisible(false); // Reset SideNav visibility on resize
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSideNav = () => {
    setIsSideNavVisible(!isSideNavVisible); // Toggle side navigation visibility
  };

  return (
    <nav className={`dashbord-navbar ${isScrolled ? 'dashbord-scrolled' : ''}`}>
      <div className="dashbord-navbar-content flex justify-between items-center w-full">
        <div className="dashbord-breadcrumb-container">
          <Breadcrumb />
        </div>

        {/* Mobile view */}
        {isMobileView ? (
          <>
            {/* Toggle side navigation */}
            <button
              className="dashbord-navbar-toggler md:hidden"
              onClick={toggleSideNav}
            >
              {isSideNavVisible ? <span>&times;</span> : <span>&#9776;</span>}
            </button>
          </>
        ) : (
          <div className="dashbord-search-icons-container flex items-center">
            {/* You can add any additional elements here for larger screens */}
          </div>
        )}
      </div>

      {/* SideNav for mobile */}
      {isSideNavVisible && (
        <div className="dashbord-sidenav-container visible md:hidden">
          <SideNav />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
