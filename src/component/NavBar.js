import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';

import { useSelector } from 'react-redux';
import ProfileIcon from './ProfileIcon';
import EmployeeButton from './EmployeeButton';

function NavBar() {
  const [scrollPosition, setScrollPosition] = useState(1);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const {user} = useSelector(state => state.login);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset+1;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className={`navbar ${scrollPosition > 0 ? 'scrolled' : ''}`}>
      <div className="navbar-logo">DIGITAL AGENCY</div>
      <div className={`navbar-links ${isNavOpen ? 'open' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
        {user?.role === 'admin'&&<EmployeeButton user={user} />}
        <div><ProfileIcon/></div>
      </div>
      <button className="navbar-toggle-btn" onClick={toggleNav}>☰</button>
    </nav>
  );
}

export default NavBar;
