import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Table from '../../component/DashboardComponents/Table';

const HrLeaves = () => {
  const navigate = useNavigate();

  // Mock leave data
  const leaves = [
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
    {
      leaveId: '3',
      avatar: { url: 'https://randomuser.me/api/portraits/men/3.jpg' },
      name: 'Mark Johnson',
      email: 'mark.johnson@example.com',
      employeeId: 'EMP12347',
      leaveType: 'Maternity Leave',
      status: 'Rejected',
      duration: '30',
    },
    {
      leaveId: '4',
      avatar: { url: 'https://randomuser.me/api/portraits/women/4.jpg' },
      name: 'Alice Williams',
      email: 'alice.williams@example.com',
      employeeId: 'EMP12348',
      leaveType: 'Personal Leave',
      status: 'Approved',
      duration: '2',
    },
  ];

  return (
    <div style={{ marginTop: '30px' }}>
      <Table
        TableTitle={'Track Leave'}
        TableHeaderData={["Employee", "Name", "Employee Id", "Type", "Status", "Duration", "Action"]}
      >
        <tbody>
          {leaves.map((Datum, index) => (
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
                  onClick={() => navigate(`/dashboard/review-leave/${Datum.leaveId}`)}
                >
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
