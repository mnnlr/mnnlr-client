import { useNavigate } from 'react-router-dom';
import Table from '../../component/DashboardComponents/Table';
import convertSecondsToHHMMSS from '../../utils/convertSecondsToHHMMSS';
import { useEffect } from 'react';

const HRPerformances = () => {
    const navigate = useNavigate();

    // Fake data for employee performances
    const workingHours = {
        employeePerformances: [
            {
                avatar: { url: 'https://randomuser.me/api/portraits/men/1.jpg' },
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                designation: 'Developer',
                status: 'Active',
                employeedOn: '01 Jan 2022',
                totalWorkingTime: 36000, // 10 hours in seconds
            },
            {
                avatar: { url: 'https://randomuser.me/api/portraits/women/2.jpg' },
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane.smith@example.com',
                designation: 'Designer',
                status: 'Active',
                employeedOn: '15 Feb 2021',
                totalWorkingTime: 28800, // 8 hours in seconds
            },
            {
                avatar: { url: 'https://randomuser.me/api/portraits/men/3.jpg' },
                firstName: 'Mark',
                lastName: 'Johnson',
                email: 'mark.johnson@example.com',
                designation: 'Manager',
                status: 'Inactive',
                employeedOn: '20 Mar 2020',
                totalWorkingTime: 43200, // 12 hours in seconds
            },
            {
                avatar: { url: 'https://randomuser.me/api/portraits/women/4.jpg' },
                firstName: 'Alice',
                lastName: 'Williams',
                email: 'alice.williams@example.com',
                designation: 'HR Manager',
                status: 'Active',
                employeedOn: '10 Nov 2019',
                totalWorkingTime: 32400, // 9 hours in seconds
            },
        ]
    };

    return (
        <div style={{ marginTop: '30px' }}>
            <Table
                TableTitle={'Attendance'}
                TableHeaderData={["Employee", "Name", "Designation", "Employed On", "Employed"]}
            >
                <tbody>
                    {workingHours.employeePerformances.map((Datum, index) => (
                        <tr key={index}>
                            <td>
                                <div className="dashboard-table-info" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard/user-profile')}>
                                    <img
                                        src={Datum.avatar.url}
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
                                <span
                                    className={`dashboard-status-badge ${Datum.status.toLowerCase()}`}
                                >
                                    {Datum.employeedOn}
                                </span>
                            </td>
                            <td>{convertSecondsToHHMMSS(Datum.totalWorkingTime)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default HRPerformances;
