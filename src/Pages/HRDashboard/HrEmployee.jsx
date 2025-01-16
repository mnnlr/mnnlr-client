import Table from "../../component/DashboardComponents/Table";

const HrEmployee = () => {
    // Example employee data
    const employees = [
      { id: 1, name: 'John Doe', department: 'Engineering', role: 'Developer', status: 'Active' },
      { id: 2, name: 'Jane Smith', department: 'Design', role: 'Designer', status: 'Active' },
      { id: 3, name: 'Mark Johnson', department: 'Marketing', role: 'Manager', status: 'Inactive' },
      { id: 4, name: 'Alice Williams', department: 'Engineering', role: 'Developer', status: 'Active' },
      { id: 5, name: 'Tom Brown', department: 'HR', role: 'HR Manager', status: 'Inactive' },
    ];
  
    return (
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full">
        <Table TableTitle="Employees" TableHeaderData={["ID", "Name", "Department", "Role", "Status", "Action"]}>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{employee.id}</td>
                <td className="px-4 py-2 border-b">{employee.name}</td>
                <td className="px-4 py-2 border-b">{employee.department}</td>
                <td className="px-4 py-2 border-b">{employee.role}</td>
                <td className="px-4 py-2 border-b">{employee.status}</td>
                <td className="px-4 py-2 border-b">
                  <button className="text-blue-500 hover:text-blue-700">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };
  
  export default HrEmployee;