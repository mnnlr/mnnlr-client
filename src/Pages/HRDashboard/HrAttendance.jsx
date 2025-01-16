import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getAllHrAttandance, getAttendance, getHrPerformance } from '../../redux/actions/AttendanceAction';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import Table from '../../component/DashboardComponents/Table';

const HrAttendence = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.login);
  // console.log(user);
  const { HrAttendance } = useSelector((state) => state.attendances);
  // console.log(HrAttendance);  

  // Fake attendance data for demonstration
  const attendances = [
    {
      _id: '1',
      avatar: { url: 'https://randomuser.me/api/portraits/men/1.jpg' },
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      designation: 'Software Engineer',
      designationLevel: 'Senior',
      isActive: true,
      attendance: {
        timeTracking: [
          { timeIn: '09:00 AM', timeOut: '05:00 PM' },
        ],
        totalWorkingHours: '8 hours',
      },
    },
    {
      _id: '2',
      avatar: { url: 'https://randomuser.me/api/portraits/women/2.jpg' },
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      designation: 'UX Designer',
      designationLevel: 'Mid-Level',
      isActive: false,
      attendance: {
        timeTracking: [
          { timeIn: '10:00 AM', timeOut: '06:00 PM' },
        ],
        totalWorkingHours: '7 hours',
      },
    },
    {
      _id: '3',
      avatar: { url: 'https://randomuser.me/api/portraits/men/3.jpg' },
      firstName: 'Mark',
      lastName: 'Johnson',
      email: 'mark.johnson@example.com',
      designation: 'Product Manager',
      designationLevel: 'Lead',
      isActive: true,
      attendance: {
        timeTracking: [
          { timeIn: '08:30 AM', timeOut: '04:30 PM' },
        ],
        totalWorkingHours: '8 hours',
      },
    },
    {
      _id: '4',
      avatar: { url: 'https://randomuser.me/api/portraits/women/4.jpg' },
      firstName: 'Alice',
      lastName: 'Williams',
      email: 'alice.williams@example.com',
      designation: 'Marketing Manager',
      designationLevel: 'Lead',
      isActive: false,
      attendance: {
        timeTracking: [],
        totalWorkingHours: 'unavailable',
      },
    },
  ];

  const dispatch = useDispatch();
  const privateAxios = useAxiosPrivate();

  useEffect(() => {
    // Normally, you would dispatch an action to get real data
    dispatch(getAllHrAttandance({ privateAxios, accessToken: user.accessToken }));
  }, [dispatch, privateAxios]);

  return (
    <div style={{ marginTop: '30px' }}>
      <Table
        TableTitle={'Attendance'}
        TableHeaderData={["Employee", "Name", "Designation", "LEVEL", "Status", "LOGIN", "LOGOUT", "DURATION", "HISTORY"]}
      >
        <tbody>
          {HrAttendance.map((Datum, index) => (
            <tr key={index}>
              <td>
                <div className="dashboard-table-info" style={{ cursor: 'pointer' }} onClick={() => navigate(`/dashboard/user-profile/${Datum._id}`)}>
                  <img
                    src={Datum.avatar.url}
                    alt={Datum.firstName}
                    className="dashboard-author-avatar"
                  />
                </div>
              </td>
              <td>
                <div>
                  <div className="dashboard-table-name font-bold">{Datum.firstName} {Datum.lastName}</div>
                  <div className="dashboard-table-email text-sm">{Datum.email}</div>
                </div>
              </td>
              <td>
                <div className='text-sm font-semibold'>{Datum.designation}</div>
              </td>
              <td>
                <div className='text-sm'>{Datum.designationLevel}</div>
              </td>
              <td>
                <span
                  className={`dashboard-status-badge ${Datum.isActive ? 'online' : 'offline'}`}
                >
                  {Datum.isActive ? 'PRESENT' : 'ABSENT'}
                </span>
              </td>
              <td className='text-sm'>
                {Datum.attendance ? Datum.attendance.timeTracking[0]?.timeIn : 'unavailable'}
              </td>
              <td className='text-sm'>
                {
                  Datum.attendance?.timeTracking?.length > 0 ? (
                    Datum.attendance.timeTracking[Datum.attendance.timeTracking.length - 1].timeOut ?
                      Datum.attendance.timeTracking[Datum.attendance.timeTracking.length - 1].timeOut :
                      'working'
                  ) : 'unavailable'
                }
              </td>
              <td>
                <button className="text-sm font-bold text-gray-500">
                  {Datum.attendance?.totalWorkingHours || "unavailable"}
                </button>
              </td>
              <td>
                <button className="dashboard-table-edit-button" onClick={() => navigate(`/dashboard/user-profile/${Datum._id}`)}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default HrAttendence;
