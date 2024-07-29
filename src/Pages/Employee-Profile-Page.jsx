import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Profile.css";
import { FaFilePdf } from "react-icons/fa";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById } from "../redux/actions/EmployeeAction";
import pdf from "../assets/malhar.pdf";
import img from '../assets/Hero.jpg';

function EmployeeProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const privateAxios = useAxiosPrivate();

  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Personal Details");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user } = useSelector((state) => state.login);
  const { employee, isLoading } = useSelector((state) => state.employees);
  const [isOpen, setIsOpen] = useState(false);

  const togglePDFViewer = () => {
    setIsOpen(!isOpen);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      togglePDFViewer();
    }
  };

  useEffect(() => {
    dispatch(
      getEmployeeById({ privateAxios, accessToken: user.accessToken, id })
    );
  }, [id]);

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
        <div className="profile-page">
          <div className="dropdown-wrapper">
            <button
              className="dropdown-btn"
              style={{ backgroundColor: "#007bff" }}
              onClick={toggleDropdown}
            >
              Menu
            </button>
            {dropdownOpen && (
              <div className="dropdown-content">
                <ul>
                  <li onClick={() => handleTabClick("Account")}>
                    Personal Details
                  </li>
                  <li onClick={() => handleTabClick("Employee Info")}>
                    Employee Info
                  </li>
                  <li onClick={() => handleTabClick("Notifications")}>
                    Dosuments Submitted
                  </li>
                  <li onClick={() => handleTabClick("Saved")}>Leaves</li>
                </ul>
              </div>
            )}
          </div>
          <main className="profile-main">
            <div className="profile-header">
              <div className="profile-picture">
                <img src={employee?.avatar?.url} alt="John Soo" />
                <h3
                  style={{ marginTop: "70px", marginLeft: "10px" }}
                >{`${employee?.firstName} ${employee?.lastName}`}</h3>
              </div>
              {user?.role === "employee" && (
                <button
                  onClick={() => navigate("/apply-leave")}
                  className="btn"
                >
                  Apply Leave
                </button>
              )}
            </div>
            <section className="profile-info">
              <p>{employee?.description}</p>
            </section>

            <nav className="tab-menu">
              <ul>
                <li
                  className={activeTab === "Personal Details" ? "active" : ""}
                  onClick={() => setActiveTab("Personal Details")}
                >
                  Personal Details
                </li>
                <li
                  className={activeTab === "Employee Info" ? "active" : ""}
                  onClick={() => setActiveTab("Employee Info")}
                >
                  Employee Info
                </li>
                <li
                  className={
                    activeTab === "Dosuments Submitted" ? "active" : ""
                  }
                  onClick={() => setActiveTab("Dosuments Submitted")}
                >
                  Dosuments Submitted
                </li>
                <li
                  className={activeTab === "Leaves" ? "active" : ""}
                  onClick={() => setActiveTab("Leaves")}
                >
                  Leaves
                </li>
              </ul>
            </nav>

            <section className="account-details">
              {activeTab === "Personal Details" && (
                <div
                  className="detail-group"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr auto",
                    gridTemplateRows: "1fr 1fr auto",
                  }}
                >
                  <div className="detail-item">
                    <label>Name</label>
                    <p>{`${employee?.firstName} ${employee?.lastName}`}</p>
                  </div>
                  <div className="detail-item">
                    <label>Father Name</label>
                    <p>{employee?.fatherName}</p>
                  </div>
                  <div className="detail-item">
                    <label>Mobile Number</label>
                    <p>{employee?.phoneNo}</p>
                  </div>
                  <div className="detail-item">
                    <label>E-mail</label>
                    <p>{employee?.email}</p>
                  </div>
                  <div className="detail-item">
                    <label>Mother Name</label>
                    <p>{employee?.motherName}</p>
                  </div>
                  <div className="detail-item">
                    <label>Address</label>
                    <p>{employee?.address}</p>
                  </div>
                </div>
              )}

              {activeTab === "Employee Info" && (
                <div
                  className="detail-group"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr auto",
                    gridTemplateRows: "1fr 1fr auto",
                  }}
                >
                  <div className="detail-item">
                    <label>Employee ID</label>
                    <p>{employee?.employeeId}</p>
                  </div>
                  <div className="detail-item">
                    <label>Designation</label>
                    <p>{employee?.designation}</p>
                  </div>
                  <div className="detail-item">
                    <label>Designation Level</label>
                    <p>{employee?.designationLevel}</p>
                  </div>
                  <div className="detail-item">
                    <label>Working Shift</label>
                    <p>{employee?.Shift}</p>
                  </div>
                  <div className="detail-item">
                    <label>Joining Date</label>
                    <p>{joiningDate}</p>
                  </div>
                </div>
              )}

              {activeTab === "Dosuments Submitted" && (
                <div className="p-4 bg-white">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">
                    Documents Submitted
                  </h3>
                  <div className="relative">
                    <img
                      src={img}
                      alt="PDF Thumbnail"
                      className="w-16 h-16 sm:w-24 sm:h-24 cursor-pointer"
                      onClick={togglePDFViewer}
                    />
                    {isOpen && (
                      <div
                        className="fixed inset-0 bg-gray-900 bg-opacity-80 z-50 flex items-center justify-center p-2 sm:p-4 sm:w-full sm:h-screen"
                        onClick={handleBackdropClick}
                      >
                        <div className="relative w-full h-full sm:max-w-screen-lg sm:max-h-screen bg-white rounded-lg shadow-lg overflow-y-auto sm:overflow-y-hidden">
                          <iframe
                            src={pdf}
                            className="w-full h-80 sm:h-full border-none"
                            title="Document Preview"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "Leaves" && (
                <div className="detail-group">
                  <h3>Leaves</h3>
                  <p>Leaves content goes here.</p>
                </div>
              )}
            </section>

            {user?.role === "admin" && (
              <div className="account-actions">
                <button className="btn delete-btn">Remove Employee</button>
              </div>
            )}
          </main>
        </div>
      )}
    </>
  );
}

export default EmployeeProfile;
