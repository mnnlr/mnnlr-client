import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { FaPhone, FaEnvelope, FaUser,  } from 'react-icons/fa';

import { LineChart, Line } from 'recharts';

import '../../css/DashboardCss/UserProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeById } from '../../redux/actions/EmployeeAction';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getAttendanceById } from '../../redux/actions/AttendanceAction';
import AttendenceHistoryTable from '../../component/DashboardComponents/AttendanceHistoryTable';

const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const privateAxios = useAxiosPrivate();

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const {user} = useSelector((state) => state.login);
  const {employee} = useSelector((state) => state.employees );
  
  const { attendance } = useSelector((state) => state.attendances);
  console.log(attendance);

  useEffect(() => {
    dispatch(getEmployeeById({privateAxios,accessToken:user.accessToken,id}));
  },[id]);
  useEffect(() => {
    dispatch(getAttendanceById({privateAxios,accessToken:user.accessToken,id:employee?.userId}));  
  },[employee?.userId]);
  return (
    <div className="user-profile">
      <div style={{cursor:'pointer'}}>
        {theme === 'light' ?<LightModeIcon onClick={toggleTheme} />:<DarkModeIcon onClick={toggleTheme} />}
      </div>  
      
      {/* <header className="header">
        <h1 className="header-title">Good Morning, Harish</h1>
        <p className="header-subtitle">Let's see how you're doing</p>
      </header> */}
      
      <main className="main mt-5">
        <div className="left-column">
          <ProfileCard employee={employee} attendance={attendance}/>
          <StatsSummary />
          {/* <TaskList /> */}
          <AttendenceHistoryTable attendance={attendance} />
        </div>
        <div className="right-column">
          <StatisticsCard />
        </div>
      </main>
    </div>
  );
};

const ProfileCard = ({employee,attendance}) => (
  console.log('attendance :',attendance),
  <div className="profile-card">
    <div className="profile-header" style = {{alignItems : 'center', display: 'flex', flexDirection: 'column' }}>
      <img src={employee?.avatar?.url} alt="Profile" className="avatar" />
      <h6 className="profile-name">{`${employee.firstName} ${employee?.lastName}`}</h6>
    </div>

    <div className="profile-info">
      <p className="profile-role">{employee?.designation}</p>
      <p className="profile-location">{employee?.address}</p>
      <div className="profile-contact">
        <p style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><FaPhone style={{ marginRight: '7px' }} /> {employee?.phoneNo}</p>
      </div>
    </div>
    
    <div className="profile-info">
            
      <div className="profile-contact">
          <p style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>LogIn : {attendance?.timeTracking?.length > 0 ? attendance?.timeTracking[0]?.timeIn : 'unavailable'}</p>
          <p style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              LogOut : {
                attendance?.timeTracking?.length > 0? 
                attendance?.timeTracking[attendance?.timeTracking?.length - 1]?
                attendance?.timeTracking[attendance?.timeTracking?.length - 1]?.timeOut
                :'working'
                :'unavailable'
              }
          </p>
      </div>
      <p className="profile-role">Today's Working Hour : {attendance?.totalWorkingHours ? attendance?.totalWorkingHours : 'unavailable'}</p>
      <p style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><FaEnvelope style={{ marginRight: '7px' }} /> {employee?.email}</p>
  </div>
  </div>
);

const StatsSummary = () => (
  <div className="stats-summary" style={{ marginTop: '20px' }}>
    <StatItem label="Active goals" value="3" />
    <StatItem label="Progress" value="40%" />
    <StatItem label="Completed Task" value="6" />
    <StatItem label="Due Tasks" value="2" />
  </div>
);

const StatItem = ({ label, value }) => (
  <div className="stat-item">
    <p className="stat-label">{label}</p>
    <p className="stat-value">{value}</p>
  </div>
);

const TaskList = () => (
  <div className="dashbord-task-list">
  <h1>Personal info</h1>

  <div className="dashbord-info-container">
    <div className="dashbord-info-column">
      <div className="dashbord-info-item">
        <h4>Full Name</h4>
        <div className="dashbord-info-content">
          <FaUser className="dashbord-icon" /> Yash Maurya
        </div>
      </div>

      <div className="dashbord-info-item">
        <h4>Phone</h4>
        <div className="dashbord-info-content">
          <FaPhone className="dashbord-icon" /> 9132431354432
        </div>
      </div>
    </div>

    <div className="dashbord-info-column">
      <div className="dashbord-info-item">
        <h4>Email</h4>
        <div className="dashbord-info-content">
          <FaEnvelope className="dashbord-icon" /> yashmaurya@gmail.com
        </div>
      </div>

      <div className="dashbord-info-item">
        <h4>Role</h4>
        <div className="dashbord-info-content">
          <FaUser className="dashbord-icon" /> Software Developer
        </div>
      </div>
    </div>
  </div>
</div>
);

// const TaskItem = ({ title, progress, color }) => (
//   <div className="task-item">
//     <div className="task-info">
//       <h4 className="task-title">{title}</h4>
//       <div className="progress-bar-container">
//         <div className="progress-bar" style={{ width: `${progress}%`, backgroundColor: color }}></div>
//       </div>
//     </div>
//     <span className="progress-text">{progress}%</span>
//   </div>
// );

// const ScoreCard = () => (
//   <div className="score-card">
//     <h3 className="score-value">70% Score</h3>
//     <p className="score-label">Fantastic job</p>
//   </div>
// );

const data = [
    { value: 90 },
    { value: 50 },
    { value: 50 },
    { value: 20 },
    { value: 80 },
    { value: 30 },
  ];
  
  const StatisticsCard = () => {
    return (
      <div className="statistics-card">
        <div className="score-circle">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path className="circle-bg"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path className="circle"
              strokeDasharray="70, 100"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="percentage">70%</text>
          </svg>
          <p className="score-text">Score</p>
          <p className="score-subtext">🔥 Fantastic job</p>
        </div>
        
        <div className="statistics-section" style={{ boxShadow: 'none' }}>
          <div className="statistics-header">
            <h3>Statistics</h3>
            <select className='option'>
              <option className='op'>Oct</option>
              <option className='op'>Nov</option>
              <option className='op'>Dec</option>
              <option className='op'>Jan</option>
            </select>
          </div>
          
          <div className="stat-item">
            <div className="stat-info">
              <h4>Performance</h4>
              <p>Based on work</p>
              <p className='box-circle'>+15</p>
            </div>
            <LineChart width={100} height={30} data={data}>
              <Line type="monotone" dataKey="value" stroke="#ff7675" strokeWidth={2} dot={false} />
            </LineChart>
          </div>
          
          <div className="stat-item">
            <div className="stat-info">
              <h4>Success</h4>
              <p>Projects</p>
              <p className='box-circle'>+15</p>
            </div>
            <LineChart width={100} height={30} data={data}>
              <Line type="monotone" dataKey="value" stroke="#00b894" strokeWidth={2} dot={false} />
            </LineChart>
          </div>
          
          <div className="stat-item">
            <div className="stat-info">
              <h4>Innovation</h4>
              <p>Based on Ideas</p>
              <p className='box-circle'>+15</p>
            </div>
            <LineChart width={100} height={30} data={data}>
              <Line type="monotone" dataKey="value" stroke="#0984e3" strokeWidth={2} dot={false} />
            </LineChart>
          </div>
        </div>
      </div>
    );
  };

  // const generateRandomData = () => {
  //   return Array.from({ length: 6 }, () => ({ value: Math.floor(Math.random() * 100) }));
  // };
  
  // const StartItem = ({ title, subtitle, value, strokeColor }) => (
  //   <div className="stat-item">
  //     <div className="stat-info">
  //       <h4>{title}</h4>
  //       <p>{subtitle}</p>
  //       <p className='box-circle'>+{value}</p>
  //     </div>
  //     <LineChart width={100} height={30} data={generateRandomData()}>
  //       <Line type="monotone" dataKey="value" stroke={strokeColor} strokeWidth={2} dot={false} />
  //     </LineChart>
  //   </div>
  // );
  
// const StatPlaceholder = () => (
//   <div className="stat-placeholder">
//     <h4 className="stat-placeholder-title">Placeholder Title</h4>
//     <div className="placeholder-bar"></div>
//   </div>
// );

export default UserProfile;
//fohalas611@tiervio.com