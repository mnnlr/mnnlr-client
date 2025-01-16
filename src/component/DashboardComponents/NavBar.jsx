import React, { useState, useEffect } from 'react';
import Breadcrumb from './BreadCrumb';
import Search from './Search';
import Icons from './Icons';
import '../../css/DashboardCss/Navbar.css';
import SideNav from './SideNav';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isIconsVisible, setIsIconsVisible] = useState(false);
  const [isSideNavVisible, setIsSideNavVisible] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 670); 
    setIsIconsVisible(false); 
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

  const toggleMobileIcons = () => {
    setIsIconsVisible(!isIconsVisible);
  };

  const toggleSideNav = () => {
    setIsSideNavVisible(!isSideNavVisible);
  };

  return (
    <nav className={`dashbord-navbar ${isScrolled ? 'dashbord-scrolled' : ''}`}>
      <div className="dashbord-navbar-content">
        <div className="dashbord-breadcrumb-container">
          <Breadcrumb />
        </div>
        {isMobileView ? (
          <>
            <button className="dashbord-navbar-toggler" onClick={toggleMobileIcons}>
              {isIconsVisible ? (
                <span>&times;</span>
              ) : (
                <span>&#9776;</span>
              )}
            </button>
            <div className={`dashbord-mobile-icons-container ${isIconsVisible ? 'dashbord-visible' : ''}`}>
              <Search />
              <Icons />
              <button className="dashbord-sidenav-toggler" onClick={toggleSideNav}>
                {isSideNavVisible ? (
                  <span>&times;</span>
                ) : (
                  <span>&#9776;</span>
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="dashbord-search-icons-container">
            <Search />
            <Icons />
          </div>
        )}
      </div>
      {isSideNavVisible && (
        <div className="dashbord-sidenav-container visible">
          <SideNav />
        </div>
      )}
    </nav>
  );
};

export default Navbar;

