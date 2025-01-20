import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById } from "../redux/actions/EmployeeAction";
import { getEmployeeWorkingHours, employeeWeeklyandMonthlyAttendance } from "../redux/actions/AttendanceAction";
import convertSecondsToHHMMSS from "../utils/convertSecondsToHHMMSS";
import EmpLeaveInfo from "../component/EmpLeaveInfo";
import { toast } from "react-hot-toast";

function EmployeeProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const privateAxios = useAxiosPrivate();

  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Personal Details");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [totalWorkingHours, setTotalWorkingHours] = useState(null);
  const { user } = useSelector((state) => state.login);
  const { employee, isLoading } = useSelector((state) => state.employees);
  const { WeeklyandMonthlyAttendance } = useSelector((state) => state.attendances);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  // console.log("employee : ", employee);
  // console.log("workingHours : ", workingHours);
  // console.log(user);


  // console.log(WeeklyandMonthlyAttendance);`

  useEffect(() => {
    if (user.role === 'hr') {
      dispatch(
        getEmployeeById({ privateAxios, accessToken: user.accessToken, id: user._id })
      );
    } else {
      dispatch(
        getEmployeeById({ privateAxios, accessToken: user.accessToken, id })
      );
    }
    if(user.role === "employee"){
      dispatch(employeeWeeklyandMonthlyAttendance({ privateAxios, accessToken: user.accessToken, id: user._id }));}
  }, [id, user.accessToken, dispatch, privateAxios]);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 640);
  };
  // console.log("user: ", user)
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (WeeklyandMonthlyAttendance?.today < 7.5 * 3600) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src={employee?.avatar?.url}
                  alt={employee?.firstName}
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {employee?.firstName} {employee?.lastName}, your working time is low today
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  You need to complete more hours today.
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
    } else if (WeeklyandMonthlyAttendance?.today >= 7.5 * 3600) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src={employee?.avatar?.url}
                  alt={employee?.firstName}
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {employee?.firstName} {employee?.lastName}, your working hours are completed
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  You have completed your required working hours for today.
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
    }
  }, [WeeklyandMonthlyAttendance?.today, employee]);


  const joiningDate = new Date(employee?.createdAt).toDateString();

  return (
    <>
      {!isLoading && (
        <div className="profile-page w-full flex flex-col items-center mt-14 mb-16">
          <div className="profile-main w-full max-w-3xl md:min-w-2xl lg:max-w-6xl p-8 mt-14 rounded-lg bg-light-green shadow-md">
            <div className="profile-header flex flex-col sm:flex-row items-center mb-6">
              <div className="profile-picture flex flex-col items-center sm:items-start justify-center mb-4 sm:mb-0">
                <img
                  src={employee?.avatar?.url}
                  alt="Employee"
                  className="w-32 h-32 rounded-full border-4 border-custom-green"
                />
                <h3 className="mt-2 sm:mt-4 md:mt-6 xl:mt-8 text-xl font-semibold text-gray-800 text-center sm:text-left">
                  {`${employee?.firstName} ${employee?.lastName}`}
                </h3>
              </div>



              {user?.role === "employee" && (
                <button
                  onClick={() => navigate("/apply-leave")}
                  className="btn bg-custom-green text-white px-6 py-2 rounded-md mt-4 sm:mt-0 sm:ml-auto sm:justify-center sm:items-center"
                >
                  Apply Leave
                </button>
              )}
            </div>

            <section className="profile-info text-gray-700 mb-6">
              <p className="text-lg">{employee?.description}</p>
            </section>

            <nav className={`tab-menu mb-6 ${isMobile ? "block" : "hidden sm:block"}`}>
              {isMobile ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="bg-custom-green text-white py-2 px-4 rounded-md"
                  >
                    {activeTab}
                  </button>
                  {dropdownOpen && (
                    <div className="absolute left-0 w-full bg-white shadow-md mt-2 rounded-md">
                      <ul>
                        {["Personal Details", "Employee Info", "Documents Submitted", "Leaves"].map((tab) => (
                          <li
                            key={tab}
                            onClick={() => handleTabClick(tab)}
                            className={`px-4 py-2 cursor-pointer ${activeTab === tab ? "bg-custom-green text-white" : ""}`}
                          >
                            {tab}
                          </li>
                        ))}
                        {user?.role === "employee" && (
                          <li
                            key="Attendance History"
                            className={`px-4 py-2 cursor-pointer ${activeTab === "Attendance History" ? "bg-custom-green text-white" : ""}`}
                            onClick={() => handleTabClick("Attendance History")}
                          >
                            Attendance History
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <ul className="flex justify-between border-b-2 border-custom-green">
                  {["Personal Details", "Employee Info", "Documents Submitted", "Leaves"].map((tab) => (
                    <li
                      key={tab}
                      className={`px-4 py-2 cursor-pointer ${activeTab === tab ? "text-custom-green border-b-2 border-custom-green font-bold" : ""}`}
                      onClick={() => handleTabClick(tab)}
                    >
                      {tab}
                    </li>
                  ))}
                  {user?.role === "employee" && (
                    <li
                      key="Attendance History"
                      className={`px-4 py-2 ml-6 cursor-pointer ${activeTab === "Attendance History" ? "text-custom-green border-b-2 border-custom-green font-bold" : ""}`}
                      onClick={() => handleTabClick("Attendance History")}
                    >
                      Attendance History
                    </li>
                  )}
                </ul>
              )}
            </nav>

            {/* Tab Content */}
            <section className="account-details">
              {activeTab === "Personal Details" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="detail-item">
                    <label className="font-bold">Name</label>
                    <p>{`${employee?.firstName} ${employee?.lastName}`}</p>
                  </div>
                  <div className="detail-item">
                    <label className="font-bold">Father Name</label>
                    <p>{employee?.fatherName}</p>
                  </div>
                  <div className="detail-item">
                    <label className="font-bold">Mobile Number</label>
                    <p>{employee?.phoneNo}</p>
                  </div>
                  <div className="detail-item">
                    <label className="font-bold">Email</label>
                    <p>{employee?.email}</p>
                  </div>
                  <div className="detail-item">
                    <label className="font-bold">Mother Name</label>
                    <p>{employee?.motherName}</p>
                  </div>
                  <div className="detail-item">
                    <label className="font-bold">Address</label>
                    <p>{employee?.address}</p>
                  </div>
                </div>
              )}

              {activeTab === "Employee Info" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="detail-item">
                    <label className="font-bold">Employee ID</label>
                    <p>{employee?.employeeId}</p>
                  </div>
                  <div className="detail-item">
                    <label className="font-bold">Designation</label>
                    <p>{employee?.designation}</p>
                  </div>
                  <div className="detail-item">
                    <label className="font-bold">Designation Level</label>
                    <p>{employee?.designationLevel}</p>
                  </div>
                  <div className="detail-item">
                    <label className="font-bold">Working Shift</label>
                    <p>{employee?.shift || "Morning"}</p>
                  </div>
                  <div className="detail-item">
                    <label className="font-bold">Joining Date</label>
                    <p>{joiningDate}</p>
                  </div>
                </div>
              )}

              {activeTab === "Documents Submitted" && (
                <div>
                  <h3 className="text-lg font-semibold">Documents Submitted</h3>
                  <div className="mt-4 flex items-center">
                    <FaFilePdf className="text-red-500 text-2xl" />
                    <p className="ml-2">PDF Document</p>
                  </div>
                </div>
              )}

              {activeTab === "Leaves" && (
                <div>
                  {/* <h3 className="text-lg font-semibold">Leaves</h3>
                  <p>Leave information goes here.</p> */}
                  <EmpLeaveInfo />

                </div>
              )}

              {activeTab === "Attendance History" && (
                <div>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left">Description</th>
                        <th className="px-4 py-2 text-left">Working Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="px-4 py-2 font-bold text-sm">Total Working Hours Today</td>
                        <td className="px-4 py-2 text-sm">{convertSecondsToHHMMSS(WeeklyandMonthlyAttendance?.today) || "00:00:00"}</td>
                      </tr>

                      <tr className="border-t">
                        <td className="px-4 py-2 font-bold text-sm">Total Working Hours This Week</td>
                        <td className="px-4 py-2 text-sm">{convertSecondsToHHMMSS(WeeklyandMonthlyAttendance?.thisWeek) || "00:00:00"}</td>
                      </tr>

                      <tr className="border-t">
                        <td className="px-4 py-2 font-bold text-sm">Total Working Hours This Month</td>
                        <td className="px-4 py-2 text-sm">{convertSecondsToHHMMSS(WeeklyandMonthlyAttendance?.thisMonth) || "00:00:00"}</td>
                      </tr>

                      <tr>
                        <td className="px-4 py-2 font-bold text-sm">Total Working Hours Overall</td>
                        <td className="px-4 py-2 text-sm">{convertSecondsToHHMMSS(WeeklyandMonthlyAttendance?.totalWorkingHours) || "00:00:00"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}


            </section>

            {user?.role === "admin" && (
              <div className="account-actions flex justify-end mt-6">
                <button className="btn bg-red-600 text-white px-6 py-2 rounded-md">
                  Remove Employee
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default EmployeeProfile;
