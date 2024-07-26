import { useNavigate } from 'react-router-dom';

import Table from '../../component/DashboardComponents/Table';

const TrackLeave = () => {
    const navigate = useNavigate();
    
    const authors = [
        {
          name: "John Michael",
          email: "john@creative-tim.com",
          function: 'Programmer',
          employeeID:"1",
          status: "APPROVED",
          employed: "23/04/18",
          level: 'L0',
        },
        {
          name: "Alexa Liras",
          email: "alexa@creative-tim.com",
          function: "Programator",
          employeeID:"2",
          status: "APPROVED",
          employed: "11/01/19",
          level: 'L0',
        },
        {
          name: "Laurent Perrier",
          email: "laurent@creative-tim.com",
          function: "Executive",
          employeeID:"3",
          status: "PENDING",
          employed: "19/09/17",
          level: 'L0',
        },
        {
          name: "Michael Levi",
          email: "michael@creative-tim.com",
          function: "Programator",
          employeeID:"4",
          status: "REJECTED",
          employed: "24/12/08",
          level: 'L0',
        },
        {
          name: "Richard Gran",
          email: "richard@creative-tim.com",
          function: "Manager",
          employeeID:"5",
          status: "PENDING",
          employed: "04/10/21",
          level: 'L0',
        },
        {
          name: "Miriam Eric",
          email: "miriam@creative-tim.com",
          function: "Programator",
          employeeID:"6",
          status: "APPROVED",
          employed: "14/09/20",
          level: 'L0',
        },
      ];
  return (
    <div style={{marginTop: '30px'}}>
       <Table 
        TableTitle={'Employees'}
        TableHeaderData={["Employee","Name", "Designation", "Status", "Employed","ACTION"]}  
      >
        <tbody>
            {authors.map((Datum, index) => (
              <tr key={index}>
                <td>
                  <div className="dashboard-table-info" style={{cursor:'pointer'}} onClick={()=>navigate('/dashboard/user-profile')}>
                    <img
                      src={`https://via.placeholder.com/36?text=${Datum.name[0]}`}
                      alt={Datum.name}
                      className=".dashboard-author-avatar"
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
                  <div>{Datum.function}</div>
                </td>
                {Datum.status&&<td>
                  <span
                    className={`dashboard-status-badge ${Datum.status.toLowerCase()}`}
                  >
                    {Datum.status}
                  </span>
                </td>}
                <td>{Datum.employed}</td>
                <td>
                  <button className="dashboard-table-edit-button">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
      </Table>
    </div>
  )
}

export default TrackLeave;