import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { deleteEmployeeById, getEmployees } from '../../redux/actions/EmployeeAction';
import Table from './Table';
import '../../css/DashboardCss/Table.css';
import Modal from './DeleteModal';

const EmployeeTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const privateAxios = useAxiosPrivate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    const { user } = useSelector(state => state.login);
    const { employees, totalEmployees } = useSelector(state => state.employees);

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
        navigate(`/dashboard/edit-employee/${employeeId}`);
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

    return (
        <div>
            <Table
                TableTitle={'Employees'}
                TableHeaderData={["Employee", "Name", "Designation", "Level", "Employed", "ACTION"]}
            >
                <tbody>
                    {employees?.length > 0 && employees?.map((Datum) => (
                        <tr key={Datum?._id}>
                            <td>
                                <div className="dashboard-table-info" style={{ cursor: 'pointer' }} onClick={() => navigate(`/dashboard/user-profile/${Datum?._id}`)}>
                                    <img
                                        style={{ width: '36px', height: '36px', borderRadius: '50%' }}
                                        src={Datum?.avatar?.url}
                                        alt={Datum?.firstName}
                                        className=".dashboard-author-avatar"
                                    />
                                </div>
                            </td>
                            <td>
                                <div>
                                    <div className="dashboard-table-name">{`${Datum?.firstName} ${Datum?.lastName}`}</div>
                                    <div className="dashboard-table-email">{Datum?.email}</div>
                                </div>
                            </td>
                            <td>
                                <div>{Datum?.designation}</div>
                            </td>
                            <td>
                                <div>{Datum?.designationLevel}</div>
                            </td>
                            <td>
                                <div>{Datum?.createdAt ? new Date(Datum.createdAt).toDateString() : 'not available'}</div>
                            </td>
                            {Datum?.status && <td>
                                <span
                                    className={`dashboard-status-badge ${Datum.status.toLowerCase()}`}
                                >
                                    {Datum.status}
                                </span>
                            </td>}
                            <td>
                                <button className="dashboard-table-edit-button" onClick={(e) => handleNavigateToEdit(e, Datum._id)}>Edit</button>
                            </td>
                            <td>
                                <button className="text-xl" onClick={() => handleOpenModal(Datum?._id)}><MdDelete /></button>
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
