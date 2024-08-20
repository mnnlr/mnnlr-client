import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';

import { useSelector } from 'react-redux';
import ProfileIcon from './ProfileIcon';
import EmployeeButton from './EmployeeButton';
import logo from '../assets/logo4.jpg';

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

  const handleLinkClick = () => {
    setIsNavOpen(false);
  };

  return (
    <nav className={`navbar ${scrollPosition > 0 ? 'scrolled' : ''}`}>
      <div className="navbar-logo">
        <img src={logo} alt='logo' className='w-16 h-16 rounded-full p-1'/>
       MNNLR</div>
      <div className={`navbar-links ${isNavOpen ? 'open' : ''}`}>
      <Link to="/"onClick={handleLinkClick}> Home</Link>
        <Link to="/about" onClick={handleLinkClick}>About</Link>
        <Link to="/services" onClick={handleLinkClick}>Services</Link>
        <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
        {user?.role === 'admin'&&<EmployeeButton user={user} />}
        <div><ProfileIcon/></div>
      </div>
      <button className="navbar-toggle-btn" onClick={toggleNav}>
      {isNavOpen ? <span>&#10006;</span> : <span>☰</span>}
      </button>
    </nav>
  );
}

export default NavBar;
