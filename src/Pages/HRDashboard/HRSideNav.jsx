import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { NavLink, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaSignInAlt } from 'react-icons/fa';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import '../../css/DashboardCss/Sidenav.css';

function HRSideNav() {
  const location = useLocation();

  const NavItem = ({ to, icon: Icon, children }) => (
    <NavLink to={to} className={({ isActive }) => `dashbord-nav-item ${isActive ? 'dashbord-active' : ''}`}>
      <div className={`dashbord-icon-container ${location.pathname === to ? 'dashbord-active' : ''}`}>
        <Icon className='dashbord-icon' />
      </div>
      <span>{children}</span>
    </NavLink>
  );

  return (
    <div className="dashbord-sidenav">
      <NavLink style={{ borderRadius: '7px', placeContent: 'center', fontWeight: 'bold' }} className={`dashbord-nav-item dashbord-active`}>
        MNNLR
      </NavLink>
      <div style={{ border: '1px solid rgba(0,0,0,0.2)', marginTop: '10px' }}></div>
      <div>
        <div style={{ marginTop: '40px', alignItems: 'center' }}>
          <NavItem to="/hr-dashboard" icon={FaTachometerAlt}>HR Dashboard</NavItem>
          <NavItem to="/hr-dashboard/add-employee" icon={PersonAddIcon}>Add Employee</NavItem>
          <NavItem to="/hr-dashboard/holidays" icon={CalendarMonthIcon}>Holidays</NavItem>
        </div>

        <div className="dashbord-account-pages">
          <h1 style={{ fontSize: "18px", fontWeight: "bold", color: "black", marginTop: "10px", marginBottom: "10px" }}>ACCOUNT PAGES</h1>
          <NavItem to="/dashboard/profile" icon={FaUser}>Profile</NavItem>
          <NavItem to="/connect-with-us" icon={FaSignInAlt}>Logut</NavItem>
        </div>
      </div>
    </div>
  );
}

export default HRSideNav;
