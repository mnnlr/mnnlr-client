
import { useParams } from 'react-router-dom';

import { useSelector,useDispatch } from 'react-redux';
import { getAttendanceById } from '../../redux/actions/AttendanceAction';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import Table from '../../component/DashboardComponents/Table';

import { FaPhone, FaEnvelope } from 'react-icons/fa';
import '../../css/DashboardCss/UserProfile.css';
import { useEffect } from 'react';
import AttendenceHistoryTable from '../../component/DashboardComponents/AttendanceHistoryTable';

const AttendenceHistory = () => {
    const privateAxios = useAxiosPrivate()
    const { id } = useParams();
    const dispatch = useDispatch();
    
    const { user } = useSelector((state) => state.login);
    const { attendance } = useSelector((state) => state.attendances);

    useEffect(() => {
        dispatch(getAttendanceById({privateAxios,accessToken:user.accessToken,id}));  
    },[id,dispatch,privateAxios]);

    return (
        <div style={{marginTop:'20px'}}>
            <div className="profile-card">
                <div className="profile-header" style = {{alignItems : 'center', display: 'flex', flexDirection: 'column' }}>
                    <img src={attendance?.avatar?.url} alt="Profile" className="avatar" />
                    <h6 className="profile-name">{`${attendance?.firstName} ${attendance?.lastName}`}</h6>
                </div>
                <div className="profile-info">
            
                    <p className="profile-role">{attendance?.designation}</p>
                    <div className="profile-contact">
                        <p style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><FaPhone style={{ marginRight: '7px' }} /> {attendance?.phoneNo}</p>
                        <p style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><FaEnvelope style={{ marginRight: '7px' }} /> {attendance?.email}</p>
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
                </div>
            </div>

            <div style={{marginTop: '30px'}}>
                <AttendenceHistoryTable attendance={attendance}/>
            </div>

        </div>
    );
}

export default AttendenceHistory;