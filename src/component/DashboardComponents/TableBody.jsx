import { useNavigate } from "react-router-dom";
const TableBody = ({ Data }) => {
  const navigate = useNavigate();
    return (
        <tbody>
            {Data.map((Datum, index) => (
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
    )
}

export default TableBody;