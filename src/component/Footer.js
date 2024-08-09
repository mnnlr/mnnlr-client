import React from 'react';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'; // Import icons from 'react-icons/fa'

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgb(36, 42, 86)', background: 'rgb(36, 42, 86)', paddingTop: '40px', color: '#fff', fontSize: '14px', textAlign: 'center', display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', paddingBottom: '40px' }}>
      <div style={{flex: '1 1 250px', maxWidth: '250px', textAlign: 'left' }}>
        <h2 style={{ fontSize: '25px', marginBottom: '20px', borderBottom: '2px solid #fff', paddingBottom: '10px' }}>Logo</h2>
        <p style={{ lineHeight: '1.6', opacity: '0.8' }}>The MNNLR logo is a symbol of innovation, excellence, and commitment to quality. Designed to reflect the core values of our company, the logo embodies our dedication to providing top-notch IT solutions and services. The logo features a modern and sleek design, using a color palette that signifies trust, reliability, and professionalism.</p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <a href="https://instagram.com" style={{ color: '#fff', textDecoration: 'none', height: '56px', }}><FaInstagram /></a>
          <a href="https://linkedin.com" style={{ color: '#fff', textDecoration: 'none', height: '56px',  }}><FaLinkedin /></a>
          <a href="https://twitter.com" style={{ color: '#fff', textDecoration: 'none', height: '56px',  }}><FaTwitter /></a>
        </div>
      </div>
      <div style={{ flex: '1 1 250px', maxWidth: '250px', textAlign: 'left' }}>
        <h2 style={{ fontSize: '25px', marginBottom: '20px', borderBottom: '2px solid #fff', paddingBottom: '10px' }}>Company</h2>
        <ul style={{ listStyleType: 'none', padding: 0, }}>
          <li style={{ marginBottom: '10px' }}><a href="#about" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.3s' }}>About Us</a></li>
          <li style={{ marginBottom: '10px' }}><a href="#team" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.3s' }}>Our Team</a></li>
          <li style={{ marginBottom: '10px' }}><a href="#jobs" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.3s' }}>Jobs</a></li>
          <li style={{ marginBottom: '10px' }}><a href="#press" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.3s' }}>Press</a></li>
        </ul>
      </div>
      <div style={{ flex: '1 1 250px', maxWidth: '250px', textAlign: 'left' }}>
        <h2 style={{ fontSize: '25px', marginBottom: '20px', borderBottom: '2px solid #fff', paddingBottom: '10px' }}>Business</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}><a href="#products" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.3s' }}>Products</a></li>
          <li style={{ marginBottom: '10px' }}><a href="#services" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.3s' }}>Services</a></li>
          <li style={{ marginBottom: '10px' }}><a href="#customers" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.3s' }}>Customers</a></li>
          <li style={{ marginBottom: '10px' }}><a href="#partners" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.3s' }}>Partners</a></li>
        </ul>
      </div>
      <div style={{ flex: '1 1 300px', maxWidth: '300px', textAlign: 'left' }}>
        <h2 style={{ fontSize: '25px', marginBottom: '20px', borderBottom: '2px solid #fff', paddingBottom: '10px' }}>Get in Touch</h2>
        <p style={{ lineHeight: '1.6', opacity: '0.8' }}>Contact information and social media links.</p>
      </div>
    </footer>
  );
}

export default Footer;
