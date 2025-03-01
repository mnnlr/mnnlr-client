import React, { useEffect, useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";
import { FaRankingStar, FaUserTie } from "react-icons/fa6";
import HrEmployee from "./HrEmployee";
import { useNavigate } from "react-router-dom";
import EmployeeTable from "../../component/DashboardComponents/EmployeeTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllHrAttandance,
  getAttendance,
  getHrPerformance,
} from "../../redux/actions/AttendanceAction";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import convertSecondsToHHMMSS from "../../utils/convertSecondsToHHMMSS";
import { getAllLeaveRequest } from "../../redux/actions/LeaveActions";
import { getEmployees } from "../../redux/actions/EmployeeAction";
import { useGetEmpLeavesForHr } from "../../hooks/useGetEmpLeavesForHr";
import { getHrTeamMembers } from "../../redux/actions/HrActions";

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement, // Add PointElement for Line chart
);

const HrDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const privateAxios = useAxiosPrivate();

  const { user } = useSelector((state) => state.login);
  // const { HrAttendance } = useSelector((state) => state.attendances);
  // const { employees } = useSelector((state) => state.employees);
  const { HrPerformance } = useSelector((state) => state.attendances);
  const { attendances } = useSelector((state) => state.attendances);
  const { leaves } = useSelector((state) => state.leaves);
  const {teamMembers}=useSelector((state)=>state.Hrteams)
  console.log(teamMembers);
  const { isLoading, isEmpData, getEmpLeavesForHr } = useGetEmpLeavesForHr();
  // const [isEmp, setEmp] = useState(null);
console.log(teamMembers)
  useEffect(() => {
    // Normally, you would dispatch an action to get real data
    dispatch(
      getAllHrAttandance({ privateAxios, accessToken: user.accessToken }),
    );
    dispatch(getAttendance({ privateAxios, accessToken: user.accessToken }));

    dispatch(
      getHrPerformance({ privateAxios, accessToken: user?.accessToken }),
    );
    dispatch(
      getHrTeamMembers({privateAxios, accessToken: user?.accessToken,id:user?._id})
    )
  }, [dispatch, privateAxios]);

  useEffect(() => {
    dispatch(
      getAllLeaveRequest({ accessToken: user?.accessToken, privateAxios }),
    );
  }, [user?.accessToken]);

  // useEffect(() => {
  //   if (!employees) {
  //     dispatch(getEmployees({ accessToken: user.accessToken, privateAxios }));
  //   } else {
  //     const foundEmp = employees.find((e) => e.userId === user._id);
  //     setEmp(foundEmp || null);
  //   }
  // }, [employees, user.accessToken, dispatch, privateAxios]);

  const hr = attendances.length;

  // Filtering HR Team's Attendance
  const HrTeamAttendance = teamMembers.Employees?.filter(
    (member) =>
      attendances.some((obj) => obj.userId === member.userId && obj.isActive), // Ensure both conditions match for the same object
  );

  // Filtering HR Team's leaves
  const HrTeamLeaves = leaves?.filter((leave) =>
    teamMembers.Employees?.some((obj) => leave.email === obj.email),
  );

  useEffect(() => {
    const fun = async () => {
      await getEmpLeavesForHr({ id: user._id });
    };
    if (user.role === "hr") {
      fun();
    }
  }, [privateAxios]);

  const salaryData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Average Salary ($)",
        data: [5000, 5200, 5400, 5600, 5800],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const satisfactionData = {
    labels: ["Developers", "Designers", "Marketers", "Managers"],
    datasets: [
      {
        label: "Employee Satisfaction",
        data: [75, 85, 60, 50],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCD56", "#4BC0C0"],
        hoverOffset: 4,
      },
    ],
  };

  const performanceData = {
    labels: [
      "Developer Team",
      "Design Team",
      "Marketing Team",
      "Management Team",
    ],
    datasets: [
      {
        label: "Performance",
        data: [65, 84, 28, 16],
        backgroundColor: ["#36A2EB", "#4BC0C0", "#FF6384", "#FFCD56"],
      },
    ],
  };

  return (
    <>
      <div className="flex justify-center mt-5">
        <div className="bg-white shadow-xl w-full rounded-lg p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
            {/* Card 1 */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-2 rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300 flex justify-between items-center mx-2">
              <div className="flex items-center">
                <i className="text-white text-xl mr-3 px-3 py-3 rounded-full bg-purple-400">
                  <FaUserTie />
                </i>
                <div>
                  <div className="text-white text-sm font-semibold">
                    Total Employees in Team
                  </div>
                  <div className="text-xl font-extrabold text-white">
                    {!teamMembers.Employees
                      ? "Loading..."
                      :  teamMembers.Employees?.length> 0
                        ? teamMembers.Employees?.length
                        : "No team assigned to you."}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 p-2 rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300 flex justify-between items-center mx-2"
              onClick={() => navigate("hr-attendance")}
            >
              <div className="flex items-center">
                <i className="text-white text-xl mr-3 px-3 py-3 rounded-full bg-green-300">
                  <FaUserTie />
                </i>
                <div>
                  <div className="text-white text-sm font-semibold">
                    Present Team employees
                  </div>
                  <div className="text-xl font-extrabold text-white">
                    {console.log(teamMembers)}
                    {!teamMembers?.Employees
                      ? "Loading..."
                      : HrTeamAttendance?.length > 0
                        ? HrTeamAttendance?.length
                        : "No team assigned to you."}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="bg-gradient-to-r from-orange-400 to-orange-600 p-2 rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300 flex justify-between items-center mx-2"
              onClick={() => navigate("hr-leaves")}
            >
              <div className="flex items-center">
                <i className="text-white text-xl mr-3 px-3 py-3 rounded-full bg-orange-300">
                  <FaUserTie />
                </i>
                <div>
                  <div className="text-gray-500 font-bold">Leaves</div>
                  <div className="text-xl font-bold">
                    {!teamMembers?.Employees
                      ? "Loading..."
                      : HrTeamLeaves?.length > 0
                        ? HrTeamLeaves?.length
                        : "No team assigned to you."}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div
              className="bg-gradient-to-r from-teal-500 to-teal-700 p-2 rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300 flex justify-between items-center mx-2"
              onClick={() => navigate("hr-performance")}
            >
              <div className="flex items-center">
                <i className="text-white text-xl mr-3 px-3 py-3 rounded-full bg-teal-300">
                  <FaRankingStar />
                </i>
                <div>
                  <div className="text-white text-sm font-semibold">
                    Performance
                  </div>
                  <div className="text-sm font-extrabold text-white">
                    {!teamMembers.Employees
                      ? "Loading..."
                      : teamMembers?.Employees.length > 0
                        ? convertSecondsToHHMMSS(
                            HrPerformance?.totalWorkingTimeOfAllEmployee,
                          )
                        : "No team assigned to you."}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Graph Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className=" p-4 bg-gray-100">
              <h3 className="text-lg font-semibold mb-2">Salary Statistics</h3>
              <Line data={salaryData} />
            </div>
            <div className="p-4 bg-gray-100">
              <h3 className="text-lg font-semibold mb-2">
                Employee Satisfaction
              </h3>
              <Bar data={performanceData} />
            </div>
          </div>

          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100">
            <div className='flex justify-center'>
              <h3 className="text-lg font-semibold mb-2">HR Performance Statistics</h3>
            </div>

            <Doughnut data={satisfactionData} />

          </div>
        </div> */}
        </div>
      </div>
      <div className="mt-3 ">
        <EmployeeTable />
        {/* <HrEmployee /> */}
      </div>
    </>
  );
};

export default HrDashboard;
