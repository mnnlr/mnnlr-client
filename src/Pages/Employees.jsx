import { useState } from 'react';
import EmployeeCard from '../component/EmployeeCard'; // Assuming Card is correctly implemented to display employee data in card format

import { Tooltip } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

import { useNavigate } from 'react-router-dom';

import '../css/Employee.css';

import { useSelector } from 'react-redux';

const Table = () => {

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items per page
  const [view, setView] = useState('card'); // View state, 'table' or 'card'

  const {employees} = useSelector((state) => state.employees);
  // Logic to calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='employee-container'>
      <div style={{display:'flex',justifyContent:'flex-end',padding:'10px'}}>
        <Tooltip title='Table View' onClick={() => setView('table')} style={{color:'gray',cursor:'pointer'}}>
          <ViewListIcon />
        </Tooltip>
        <Tooltip title='Card View' onClick={() => setView('card')} style={{color:'gray',cursor:'pointer'}}>
          <ViewModuleIcon />
        </Tooltip>
      </div>

      {view === 'table' ? (
        <>
          <div className='tableContainerStyle'>
            <table className='tableStyle'>
              <thead>
                <tr>
                  <th className='thStyle' >Employee</th>
                  <th className='thStyle' >Name</th>
                  <th className='thStyle' >E-mail</th>
                  <th className='thStyle' >Mobile Number</th>
                  <th className='thStyle' >Level</th>
                  <th className='thStyle' >Designation</th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((employee, index) => (
                  <tr key={index}>
                    <td className='tdStyle' onClick={()=>navigate(`/employee/${employee?._id}`)}>
                      <div className='employeeCellStyle'>
                        <img src={employee?.avatar?.url} alt={employee.firatName} className='avatarStyle' onClick={()=>navigate('/profile')} />
                      </div>
                    </td>
                    <td className='tdStyle'>{`${employee.firstName} ${employee.lastName}`}</td>
                    <td className='tdStyle'>{employee.email}</td>
                    <td className='tdStyle'>{employee.phoneNo}</td>
                    <td className='tdStyle'>{employee.designationLevel}</td>
                    <td className='tdStyle'>{employee.designation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className='paginationStyle'>
            <li className={currentPage === 1 ? 'disabledPageItemStyle' : 'pageItemStyle'} onClick={() => currentPage > 1&&paginate(currentPage - 1)}>{'<'}</li>
            {[...Array(Math.ceil(employees.length / itemsPerPage))].map((_, index) => (
              <li key={index} className={currentPage === index + 1 ? 'activePageItemStyle' : 'pageItemStyle'} onClick={() => paginate(index + 1)}>
                {index + 1}
              </li>
            ))}
            <li className={currentPage === Math.ceil(employees.length / itemsPerPage) ? 'disabledPageItemStyle' : 'pageItemStyle'} onClick={() => currentPage < Math.ceil(employees.length / itemsPerPage)&&paginate(currentPage + 1)}>{'>'}</li>
          </ul>
        </>
      ) : (
        <div className='employee-card-ontainer'>
          {employees?.map((employee, index) => (
            <EmployeeCard 
              key={index}
              id={employee._id} 
              img={employee.avatar.url} 
              name={`${employee.firstName} 
              ${employee.lastName}`} 
              designation={employee.designation} 
              level={employee.designationLevel} />
            ))}
            {/* <button className='loadMoreButtonStyle' onClick={() => paginate(currentPage + 1)}>Load More</button> */}
        </div>
      )}

    </div>
  );
};

export default Table;



