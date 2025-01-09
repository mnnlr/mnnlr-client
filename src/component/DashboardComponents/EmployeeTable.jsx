import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { deleteEmployeeById, getEmployees } from '../../redux/actions/EmployeeAction';
import Table from './Table';
import '../../css/DashboardCss/Table.css';
import Modal from './DeleteModal';
import useApi from '../../hooks/useApi';

const EmployeeTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const privateAxios = useAxiosPrivate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [updatingUserId, setUpdatingUserId] = useState(null);

    const { user } = useSelector(state => state.login);
    const { employees, totalEmployees } = useSelector(state => state.employees);

    // console.log("user:", user);
    // console.log("emps:", employees);
    // console.log("emp", employees.find(emp => emp.userId === user._id));

    const emp = employees.find(emp => emp.userId === user._id);

    const [usersData, setUsersData] = useState([]);
    const [updatedUser, setUpdatedUser] = useState(null);

    // hook for making API requests
    const { sendRequest, isApiLoading, apiError } = useApi();

    useEffect(() => {
        const getUserUrl = "/api/v1/users";

        // Async function to fetch data
        const fetchUsers = async () => {
            try {
                const dataFromApi = await sendRequest({
                    url: getUserUrl,
                    method: "GET"
                });
                setUsersData(dataFromApi); // Update the state with fetched data
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers(); // Call the async function
    }, [updatedUser, setUsersData]);

    // console.log("users", usersData);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            dispatch(getEmployees({ accessToken: user.accessToken, privateAxios }));
        }
        return () => {
            isMounted = false;
        };
    }, [totalEmployees, user.accessToken, dispatch, privateAxios]);

    const handleNavigateToEdit = (e, employeeId) => {
        e.preventDefault();
        user?.role === 'admin' ? navigate(`/dashboard/edit-employee/${employeeId}`)
            : user?.role === 'hr' ? navigate(`/hr-dashboard/edit-employee/${employeeId}`)
                : navigate('/')
    };

    const handleOpenModal = (employeeId) => {
        setEmployeeToDelete(employeeId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEmployeeToDelete(null);
    };

    const handleConfirmDelete = async () => {
        const { payload } = await dispatch(deleteEmployeeById({ privateAxios, id: employeeToDelete }));
        if (payload?.success) {
            dispatch(getEmployees({ accessToken: user.accessToken, privateAxios }));
        }
        handleCloseModal();
    };

    const handleUpdateUser = async (e, userId) => {
        e.preventDefault();

        try {
            const role = e.target.value;
            setUpdatingUserId(userId);
            // console.log("role:", role, "userId:", userId);

            const userUpdateResponse = await sendRequest({
                url: `/api/v1/update-user/${userId}`,
                method: "PATCH",
                data: { role }
            });
            if (userUpdateResponse) setUpdatingUserId(null)
            setUpdatedUser(userUpdateResponse);
        } catch (err) {
            console.log(err)
        }
    }

    // console.log("updatedUser", updatedUser);

    // Function to determine the background color based on the role
    const getBackgroundColor = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-red-200';  // Red background for Admin
            case 'manager':
                return 'bg-blue-200'; // Blue background for Manager
            case 'hr':
                return 'bg-green-200'; // Green background for HR
            case 'employee':
                return 'bg-gray-200'; // Gray background for Employee
            default:
                return 'bg-white'; // Default background color
        }
    }

    return (
        <div>
            <Table
                TableTitle={'Employees'}
                TableHeaderData={["Employee", "Name", "Designation", "Level", "Employed", "ACTION"]}
            >
                <tbody>
                    {employees?.length > 0 && employees?.filter((empData) => {
                        if (user?.role === 'admin') {
                            return true; // Admin can see all employees
                        }
                        if (user?.role === 'hr') {
                            // HR can see only employees in their assigned teams
                            return emp.AssignedTeamsToHR?.includes(empData.employeeTeam);
                        }
                        if (user?.role === 'manager') {
                            return emp.AssignedTeamsToManager?.includes(empData.employeeTeam);
                        }
                        return false;
                    }).map((empData) => (
                        <tr key={empData?._id}>
                            <td>
                                <div className="dashboard-table-info" style={{ cursor: 'pointer' }} onClick={() => navigate(`/dashboard/user-profile/${empData?._id}`)}>
                                    <img
                                        style={{ width: '36px', height: '36px', borderRadius: '50%' }}
                                        src={empData?.avatar?.url}
                                        alt={empData?.firstName}
                                        className=".dashboard-author-avatar"
                                    />
                                </div>
                            </td>
                            <td>
                                <div>
                                    <div className="dashboard-table-name">{`${empData?.firstName} ${empData?.lastName}`}</div>
                                    <div className="dashboard-table-email">{empData?.email}</div>
                                </div>
                            </td>
                            <td>
                                <div>{empData?.designation}</div>
                            </td>
                            <td>
                                <div>{empData?.designationLevel}</div>
                            </td>
                            <td>
                                <div>{empData?.createdAt ? new Date(empData.createdAt).toDateString() : 'not available'}</div>
                            </td>
                            {empData?.status && <td>
                                <span
                                    className={`dashboard-status-badge ${empData.status.toLowerCase()}`}
                                >
                                    {empData.status}
                                </span>
                            </td>}
                            <td>
                                <button
                                    className="border-2 border-gray-300 bg-gray-200 rounded-lg px-4 py-1 m-1"
                                    onClick={(e) => handleNavigateToEdit(e, empData._id)}
                                >
                                    Edit
                                </button>
                                {usersData?.users?.map((u) =>
                                    u?._id === empData?.userId ? (
                                        updatingUserId === u._id ? (
                                            <select
                                                disabled
                                                key={u._id}
                                                className="border-2 border-gray-300 rounded-lg p-1 m-1 bg-sky-200"
                                            >
                                                <option value="employee">Updating Access...</option>
                                            </select>
                                        ) : (
                                            (user?.role === 'admin' || user?.role === 'manager') && (
                                                <select
                                                    key={u._id}
                                                    value={u?.role}
                                                    onChange={(e) => handleUpdateUser(e, u?._id)}
                                                    className={`border-2 border-gray-300 rounded-lg p-1 m-1 ${getBackgroundColor(u?.role)}`}
                                                    name="status"
                                                    id="status"
                                                >
                                                    <option className="bg-gray-100" value="employee">
                                                        Employee Access
                                                    </option>
                                                    <option className="bg-green-100" value="hr">
                                                        HR Access
                                                    </option>
                                                    <option className="bg-blue-100" value="manager">
                                                        Manager Access
                                                    </option>
                                                    <option className="bg-red-100" value="admin">
                                                        Admin Access
                                                    </option>
                                                </select>
                                            )
                                        )
                                    ) : null
                                )}
                            </td>
                            <td>
                                <button className="text-xl" onClick={() => handleOpenModal(empData?._id)}><MdDelete /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default EmployeeTable;