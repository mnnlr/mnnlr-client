import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById } from "../redux/actions/EmployeeAction";
import { getEmployeeWorkingHours } from "../redux/actions/AttendanceAction";
import convertSecondsToHHMMSS from "../utils/convertSecondsToHHMMSS";

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
  const { workingHours } = useSelector((state) => state.attendances);

  useEffect(() => {
    dispatch(
      getEmployeeById({ privateAxios, accessToken: user.accessToken, id })
    );
    dispatch(getEmployeeWorkingHours({ privateAxios, accessToken: user.accessToken }));

    if (workingHours?.employeePerformances) {
      const t = workingHours?.employeePerformances?.map((e) => {
        return { time: e?.totalWorkingTime, id: e?._id }; 
      });
      
      const final = t?.reduce((acc, curr) => {
        acc[curr.id] = (acc[curr.id] || 0) + curr.time;
        return acc;
      }, {});

      if (final[id]) {
        setTotalWorkingHours(final[id]); 
      }
    }
  }, [id, user.accessToken, dispatch, privateAxios]); 

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setDropdownOpen(false);
  };

  const joiningDate = new Date(employee?.createdAt).toDateString();

  return (
    <>
      {!isLoading && (
        <div className="profile-page flex flex-col items-center mt-14 mb-16">
          <div className="profile-main w-full max-w-3xl p-8 mt-14 rounded-lg bg-light-green shadow-md">
            <div className="profile-header flex flex-col sm:flex-row items-center">
              <div className="profile-picture flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
                <img
                  src={employee?.avatar?.url}
                  alt="Employee"
                  className="w-32 h-32 rounded-full border-4 border-custom-green"
                />
                <h3 className="ml-4 text-xl font-semibold text-gray-800">
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

            <nav className="tab-menu mb-6">
              <ul className="flex justify-between border-b-2 border-white">
                <li
                  className={`px-4 py-2 cursor-pointer ${activeTab === "Personal Details" ? "text-custom-green border-b-2 border-custom-green font-bold" : ""}`}
                  onClick={() => setActiveTab("Personal Details")}
                >
                  Personal Details
                </li>
                <li
                  className={`px-4 py-2 cursor-pointer ${activeTab === "Employee Info" ? "text-custom-green border-b-2 border-custom-green font-bold" : ""}`}
                  onClick={() => setActiveTab("Employee Info")}
                >
                  Employee Info
                </li>
                <li
                  className={`px-4 py-2 cursor-pointer ${activeTab === "Documents Submitted" ? "text-custom-green border-b-2 border-custom-green font-bold" : ""}`}
                  onClick={() => setActiveTab("Documents Submitted")}
                >
                  Documents Submitted
                </li>
                <li
                  className={`px-4 py-2 cursor-pointer ${activeTab === "Leaves" ? "text-custom-green border-b-2 border-custom-green font-bold" : ""}`}
                  onClick={() => setActiveTab("Leaves")}
                >
                  Leaves
                </li>
              </ul>
            </nav>

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
                  <div className="detail-item">
                    <label className="font-bold">Total WorkingHours</label>
                    <p>{convertSecondsToHHMMSS(totalWorkingHours) || "00:00:00"}</p>
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
                  <h3 className="text-lg font-semibold">Leaves</h3>
                  <p>Leave information goes here.</p>
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
