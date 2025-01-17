import { useNavigate } from 'react-router-dom';

import Table from '../../component/DashboardComponents/Table';

import convertSecondsToHHMMSS from '../../utils/convertSecondsToHHMMSS';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployeeWorkingHours } from '../../redux/actions/AttendanceAction';
import { useEffect } from 'react';

const Performances = () => {
  const privateAxios = useAxiosPrivate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.login);
  const { workingHours } = useSelector((state) => state.attendances);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(getEmployeeWorkingHours({ privateAxios, accessToken: user.accessToken }));
    }
    return () => {
      isMounted = false;
    }
  }, [dispatch, privateAxios]);


  return (
    <div style={{ marginTop: '30px' }}>
      <Table
        TableTitle={'Attendence'}
        TableHeaderData={["Employee", "Name", "Designation", "Employeed On", "Employed"]}
      >
        <tbody>
          {workingHours?.employeePerformances?.map((Datum, index) => (
            <tr key={index}>
              <td>
                <div className="dashboard-table-info" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard/user-profile')}>
                  <img
                    src={Datum?.avatar?.url}
                    alt={Datum?.firstName}
                    className="dashboard-author-avatar"
                  />
                </div>
              </td>
              <td>
                <div>
                  <div className="dashboard-table-name">{Datum?.firstName} {Datum?.lastName}</div>
                  <div className="dashboard-table-email">{Datum?.email}</div>
                </div>
              </td>
              <td>
                <div>{Datum?.designation}</div>
              </td>
              <td>
                <span
                  className={`dashboard-status-badge ${Datum?.status?.toLowerCase()}`}
                >
                  {Datum?.employeedOn}
                </span>
              </td>
              <td>{convertSecondsToHHMMSS(Datum?.totalWorkingTime)}</td>
              {/* <td>
                  <button className="dashboard-table-edit-button">Edit</button>
                </td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Performances;