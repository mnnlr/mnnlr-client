import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { getAllLeaves } from '../redux/actions/LeaveActions';
import LeavePieChart from '../Pages/Dashboard/LeavePieChart';
// import LeaveStatus from '../Pages/Dashboard/LeaveStatus';

export default function EmpLeaveInfo() {
    const dispatch = useDispatch();
    const privateAxios = useAxiosPrivate();

    const [Data, setData] = useState([]);
    const [isEmp, setEmp] = useState([]);

    const { user } = useSelector((state) => state.login);
    const { AllLeave } = useSelector((state) => state.AllLeaves);

    const getAllEmpsAndfindOne = async () => {
        try {
            const res = await privateAxios.get('/api/v1/employees', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${user?.accessToken}`,
                },
            });
            // console.log("res: ", res)

            if (res.status === 200) {
                const emp = res.data.Data.find(data => data.userId !== null && data.userId === user._id)
                // console.log("emp: ", emp)
                setEmp(emp);
            }
        } catch (err) {
            console.error("error while getting employees: ", err);
        }
    }

    // Fetching leaves
    useEffect(() => {
        if (user?.accessToken) {
            dispatch(getAllLeaves({ accessToken: user.accessToken, privateAxios }));
        }
        getAllEmpsAndfindOne()
    }, [user?.accessToken]);

    // finding employee leave data and assigning to data
    useEffect(() => {
        if (AllLeave && isEmp?._id) {
            const userData = AllLeave.find(data =>
                data?.employeeId?._id && data.employeeId._id === isEmp._id
            );
            console.log(userData);
            setData(userData);
        }
    }, [AllLeave, isEmp?._id]);

    // console.log("All Leaves from Redux: ", AllLeave);
    // console.log("Data in Local State: ", Data);

    return (
        <div className="p-6 min-h-screen">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 bg-white shadow-sm rounded-lg">
                <LeavePieChart
                    title="Sick Leave"
                    labels={['Balance', 'Used']}
                    leaveData={[
                        Data?.sickLeaveBalance ?? 0,
                        Data?.totalSickLeaveUsed ?? 0
                    ]}
                    totalLeave={Data?.sickLeaveBalance ?? 0}
                />
                <LeavePieChart
                    title="Casual Leave"
                    labels={['Balance', 'Used']}
                    leaveData={[
                        Data?.casualLeaveBalance ?? 0,
                        Data?.totalCasualLeaveUsed ?? 0
                    ]}
                    totalLeave={Data?.casualLeaveBalance ?? 0}
                />
                <LeavePieChart
                    title="Total Leave"
                    labels={['Balance', 'Used']}
                    leaveData={[
                        (Data?.sickLeaveBalance ?? 0) + (Data?.casualLeaveBalance ?? 0),
                        (Data?.totalCasualLeaveUsed ?? 0) + (Data?.totalSickLeaveUsed ?? 0)
                    ]}
                    totalLeave={(Data?.sickLeaveBalance ?? 0) + (Data?.casualLeaveBalance ?? 0)}
                />
            </div>

            {/* <div className="bg-white rounded-lg p-6 shadow-lg mt-10">
                <LeaveStatus Data={Data} />
            </div> */}

            <h2 className="text-xl font-semibold mb-1 mt-16">Leave Information</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                                Leave Type
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                                Start Date
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                                End Date
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                                Duration
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {Data?.leavesDetails?.map((record, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {record?.typeOfLeave} Leave
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {record?.startDate?.split('T')[0]}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {record?.endDate?.split('T')[0]}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {/* dutation of leave */}
                                    {Math.abs(new Date(record?.endDate) - new Date(record?.startDate)) / (1000 * 60 * 60 * 24) + 1} Day
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {record?.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
