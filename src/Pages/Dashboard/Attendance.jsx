import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getAttendance } from "../../redux/actions/AttendanceAction";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import Table from "../../component/DashboardComponents/Table";

const Attendence = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.login);
  const { attendances } = useSelector((state) => state.attendances);
  const [employesToshow, setemployesToshow] = useState(null);

  const dispatch = useDispatch();
  const privateAxios = useAxiosPrivate();

  const [filter, setFilter] = useState("present"); // State for filtering
  // console.log(attendances);

  const filteredAttendances = employesToshow?.filter((user) => {
    if (filter === "present") return user.isActive === true;
    if (filter === "absent") return user.isActive === false;
    if (filter === "lateLogin")
      return user.isMorningLate || user.isAfternoonLate;
    if (filter === "earlyLogout")
      return user.isMorningEarlyLogout || user.isAfternoonEarlyLogout;

    return true; // Default case for 'all'
  });

  useEffect(() => {
    dispatch(getAttendance({ privateAxios, accessToken: user.accessToken }));
  }, [dispatch, privateAxios]);

  // console.log(attendances);

  return (
    <div style={{ marginTop: "30px" }}>
      {/* Tabs for filtering */}
      <div className="flex justify-start flex-row gap-1">
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
        employesToshow={attendances}
        setemployesToshow={setemployesToshow}
      >
        <tbody>
          {filteredAttendances?.map((Datum, index) => (
            <tr key={index}>
              {/* User Avatar */}
              <td>
                <div
                  className="dashboard-table-info cursor-pointer"
                  onClick={() =>
                    navigate(`/dashboard/user-profile/${Datum?._id}`)
                  }
                >
                  <img
                    src={Datum?.avatar?.url}
                    alt={Datum?.firstName}
                    className="dashboard-author-avatar"
                  />
                </div>
              </td>

              {/* User Name & Email */}
              <td>
                <div>
                  <div className="dashboard-table-name font-bold">
                    {Datum?.firstName} {Datum?.lastName}
                  </div>
                  <div className="dashboard-table-email text-sm">
                    {Datum?.email}
                  </div>
                </div>
              </td>

              {/* Designation & Level */}
              <td className="text-sm font-semibold">{Datum?.designation}</td>
              <td className="text-sm">{Datum?.designationLevel}</td>

              {/* Attendance Status */}
              <td>
                <span
                  className={`dashboard-status-badge ${Datum?.isActive ? "online" : "offline"
                    }`}
                >
                  {Datum?.isActive ? "PRESENT" : "ABSENT"}
                </span>

                {Datum?.isMorningLate && (
                  <span className="bg-gray-200 text-gray-700 dashboard-status-badge">
                    LATE-LOGIN Morning
                  </span>
                )}
                {Datum?.isAfternoonLate && (
                  <span className="bg-gray-200 text-gray-700 dashboard-status-badge">
                    LATE-LOGIN Afternoon
                  </span>
                )}

                {Datum?.isMorningEarlyLogout && (
                  <span className="dashboard-status-badge">
                    EARLY-LOGOUT Morning
                  </span>
                )}
                {Datum?.isAfternoonEarlyLogout && (
                  <span className="dashboard-status-badge">
                    EARLY-LOGOUT Afternoon
                  </span>
                )}
              </td>

              {/* Time Tracking */}
              <td className="text-sm">
                {Datum?.attendance?.timeTracking?.[0]?.timeIn || "unavailable"}
              </td>
              <td className="text-sm">
                {Datum?.attendance?.timeTracking?.length > 0
                  ? Datum?.attendance?.timeTracking?.at(-1)?.timeOut ||
                  "working"
                  : "unavailable"}
              </td>

              {/* Total Working Hours */}
              <td>
                <button className="text-sm font-bold text-gray-500">
                  {Datum?.attendance?.totalWorkingHours || "unavailable"}
                </button>
              </td>

              {/* Details Button */}
              <td>
                <button
                  className="dashboard-table-edit-button"
                  onClick={() =>
                    navigate(`/dashboard/user-profile/${Datum?._id}`)
                  }
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>{" "}
      </Table>
    </div>
  );
};

export default Attendence;
