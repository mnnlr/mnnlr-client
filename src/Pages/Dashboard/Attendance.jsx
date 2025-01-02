import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector,useDispatch } from 'react-redux';
import { getAttendance } from '../../redux/actions/AttendanceAction';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import Table from '../../component/DashboardComponents/Table';

const Attendence = () => {
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.login);
    const {attendances} = useSelector((state) => state.attendances);
    // console.log(attendances);
    const dispatch = useDispatch();
    const privateAxios = useAxiosPrivate();

    useEffect(() => {
        dispatch(getAttendance({privateAxios,accessToken:user.accessToken}));
    }, [dispatch,privateAxios]);

  return (
    <div style={{marginTop: '30px'}}>
      <Table 
        TableTitle={'Attendence'}
        TableHeaderData={["Employee","Name", "Designation","LEVEL", "Status", "LOGIN","LOGOUT","DURATION","HISTORY"]}  
      >
        <tbody>
            {attendances?.map((Datum, index) => (
              <tr key={index}>
                <td>
                  <div className="dashboard-table-info" style={{cursor:'pointer'}} onClick={()=>navigate(`/dashboard/user-profile/${Datum?._id}`)}>
                    <img
                      src={Datum?.avatar?.url}
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
                    className={`dashboard-status-badge ${Datum?.isActive ?'online':'offline'}`}
                  >
                    {Datum?.isActive ? 'PRESENT' : 'ABSENT'}
                  </span>
                </td>
                <td className='text-sm'>{Datum?.attendance ? Datum?.attendance?.timeTracking[0]?.timeIn : 'unavailable'}</td>
                <td className='text-sm'>{
                      Datum?.attendance?.timeTracking?.length > 0 ? (
                        Datum.attendance.timeTracking[Datum.attendance.timeTracking.length - 1].timeOut ?
                        Datum.attendance.timeTracking[Datum.attendance.timeTracking.length - 1].timeOut :
                        'working'
                      ) : 'unavailable'
                    }
                </td>
                <td>
                  <button className="text-sm font-bold text-gray-500" >{Datum?.attendance?.totalWorkingHours
                  ||"unavailable"}</button>
                </td>
                <td>
                  <button className="dashboard-table-edit-button" onClick={()=>navigate(`/dashboard/user-profile/${Datum?._id}`)}>Details</button>
                </td>
              </tr>
            ))}
          </tbody>
      </Table>
    </div>
  )
}

export default Attendence;