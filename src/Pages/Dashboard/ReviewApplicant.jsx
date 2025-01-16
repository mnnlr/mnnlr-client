import { useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useDispatch,useSelector } from 'react-redux';
import { getNewApplicantById, updateNewApplicant } from '../../redux/actions/ApplicantActions';

import '../../css/DashboardCss/ReviewApplicant.css';

const ReviewApplicant = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const privateAxios = useAxiosPrivate();

  const [interviewStatus, setInterviewStatus] = useState(false);
  const [select, setSelect] = useState(false);

  const user = useSelector(state => state.login.user);
  const {applicant} = useSelector(state => state.Applicants);
  

  useEffect(()=>{
    dispatch(getNewApplicantById({id,accessToken:user?.accessToken,privateAxios}));
  },[id]);

  const handleSubmit = () => {
   
    // alert(`Interview Status: ${interviewStatus}, Selected: ${select}`);
    console.log({interview:interviewStatus,selected:select})

    dispatch(updateNewApplicant(
      {
        id:applicant?._id,
        accessToken:user?.accessToken,
        privateAxios,
        Data:{interview:interviewStatus,selected:select},
      }
    ));
    navigate('/dashboard/new-applicants');
  };

  return (
    <div className="candidate-container">

      <div className="candidate-content">
        <div className="info">
          <section className="info-section">
            <h2 className="section-title">Personal Info</h2>
            <div className="personal-info">
              <div>
                <div className="info-item">
                  <label>Name:</label>
                  <p>{applicant?.personalDetails?.name}</p>
                </div>
                <div className="info-item">
                  <label>Email:</label>
                  <p>{applicant?.personalDetails?.email}</p>
                </div>
                <div className="info-item">
                  <label>Address:</label>
                  <p>{applicant?.personalDetails?.address}</p>
                </div>
              </div>
              <div>
                <div className="info-item">
                  <label>Father's Name:</label>
                  <p>{applicant?.personalDetails?.fathersName}</p>
                </div>
                <div className="info-item">
                  <label>Phone Number:</label>
                  <p>{applicant?.personalDetails?.phone}</p>
                </div>
              </div>
            </div>
          </section>
          <section className="info-section">
            <h2 className="section-title">Education</h2>
            {applicant?.education?.map((eachEducation)=>(<div className="personal-info" style = {{justifyContent: 'space-between', flexDirection: 'row'}}>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%'}}>
                <div className="info-item">
                  <label>School/College/University:</label>
                  <p>{eachEducation?.school}</p>
                </div>
                <div className="info-item">
                  <label>City:</label>
                  <p>{eachEducation?.city}</p>
                </div>
              </div>
          
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                <div className="info-item">
                  <label>Start date:</label>
                  <p>{new Date(eachEducation?.startDate).toLocaleDateString()}</p>
                </div>
                <div className="info-item">
                  <label>End date:</label>
                  <p>{new Date(eachEducation?.endDate).toLocaleDateString()}</p>
                </div>
              </div>

            </div>))}
          </section>
          <section className="info-section">
            <h2 className="section-title">Internships</h2>
            <div className="personal-info">
              {applicant?.internships?.map((internship)=>(<div>

                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                  <div className="info-item">
                    <label>Company:</label>
                    <p>{internship?.company}</p>
                  </div>
                  <div className="info-item">
                    <label>Role:</label>
                    <p>{internship?.role}</p>
                  </div>
                </div>
               
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                  <div className="info-item">
                    <label>Start Date:</label>
                    <p>{new Date(internship?.startDate).toLocaleDateString()}</p>
                  </div>
                  <div className="info-item">
                    <label>End Date:</label>
                    <p>{new Date(internship?.endDate).toLocaleDateString()}</p>
                  </div>
                </div>

              </div>))}
            </div>
          </section>
          <section className="info-section">
            <h2 className="section-title">Skills</h2>
            <div className="personal-info">
              <div className="info-item-skill" >
                {applicant?.skills?.map(skill => (
                  
                    <label key={skill}># {skill}</label>
                
                ))}
              </div>
            </div>
          </section>
          <section className="info-item">
            <h2 className="section-title">Application Status</h2>
            <div>
              <label>Has the interview been completed?</label>
              <div style={{display:'flex',gap:'20px'}}>
                <label>
                  <input
                    type="radio"
                    value="true"
                    checked={interviewStatus === true}
                    onChange={(e)=>setInterviewStatus(e.target.value === 'true' && true)}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    value="false"
                    checked={interviewStatus === false}
                    onChange={(e)=>setInterviewStatus(e.target.value === 'false' && false)}
                  />
                  No
                </label>
              </div>
                {interviewStatus === true && (
                  <div className="select-candidate" style={{marginTop:'10px'}}>
                    <label>Want to select the candidate?</label>
                    <div style={{display:'flex',gap:'20px'}}>
                      <label>
                        <input
                          type="radio"
                          value="true"
                          checked={select === true}
                          onChange={(e)=>setSelect(e.target.value === 'true' && true)}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="false"
                          checked={select === false}
                          onChange={(e)=>setSelect(e.target.value === 'false' && false)}
                        />
                        No
                      </label>
                    </div>
                  </div>)
                }
                {interviewStatus === true&&<button
                  onClick={handleSubmit}
                  style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}>
                  Submit
              </button>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ReviewApplicant;