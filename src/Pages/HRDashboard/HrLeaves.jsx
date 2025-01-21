import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Table from '../../component/DashboardComponents/Table';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getAllLeaveRequest } from "../../redux/actions/LeaveActions";
import { useGetEmpLeavesForHr } from '../../hooks/useGetEmpLeavesForHr'

const HrLeaves = () => {
  const navigate = useNavigate();
  const { leaves } = useSelector((state) => state.leaves);
  const user = useSelector(state => state.login);
  const privateAxios = useAxiosPrivate();
  const dispatch = useDispatch();
  const { isLoading, isEmpData, getEmpLeavesForHr } = useGetEmpLeavesForHr();

  useEffect(() => {
    const fun = async () => {
      //console.log(user.user._id)
      await getEmpLeavesForHr({ id: user.user._id });
    }
    if (user.user.role === 'hr') {
      fun();
    }
  }, [privateAxios])

  console.log("empData: ", isEmpData);

  useEffect(() => {
    dispatch(getAllLeaveRequest({ accessToken: user?.accessToken, privateAxios }));
  }, [user?.accessToken]);

  console.log(leaves);

  //Mock leave data
  const MockLeaves = [
    {
      leaveId: '1',
      avatar: { url: 'https://randomuser.me/api/portraits/men/1.jpg' },
      name: 'John Doe',
      email: 'john.doe@example.com',
      employeeId: 'EMP12345',
      leaveType: 'Sick Leave',
      status: 'Approved',
      duration: '3',
    },
    {
      leaveId: '2',
      avatar: { url: 'https://randomuser.me/api/portraits/women/2.jpg' },
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      employeeId: 'EMP12346',
      leaveType: 'Vacation',
      status: 'Pending',
      duration: '5',
    },
  ];

  const data = user.user.role === 'admin' ? [...leaves] : isEmpData;

  return (
    <div style={{ marginTop: '30px' }}>
      <Table
        TableTitle={'Track Leave'}
        TableHeaderData={["Employee", "Name", "Employee Id", "Type", "Status", "Duration", "Action"]}
      >
        <tbody>
          {data?.sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied)).map((Datum, index) => (
            <tr key={index}>
              <td>
                <div className="dashboard-table-info" style={{ cursor: 'pointer' }} onClick={() => navigate(`/dashboard/user-profile/${Datum.leaveId}`)}>
                  <img
                    src={Datum.avatar.url}
                    alt={Datum.name}
                    className="dashboard-author-avatar"
                  />
                </div>
              </td>
              <td>
                <div>
                  <div className="dashboard-table-name">{Datum.name}</div>
                  <div className="dashboard-table-email">{Datum.email}</div>
                </div>
              </td>
              <td>
                <p className="dashboard-table-email">{Datum.employeeId}</p>
              </td>
              <td>
                <div>{Datum.leaveType}</div>
              </td>
              <td>
                <span
                  className={`dashboard-status-badge ${Datum.status.toLowerCase()}`}
                >
                  {Datum.status}
                </span>
              </td>
              <td>
                <div>{Datum.duration} D</div>
              </td>
              <td>
                <button
                  className="dashboard-table-edit-button"
                  onClick={() => {
                    if (user.user.role) {
                      // Apply hr-dashboard class logic here (if needed for a side effect)
                      navigate(`/hr-dashboard/review-leave/${Datum.leaveId}`)
                    } else {
                      navigate(`/dashboard/review-leave/${Datum.leaveId}`);
                    }
                  }}>
                  {Datum.status.toLowerCase() !== 'pending' ? 'View' : 'Review'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default HrLeaves;
