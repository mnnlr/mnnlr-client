import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../component/DashboardComponents/Table';
import convertSecondsToHHMMSS from '../../utils/convertSecondsToHHMMSS';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHrPerformance } from '../../redux/actions/AttendanceAction';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const HRPerformances = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.login);
    const { HrPerformance, loading, error } = useSelector((state) => state.attendances);
    const [employesToshow, setemployesToshow] = useState(null);

    const dispatch = useDispatch();
    const privateAxios = useAxiosPrivate();

    useEffect(() => {
        if (user?.accessToken) {
            dispatch(getHrPerformance({ privateAxios, accessToken: user?.accessToken }));
        }
    }, [dispatch, privateAxios, user?.accessToken]);

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>Error: {error}</div>;  
    }

    const employeePerformances = HrPerformance?.employeePerformances || [];

    return (
        <div style={{ marginTop: '30px' }}>
            <Table
                TableTitle={'Attendance'}
                TableHeaderData={["Employee", "Name", "Designation", "Employed On", "Employed"]}
                employesToshow={employeePerformances}
                setemployesToshow={setemployesToshow}
            >
                <tbody>
                    {employesToshow?.map((Datum, index) => (
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
                                    <div className="dashboard-table-name">{Datum.firstName} {Datum.lastName}</div>
                                    <div className="dashboard-table-email">{Datum.email}</div>
                                </div>
                            </td>
                            <td>
                                <div>{Datum.designation}</div>
                            </td>
                            <td>
                                <span>{Datum.employeedOn}</span>
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
