import { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import '../css/Profile.css';

import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useDispatch,useSelector } from 'react-redux';
import { getEmployeeById } from '../redux/actions/EmployeeAction';
import { getAttendanceById } from '../redux/actions/AttendanceAction';

function EmployeeProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const privateAxios = useAxiosPrivate();

  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Personal Details');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {user} = useSelector((state) => state.login);
  const {employee,isLoading} = useSelector((state) => state.employees );
  const {attendance} = useSelector((state) => state.attendances);
console.log('attendance',attendance);
  useEffect(() => {
    dispatch(getEmployeeById({privateAxios,accessToken:user.accessToken,id}));
    dispatch(getAttendanceById({privateAxios,accessToken:user.accessToken,id:user?._id}));
  },[id]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setDropdownOpen(false); 
  };

  const joiningDate = new Date(employee?.createdAt).toDateString();

  return (
    <>
     {!isLoading&&<div className="profile-page">
        <div className="dropdown-wrapper">
          <button className="dropdown-btn" style={{ backgroundColor: "#007bff" }} onClick={toggleDropdown}>
            Menu
          </button>
          {dropdownOpen && (
            <div className="dropdown-content">
              <ul>
                <li onClick={() => handleTabClick('Account')}>Personal Details</li>
                <li onClick={() => handleTabClick('Employee Info')}>Employee Info</li>
                <li onClick={() => handleTabClick('Notifications')}>Dosuments Submitted</li>
                <li onClick={() => handleTabClick('Saved')}>Leaves</li>
              </ul>
            </div>
          )}
        </div>
        <main className="profile-main">
          <div className="profile-header">
            <div className="profile-picture">
              <img src={employee?.avatar?.url} alt="John Soo" />
              <h3 style={{ marginTop : '70px', marginLeft : '10px' }}>{`${employee?.firstName} ${employee?.lastName}`}</h3>
            </div>
            {user?.role==='employee'&&<button onClick={()=>navigate('/apply-leave')} className="btn">Apply Leave</button>}
          </div>
          <section className="profile-info">
            <p>
              {employee?.description}
            </p>
          </section>

          <nav className="tab-menu">
            <ul>
              <li className={activeTab === 'Personal Details' ? 'active' : ''} onClick={() => setActiveTab('Personal Details')}>Personal Details</li>
              <li className={activeTab === 'Employee Info' ? 'active' : ''} onClick={() => setActiveTab('Employee Info')}>Employee Info</li>
              <li className={activeTab === 'Dosuments Submitted' ? 'active' : ''} onClick={() => setActiveTab('Dosuments Submitted')}>Dosuments Submitted</li>
              <li className={activeTab === 'Leaves' ? 'active' : ''} onClick={() => setActiveTab('Leaves')}>Leaves</li>
            </ul>
          </nav>

          <section className="account-details">
            {activeTab === 'Personal Details' && (
              <div className="detail-group" style={{display:'grid',gridTemplateColumns:'1fr 1fr auto',gridTemplateRows:'1fr 1fr auto'}}>
          
                <div className="detail-item">
                  <label>Name</label>
                  <p>{`${employee?.firstName} ${employee?.lastName}`}</p>
                </div>
                <div className="detail-item">
                  <label>Father Name</label>
                  <p>{employee?.fatherName}</p>
                </div>
                <div className="detail-item">
                  <label>Mobile Number</label>
                  <p>{employee?.phoneNo}</p>
                </div>
                <div className="detail-item">
                  <label>E-mail</label>
                  <p>{employee?.email}</p>
                </div>
                <div className="detail-item">
                  <label>Mother Name</label>
                  <p>{employee?.motherName}</p>
                </div>
                <div className="detail-item">
                  <label>Address</label>
                  <p>{employee?.address}</p>
                </div>
              </div>
            )}

            {activeTab === 'Employee Info' && (
              <div className="detail-group" style={{display:'grid',gridTemplateColumns:'1fr 1fr auto',gridTemplateRows:'1fr 1fr auto'}}>
                <div className="detail-item">
                  <label>Employee ID</label>
                  <p>{employee?.employeeId}</p>
                </div>
                <div className="detail-item">
                  <label>Designation</label>
                  <p>{employee?.designation}</p>
                </div>
                <div className="detail-item">
                  <label>Designation Level</label>
                  <p>{employee?.designationLevel}</p>
                </div>
                <div className="detail-item">
                  <label>Working Shift</label>
                  <p>{employee?.Shift}</p>
                </div>
                <div className="detail-item">
                  <label>Joining Date</label>
                  <p>{joiningDate}</p>
                </div>
              </div>
            )}

            {activeTab === 'Dosuments Submitted' && (
              <div className="detail-group">
                <h3>Dosuments Submitted</h3>
                <p>Dosuments Submitted content goes here.</p>
              </div>
            )}

            {activeTab === 'Leaves' && (
              <div className="detail-group">
                <h3>Attendace Log</h3>
                <div style={{display:'grid',gridAutoColumns:'1fr 1fr 1fr 1fr',gridTemplateRows:'1fr auto'}}>
                  {attendance?.timeTracking?.map((log, index) => (
                    <div key={index}>
                      <p>
                        <span>Time In:</span> {log.timeIn}
                      </p>
                      <p>
                        <span>Time Out:</span> {
                                    attendance?.timeTracking?.length > 0 ? (
                                        attendance.timeTracking[attendance.timeTracking.length - 1].timeOut ?
                                        attendance.timeTracking[attendance.timeTracking.length - 1].timeOut :
                                        'working'
                                    ) : 'unavailable'
                                }
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {user?.role === 'admin'&&<div className="account-actions">
            <button className="btn delete-btn">Remove Employee</button>
          </div>}
        </main>
      </div>}
    </>
  );
}

export default EmployeeProfile;
