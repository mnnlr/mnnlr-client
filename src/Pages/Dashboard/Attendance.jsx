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
    console.log(attendances);
    const dispatch = useDispatch();
    const privateAxios = useAxiosPrivate();

    useEffect(() => {
        dispatch(getAttendance({privateAxios,accessToken:user.accessToken}));
    }, [dispatch,privateAxios]);

  return (
    <div style={{marginTop: '30px'}}>
      <Table 
        TableTitle={'Attendence'}
        TableHeaderData={["Employee","Name", "Designation","LEVEL", "Status", "LOGIN","LOGOUT","HISTORY"]}  
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
                      <div className="dashboard-table-name">{Datum.firstName} {Datum.lastName}</div>
                      <div className="dashboard-table-email">{Datum.email}</div>
                    </div>
                </td>
                <td>
                  <div>{Datum.designation}</div>
                </td>
                <td>
                  <div>{Datum.designationLevel}</div>
                </td>
                <td>
                  <span
                    className={`dashboard-status-badge ${Datum?.attendance?'online':'offline'}`}
                  >
                    {Datum?.attendance ? 'PRESENT' : 'ABSENT'}
                  </span>
                </td>
                <td>{Datum?.attendance ? Datum?.attendance?.timeTracking[0]?.timeIn : 'unavailable'}</td>
                <td>{
                      Datum?.attendance?.timeTracking?.length > 0 ? (
                        Datum.attendance.timeTracking[Datum.attendance.timeTracking.length - 1].timeOut ?
                        Datum.attendance.timeTracking[Datum.attendance.timeTracking.length - 1].timeOut :
                        'working'
                      ) : 'unavailable'
                    }
                </td>
                <td>
                  <button className="dashboard-table-edit-button" onClick={()=>navigate(`/dashboard/attendence-history/${Datum?.userId}`)}>Details</button>
                </td>
              </tr>
            ))}
          </tbody>
      </Table>
    </div>
  )
}

export default Attendence;