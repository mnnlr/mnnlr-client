import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { designations, designationPrefixes } from "../../utils/Designations";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { updateEmployee } from "../../redux/actions/EmployeeAction";
import useApi from "../../hooks/useApi";

const EditEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const privateAxios = useAxiosPrivate();
  const { sendRequest } = useApi();

  const [employeePrevData, setEmployeePrevData] = useState({});
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [uploadedDocuments, setSelectedFile] = useState({});
  const [selectedShifts, setSelectedShifts] = useState([]);
  const [selectedShiftsForManager, setSelectedShiftsForManager] = useState([]);

  const { user } = useSelector((state) => state.login);
  const { isLoading, message, error, employees } = useSelector(
    (state) => state.employees
  );

  // console.log(employeePrevData)

  // Define designation levels
  const levels = ["L0", "L1", "L2", "L3"];

  // Fetch and set previous employee data when `id` or `employees` changes
  useEffect(() => {
    if (id && employees) {
      const employee = employees.find((employee) => employee?._id === id);
      if (employee) {
        setEmployeePrevData(employee);
      }
    }
  }, [id, employees]);

  const [empInfo, setEmpInfo] = useState();

  useEffect(() => {
    const fetchEmpInfo = async () => {
      const res = await sendRequest({
        url: `/api/v1/users`,
      })
      const emp = res.users.find((emp) => emp._id === employeePrevData.userId)
      // console.log("emp : ", emp.role)
      setEmpInfo(emp)
    }
    fetchEmpInfo()
  }, [employeePrevData])

  // console.log("empInfo: ", empInfo.role)

  // Handle input changes for employee details
  const handleEmployeeDetails = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file uploads with size validation
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file.size > 512000) {
      alert("File size should be less than 500KB");
      event.target.value = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedFile((prev) => ({
          ...prev,
          [event.target.name]: reader.result,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (employeePrevData && employeePrevData.AssignShiftsToHR) {
      setSelectedShifts(employeePrevData.AssignShiftsToHR);
    }

    if (employeePrevData && employeePrevData.AssignShiftsToManager) {
      setSelectedShiftsForManager(employeePrevData.AssignShiftsToManager);
    }
  }, [employeePrevData]);

  // Generate Employee ID based on designation, level, and email
  const handleGenerateId = (e) => {
    e.preventDefault();

    const designation =
      employeeDetails.designation || employeePrevData.designation;
    const designationLevel =
      employeeDetails.designationLevel || employeePrevData.designationLevel;
    const email = employeeDetails.email || employeePrevData.email;

    if (!designation) {
      alert("Please select designation");
      return;
    }

    if (!designationLevel) {
      alert("Please select designation level");
      return;
    }

    if (!email) {
      alert("Please enter email");
      return;
    }

    const prefix =
      designationPrefixes[designation] ||
      designation.substring(0, 4).toUpperCase();

    if (!prefix) {
      alert("Invalid designation for generating prefix");
      return;
    }

    const result = `${prefix}-${designationLevel}-${email}`;
    setEmployeeDetails((prev) => ({ ...prev, employeeId: result }));
  };

  // Handle form submission to update employee
  const handleUpdateEmployee = async (e) => {
    e.preventDefault();

    const updatedFields = {};
    Object.keys(employeeDetails).forEach((key) => {
      if (employeeDetails[key] !== employeePrevData[key]) {
        updatedFields[key] = employeeDetails[key];
      }
    });

    const myForm = new FormData();
    Object.entries({ ...updatedFields, ...uploadedDocuments }).forEach(
      ([key, value]) => {
        if (key !== "previewUrl") {
          myForm.append(key, value);
        }
      }
    );

    // console.log(selectedShifts)

    if (empInfo?.role === "hr") {
      // Append HR selectedShifts to the form data
      if (selectedShifts.length === 0) {
        alert("Please select at least one shift for HR.")
      } else {
        selectedShifts.forEach((shift) => myForm.append("AssignShiftsToHR", shift));
      }
    } else {
      // Append Manager selectedShifts to the form data
      if (selectedShiftsForManager.length === 0) {
        alert("Please select at least one shift for Manager.")
      } else {
        selectedShiftsForManager.forEach((shift) => myForm.append("AssignShiftsToManager", shift));
      }
    }
    console.log("selectedShiftsForManager: ", selectedShiftsForManager)

    const employeeId = employeePrevData._id;

    dispatch(
      updateEmployee({
        privateAxios,
        data: myForm,
        id: employeeId,
        accessToken: user?.accessToken,
      })
    );
  };

  // handle shift access adding and removing for hr
  const handleShiftChange = (e, shift) => {
    if (e.target.checked) {
      setSelectedShifts((prev) => [...prev, shift]); // Add selected shift
    } else {
      setSelectedShifts((prev) => prev.filter((item) => item !== shift)); // Remove unselected shift
    }
  };

  // handle shift access adding and removing for manager
  const handleShiftChangeForManager = (e, shift) => {
    if (e.target.checked) {
      setSelectedShiftsForManager((prev) => [...prev, shift]); // Add selected shift
    } else {
      setSelectedShiftsForManager((prev) => prev.filter((item) => item !== shift)); // Remove unselected shift
    }
  };

  // console.log(empInfo)


  return (
    <div className="min-h-screen bg-white flex justify-center rounded-lg shadow-lg items-center p-4 mt-6">
      <form
        className="min-h-screen bg-white p-6 rounded-lg w-full max-w-10xl"
        onSubmit={handleUpdateEmployee}
      >
        <div className="flex flex-col lg:flex-row-reverse">
          {/* Profile Image Section */}
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0 flex flex-col items-center lg:items-start lg:mr-6">
            <div className="mb-6 lg:ml-20">
              <h3 className="text-lg font-medium mb-2">Profile Image</h3>
              <p className="mt-1 mb-4 text-sm text-gray-500 text-left lg:text-left lg:text-m">
                Image must be at least 500x500px and no larger than 5MB.
              </p>
              <img
                className="h-32 w-32 mb-4"
                src={uploadedDocuments?.avatar ?? employeePrevData?.avatar?.url}
                alt="Profile"
              />
              <input
                type="file"
                className="hidden"
                name="avatar"
                id="profileImageUpload"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label
                htmlFor="profileImageUpload"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                Choose File
              </label>
            </div>
            {((user?.role === "admin" || user?.role === "manager") && empInfo?.role === "hr") &&
              <div className="w-full flex flex-col items-end justify-center mt-7">
                <div className="p-4 flex justify-end flex-wrap">
                  <label className="block mb-2 text-sm font-medium text-gray-700 w-full md:w-auto text-right">
                    Assign Shifts to HR
                  </label>
                  <div className="w-full md:w-auto flex flex-wrap justify-end gap-2">
                    {["Morning", "Afternoon", "Evening", "Night"].map((shift) => (
                      <label
                        key={shift}
                        className={`flex items-center gap-2 cursor-pointer border-2 border-gray-300 rounded-lg bg-white hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500 transition duration-200 ${selectedShifts.includes(shift.toLowerCase()) ? "bg-blue-500 text-white" : ""}`}
                      >
                        <input
                          type="checkbox"
                          value={shift.toLowerCase()}
                          className="hidden peer"
                          checked={selectedShifts.includes(shift.toLowerCase())} // Make the checkbox checked if shift is selected
                          onChange={(e) => handleShiftChange(e, shift.toLowerCase())}
                        />
                        <span className="peer-checked:bg-blue-500 peer-checked:text-white select-none rounded-lg px-4 py-2 transition duration-200">
                          {shift}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>}
            {(user?.role === "admin" && empInfo?.role === "manager") &&
              <div className="flex flex-col w-full items-end justify-center mt-7">
                <div className="p-4 flex justify-end flex-wrap">
                  <label className="block mb-2 text-sm font-medium text-gray-700 w-full md:w-auto text-center">
                    Assign Shifts to manager
                  </label>
                  <div className="w-full md:w-auto flex flex-wrap justify-end gap-2">
                    {["Morning", "Afternoon", "Evening", "Night"].map((shift) => (
                      <label
                        key={shift}
                        className={`flex items-center gap-2 cursor-pointer border-2 border-gray-300 rounded-lg bg-white hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500 transition duration-200 ${selectedShiftsForManager.includes(shift.toLowerCase()) ? "bg-blue-500 text-white" : ""}`}
                      >
                        <input
                          type="checkbox"
                          value={shift.toLowerCase()}
                          className="hidden peer"
                          checked={selectedShiftsForManager.includes(shift.toLowerCase())} // Make the checkbox checked if shift is selected
                          onChange={(e) => handleShiftChangeForManager(e, shift.toLowerCase())}
                        />
                        <span className="peer-checked:bg-blue-500 peer-checked:text-white select-none rounded-lg px-4 py-2 transition duration-200">
                          {shift}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>}
          </div>

          {/* Personal Information and Documents Section */}
          <div className="w-full lg:w-2/3">
            {/* Personal Information */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    value={
                      employeeDetails.firstName ||
                      employeePrevData.firstName ||
                      ""
                    }
                    name="firstName"
                    onChange={handleEmployeeDetails}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    value={
                      employeeDetails.lastName ||
                      employeePrevData.lastName ||
                      ""
                    }
                    name="lastName"
                    onChange={handleEmployeeDetails}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                {/* Father Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Father Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Father Name"
                    value={
                      employeeDetails.fatherName ||
                      employeePrevData.fatherName ||
                      ""
                    }
                    name="fatherName"
                    onChange={handleEmployeeDetails}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                {/* Mother Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mother Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Mother Name"
                    value={
                      employeeDetails.motherName ||
                      employeePrevData.motherName ||
                      ""
                    }
                    name="motherName"
                    onChange={handleEmployeeDetails}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email Address"
                    value={
                      employeeDetails.email || employeePrevData.email || ""
                    }
                    name="email"
                    onChange={handleEmployeeDetails}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Phone Number"
                    value={
                      employeeDetails.phoneNo || employeePrevData.phoneNo || ""
                    }
                    name="phoneNo"
                    onChange={handleEmployeeDetails}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Enter Full Address"
                  value={
                    employeeDetails.address || employeePrevData.address || ""
                  }
                  name="address"
                  onChange={handleEmployeeDetails}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {/* Description */}
              <div className="mt-[10px]">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Write something about the employee"
                  value={
                    employeeDetails.description ||
                    employeePrevData.description ||
                    ""
                  }
                  name="description"
                  onChange={handleEmployeeDetails}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-6 mb-5 mt-5">
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Shift
                  </label>
                  <input
                    type="text"
                    placeholder="Morning/Evening/Night"
                    value={
                      employeeDetails.shift ||
                      employeePrevData.shift ||
                      ""
                    }
                    onChange={handleEmployeeDetails}
                    name="shift"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div> */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Employee Shift
                  </label>
                  <select
                    value={
                      employeeDetails.shift ||
                      employeePrevData.shift ||
                      ""
                    }
                    onChange={handleEmployeeDetails}
                    name="shift"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select Shift</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                    <option value="night">Night</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date Of Joining
                  </label>
                  <input
                    type="date"
                    placeholder="DOJ"
                    onChange={handleEmployeeDetails}
                    value={
                      employeeDetails.dateofjoining ||
                      employeePrevData.dateofjoining ||
                      ""
                    }
                    name="dateofjoining"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Upload Documents */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Upload Documents</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
                {[
                  {
                    label: "Aadhar Card (PDF)",
                    name: "aadhar",
                    accept: "application/pdf",
                  },
                  {
                    label: "PAN Card (PDF)",
                    name: "pan",
                    accept: "application/pdf",
                  },
                  {
                    label: "Bank Detail (PDF)",
                    name: "Bank",
                    accept: "application/pdf",
                  },
                  { label: "PF (PDF)", name: "PF", accept: "application/pdf" },
                  {
                    label: "10th MarkSheet (PDF)",
                    name: "xthMarksheet",
                    accept: "application/pdf",
                  },
                  {
                    label: "12th MarkSheet (PDF)",
                    name: "xiithMarksheet",
                    accept: "application/pdf",
                  },
                  {
                    label: "Graduation MarkSheet (PDF)",
                    name: "graduationMarksheet",
                    accept: "application/pdf",
                  },
                  {
                    label: "PG MarkSheet (PDF)",
                    name: "pgMarksheet",
                    accept: "application/pdf",
                  },
                ].map((file, index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-gray-700 mb-2">{`Upload ${file.label}`}</label>
                    <input
                      type="file"
                      accept={file.accept}
                      name={file.name}
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {employeePrevData && employeePrevData[file.name] ? (
                      <div className="md:mt-2 rounded-full duration-300 ease-in-out hover:bg-blue-100 px-3 py-1">
                        Previous File:{" "}
                        <a
                          href={employeePrevData[file.name].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-blue-700 font-semibold"
                        >
                          {file.label}
                        </a>
                      </div>
                    ) : (
                      <div className="md:mt-2 rounded-full duration-300 ease-in-out hover:bg-blue-100 px-3 py-1">
                        Previous File:{" "}
                        <span className="text-gray-400">N/A</span>
                      </div>
                    )}
                  </div>
                ))}

                {/* Designation Selection */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Choose Designation
                  </label>
                  <select
                    value={
                      employeeDetails.designation ||
                      employeePrevData.designation ||
                      ""
                    }
                    onChange={(e) =>
                      setEmployeeDetails((prev) => ({
                        ...prev,
                        designation: e.target.value,
                      }))
                    }
                    className="block w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select Designation</option>
                    {designations.map((designation) => (
                      <option key={designation} value={designation}>
                        {designation}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Designation Level Selection */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Choose Designation Level
                  </label>
                  <select
                    value={
                      employeeDetails.designationLevel ||
                      employeePrevData.designationLevel ||
                      ""
                    }
                    onChange={(e) =>
                      setEmployeeDetails((prev) => ({
                        ...prev,
                        designationLevel: e.target.value,
                      }))
                    }
                    className="block w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select Level</option>
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Generate Employee ID Button */}
              <button
                type="button"
                onClick={handleGenerateId}
                className="w-full py-2 bg-black text-white font-semibold rounded mb-2"
              >
                Generate Virtual ID (Employee ID)
              </button>

              {/* Display Generated Employee ID */}
              {employeeDetails.employeeId && (
                <div className="mb-4 p-2 bg-gray-200 text-center rounded">
                  <p className="text-lg font-semibold">
                    {employeeDetails.employeeId}
                  </p>
                </div>
              )}

            </div>
            <div className="flex justify-end items-center mb-1">
              <div className="hidden lg:block">
                {!isLoading ? (
                  <button
                    type="submit"
                    className="px-7 py-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                ) : (
                  <p className="px-7 py-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700">
                    Updating employee...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
