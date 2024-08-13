import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Table from '../../component/DashboardComponents/Table';
import { useSelector } from 'react-redux';

const TrackLeave = () => {
    const privateAxios = useAxiosPrivate();
    const navigate = useNavigate();
    const [Data,setData] = useState([]);
    
    const { user } = useSelector((state) => state.login);
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data,status} = await privateAxios.get('/leave', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user?.accessToken}`
                    }
                });
                if(status === 200){
                  setData(data.Data);
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [user?.accessToken]);
    console.log(Data);
  return (
    <div style={{marginTop: '30px'}}>
       <Table 
        TableTitle={'Track Leave'}
        TableHeaderData={["Employee","Name", "Employee Id","Type", "Status", "duration","ACTION"]}  
      >
        <tbody>
            {Data.map((Datum, index) => (
              <tr key={index}>
                <td>
                  <div className="dashboard-table-info" style={{cursor:'pointer'}} onClick={()=>navigate('/dashboard/user-profile')}>
                    <img
                      src={Datum?.avatar?.url}
                      alt={Datum?.name}
                      className="dashboard-author-avatar"
                    />
                  </div>
                </td>
                <td>
                    <div>
                      <div className="dashboard-table-name">{Datum?.name}</div>
                      <div className="dashboard-table-email">{Datum?.email}</div>
                    </div>
                </td>
                <td>
                  <p className='dashboard-table-email'>{Datum?.employeeId}</p>
                </td>
                <td>
                  <div>{Datum?.leaveType}</div>
                </td>
                <td>
                  <span
                    className={`dashboard-status-badge ${Datum?.status?.toLowerCase()}`}
                  >
                    {Datum?.status}
                  </span>
                </td>
                <td>
                  <div>{Datum?.duration} D</div>
                </td>
                <td>
                  <button className="dashboard-table-edit-button" onClick={()=>navigate(`/dashboard/review-leave/${Datum?._id}`)}>review</button>
                </td>
              </tr>
            ))}
          </tbody>
      </Table>
    </div>
  )
}

export default TrackLeave;