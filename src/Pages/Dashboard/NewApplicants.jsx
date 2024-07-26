import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useDispatch,useSelector } from 'react-redux';
import { getAllNewApplicants } from '../../redux/actions/ApplicantActions';

import Table from '../../component/DashboardComponents/Table';

import '../../css/DashboardCss/Table.css';

const NewCandidates = () => {

    const dispatch = useDispatch();
    const privateAxios = useAxiosPrivate();
    const navigate = useNavigate();

    const user = useSelector(state => state.login.user);
    const {newApplicants} = useSelector(state => state.Applicants);

    useEffect(()=>{
        dispatch(getAllNewApplicants({accessToken:user?.accessToken,privateAxios}));
    },[user?.id]);
    
    
  return (
    <div style={{marginTop: '30px'}}>
       <Table 
        TableTitle={'New Applicants'}
        TableHeaderData={["Candidate","Name","PHONE NUMBER","INTERVIEW STATUS","SELECTION STATUS","ACTION"]}  
      >
        <tbody>
            {newApplicants.map((newApplicant) => (
              <tr key={newApplicant?._id} >
                <td>
                  <div className="dashboard-table-info" >
                    <img
                      style={{borderRadius:'50%'}}
                      src={`https://via.placeholder.com/36?text=${newApplicant?.personalDetails?.name[0]}`}
                      alt={newApplicant?.personalDetails?.name}
                      className=".dashboard-author-avatar"
                    />
                  </div>
                </td>
                <td>
                    <div>
                      <div className="dashboard-table-name">{newApplicant?.personalDetails?.name}</div>
                      <div className="dashboard-table-email">{newApplicant?.personalDetails?.email}</div>
                    </div>
                </td>
                <td>
                  <div>{newApplicant?.personalDetails?.phone}</div>
                </td>
                <td>
                  <span
                    className={`dashboard-status-badge ${newApplicant?.interview ? 'approved' : 'pending'}`}
                  >
                    {newApplicant?.interview ? 'Completed' : 'Pending'}
                  </span>
                </td>
                <td>
                  <span
                    className={`dashboard-status-badge ${newApplicant?.selected?.toLowerCase()}`}
                  >
                    {newApplicant?.selected}
                  </span>
                </td>
                <td>
                  <button onClick={()=>navigate(`/dashboard/review-applicant/${newApplicant?._id}`)} className="dashboard-table-edit-button">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
      </Table>
    </div>
  )
}

export default NewCandidates;