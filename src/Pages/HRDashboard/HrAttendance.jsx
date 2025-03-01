import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployees } from "../../redux/actions/EmployeeAction";
import { useSelector, useDispatch } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  getAllHrAttandance,
  getAttendance,
} from "../../redux/actions/AttendanceAction";

import Table from "../../component/DashboardComponents/Table";
import { getHrTeamMembers } from "../../redux/actions/HrActions";
const HrAttendence = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.login);
  const { attendances } = useSelector((state) => state.attendances);
  const { employees } = useSelector((state) => state.employees);
  const [isEmp, setEmp] = useState(null);
  const [employesToshow, setemployesToshow] = useState(null);
  const {teamMembers}=useSelector((state)=>state.Hrteams)

  // Fake attendance data for demonstration
  const attendanc = [
    {
      _id: "1",
      avatar: { url: "https://randomuser.me/api/portraits/men/1.jpg" },
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      designation: "Software Engineer",
      designationLevel: "Senior",
      isActive: true,
      attendance: {
        timeTracking: [{ timeIn: "09:00 AM", timeOut: "05:00 PM" }],
        totalWorkingHours: "8 hours",
      },
    },
    {
      _id: "2",
      avatar: { url: "https://randomuser.me/api/portraits/women/2.jpg" },
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      designation: "UX Designer",
      designationLevel: "Mid-Level",
      isActive: false,
      attendance: {
        timeTracking: [{ timeIn: "10:00 AM", timeOut: "06:00 PM" }],
        totalWorkingHours: "7 hours",
      },
    },
  ];

  const dispatch = useDispatch();
  const privateAxios = useAxiosPrivate();

  useEffect(() => {
    if (!employees) {
      dispatch(getEmployees({ accessToken: user.accessToken, privateAxios }));
    } else {
      const foundEmp = employees.find((e) => e.userId === user._id);
      setEmp(foundEmp || null);
    }

    dispatch(getAttendance({ privateAxios, accessToken: user.accessToken }));

    dispatch(
      getAllHrAttandance({ privateAxios, accessToken: user.accessToken }),
    );
    dispatch(
      getHrTeamMembers({privateAxios, accessToken: user?.accessToken,id:user?._id})
    )
  }, [employees, user.accessToken, dispatch, privateAxios]);

  // // Filtering HR Team
  // const HrTeam =
  //   isEmp?.AssignedTeamsToHR.length > 0
  //     ? employees.filter((e) =>
  //       isEmp?.AssignedTeamsToHR?.includes(e.employeeTeam),
  //     )
  //     : [];
  // Filtering HR Team's Attendance
  const HrTeamAttendance = attendances.filter((obj) =>
    teamMembers?.Employees?.some((member) => member.userId === obj.userId),
  );

  const [filter, setFilter] = useState("present"); // State for filtering

  // Filter the data based on the selected tab
  const filteredAttendances = HrTeamAttendance?.filter((user) => {
    if (filter === "present") return user.isActive === true;
    if (filter === "absent") return user.isActive === false;
    if (filter === "lateLogin")
      return user.isMorningLate || user.isAfternoonLate;
    if (filter === "earlyLogout")
      return user.isMorningEarlyLogout || user.isAfternoonEarlyLogout;
    return true; // For 'all'
  });

  return (
    <div style={{ marginTop: "30px" }}>
      {/* Tabs for filtering */}
      <div className="flex justify-start mb-6">
        <div className="flex space-x-4 bg-gray-100 rounded-lg p-2 shadow-md">
          <button
            className={`py-2 px-4 rounded-lg text-sm font-medium transition ${filter === "present"
                ? "bg-green-300 text-green-600"
                : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            onClick={() => setFilter("present")}
          >
            Present
          </button>
          <button
            className={`py-2 px-4 rounded-lg text-sm font-medium transition ${filter === "absent"
                ? "bg-red-300 text-red-600"
                : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            onClick={() => setFilter("absent")}
          >
            Absent
          </button>
          <div className="border border-gray-300"></div>
          <button
            className={`py-2 px-4 rounded-lg text-sm font-medium transition ${filter === "lateLogin"
                ? "bg-gray-300 text-gray-600"
                : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            onClick={() => setFilter("lateLogin")}
          >
            Late Login
          </button>
          <button
            className={`py-2 px-4 rounded-lg text-sm font-medium transition ${filter === "earlyLogout"
                ? "bg-gray-300 text-gray-600"
                : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            onClick={() => setFilter("earlyLogout")}
          >
            Early Logout
          </button>
          <div className="border border-gray-300"></div>
          <button
            className={`py-2 px-4 rounded-lg text-sm font-medium transition ${filter === "all"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
        </div>
      </div>

      {/* Attendance Table */}
      <Table
        TableTitle={"Attendance"}
        TableHeaderData={[
          "Employee",
          "Name",
          "Designation",
          "LEVEL",
          "Status",
          "LOGIN",
          "LOGOUT",
          "DURATION",
          "HISTORY",
        ]}
        employesToshow={filteredAttendances}
        setemployesToshow={setemployesToshow}
      >
        <tbody>
          {employesToshow?.map((Datum, index) => (
            <tr key={index}>
              <td>
                <div
                  className="dashboard-table-info"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/dashboard/user-profile/${Datum._id}`)
                  }
                >
                  <img
                    src={Datum.avatar.url}
                    alt={Datum.firstName}
                    className="dashboard-author-avatar"
                  />
                </div>
              </td>
              <td>
                <div>
                  <div className="dashboard-table-name font-bold">
                    {Datum.firstName} {Datum.lastName}
                  </div>
                  <div className="dashboard-table-email text-sm">
                    {Datum.email}
                  </div>
                </div>
              </td>
              <td>
                <div className="text-sm font-semibold">{Datum.designation}</div>
              </td>
              <td>
                <div className="text-sm">{Datum.designationLevel}</div>
              </td>
              <td>
                <div className="flex flex-col gap-1">
                  <span
                    className={`bg-green-200 text-green-700 rounded-lg inline-flex items-center  text-sm lg:text-md py-1 px-2 ${Datum.isActive ? "online" : "offline"}`}
                  >
                    {Datum.isActive ? "PRESENT" : "ABSENT"}
                  </span>
                  {Datum?.isMorningLate && (
                    <span className="bg-gray-200 text-gray-700 rounded-lg inline-flex items-center text-sm lg:text-md py-1 px-2">
                      LATE-LOGIN Morning
                    </span>
                  )}
                  {Datum?.isAfternoonLate && (
                    <span className="bg-gray-200 text-gray-700 dashboard-status-badge inline-flex items-center  text-sm lg:text-md py-1 px-2">
                      LATE-LOGIN Afternoon
                    </span>
                  )}
                  {Datum?.isMorningEarlyLogout && (
                    <span className="bg-gray-200 text-gray-700 inline-flex items-center  text-sm lg:text-md py-1 px-2">
                      EARLY-LOGOUT Morning
                    </span>
                  )}
                  {Datum?.isAfternoonEarlyLogout && (
                    <span className="bg-gray-200 text-gray-700 inline-flex items-center  text-sm lg:text-md py-1 px-2">
                      EARLY-LOGOUT Afternoon
                    </span>
                  )}
                </div>
              </td>
              <td className="text-sm">
                {Datum.attendance
                  ? Datum.attendance.timeTracking[0]?.timeIn
                  : "unavailable"}
              </td>
              <td className="text-sm">
                {Datum.attendance?.timeTracking?.length > 0
                  ? Datum.attendance.timeTracking[
                    Datum.attendance.timeTracking.length - 1
                  ].timeOut
                    ? Datum.attendance.timeTracking[
                      Datum.attendance.timeTracking.length - 1
                    ].timeOut
                    : "working"
                  : "unavailable"}
              </td>
              <td>
                <button className="text-sm font-bold text-gray-500">
                  {Datum.attendance?.totalWorkingHours || "unavailable"}
                </button>
              </td>
              <td>
                <button
                  className="dashboard-table-edit-button"
                  onClick={() =>
                    navigate(`/dashboard/user-profile/${Datum._id}`)
                  }
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default HrAttendence;
