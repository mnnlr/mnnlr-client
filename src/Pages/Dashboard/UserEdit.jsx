import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch,useSelector } from "react-redux";
// import { addEmployee } from "../../redux/actions/EmployeeAction";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const EditEmployee = () => {
  const {id} = useParams();
  console.log(id);
//   const dispatch = useDispatch();
//   const privateAxios = useAxiosPrivate();

  const [employeePrevData, setEmployeePrevData] = useState({});
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [uploadedDocuments, setSelectedFile] = useState({});

//   const {user} = useSelector(state => state.login);
  const {isLoading,message,error,employees} = useSelector(state => state.employees);
console.log(employees);
console.log(employeePrevData);
  useEffect(()=>{
    if(id){
        const employee = employees?.find((employee)=>employee?._id === id);
        setEmployeePrevData(employee);
    }
  },[id])

  const designations = [
    "MERN Stack Developer",
    "ReactJs Developer",
    "MongoDB Developer",
    "Backend Developer",
    "NodeJs Developer",
    "Frontend Developer",
    "Software Developer",
    "Java Developer",
    "React Native",
    "Java Android",
    "Python Developer",
    "Python Desktop Developer",
    "Digital Marketing",
    "Poster Designer",
    "Video Editor",
    "UI/UX Designer",
    "VOICE",
    "NON VOICE"
  ];

  const levels = ["L0", "L1", "L2", "L3"];

  const handleEmployeeDetails = (e) => {
    const {name,value} = e.target;
    setEmployeeDetails((prev)=>({...prev,[name]:value}));
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if(file.size > 512000){
      alert("File size should be less than 500KB");
      event.target.value = null;
      return;
    }

    if (file.size < 512000) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setSelectedFile((prev)=>({...prev,[event.target.name]:reader.result}));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateId = (e) => {
    e.preventDefault();

    if(!employeeDetails?.designation){
      alert('Please select designation');
      return;
    }
    if(!employeeDetails?.designationLevel){
      alert('Please select designation level');
      return;
    }

    if(!employeeDetails?.email){
      alert('Please enter email');
      return;
    }

    let result;

    if (employeeDetails?.designation === "MongoDB Developer") {
      result = "MDB DEV-" + employeeDetails?.designationLevel + "-" + employeeDetails?.email;
    }

    if (employeeDetails?.designation === "Backend Developer") {
      result = "BCKND DEV-" + employeeDetails?.designationLevel + "-" + employeeDetails?.email;
    }

   if (employeeDetails?.designation === "NodeJs Developer") {
     result = "NODEV-" + employeeDetails?.designationLevel + "-" + employeeDetails?.email;
   }

    if (employeeDetails?.designation === "ReactJs Developer") {
      result = "REACT-DEV-" + employeeDetails?.designationLevel + "-" + employeeDetails?.email;
    }

    if (employeeDetails?.designation === "Frontend Developer") {
      result = "F-DEV" + employeeDetails?.designationLevel + "-" + employeeDetails?.email;
    }

    if (employeeDetails?.designation === "Software Developer") {
      result = "SOFT-DEV-" + employeeDetails?.designationLevel + "-" + employeeDetails?.email;
    }

    if (employeeDetails?.designation === "Java Developer") {
      result = "JAVA-DEV-" + employeeDetails?.designationLevel + "-" + employeeDetails?.email;
    }

    if (employeeDetails?.designation === "MERN Stack Developer") {
      result = "MERN-DEV-" + employeeDetails?.designationLevel + "-" + employeeDetails?.email;
    }
    if (employeeDetails?.designation === "React Native") {
      result = "RN-DEV-" + employeeDetails?.designationLevel + "-" + employeeDetails?.email;
    }

    if (employeeDetails?.designation === "Java Android") {
      result = "JAVA-APP-DEV-" + employeeDetails?.designationLevel + "-" + employeeDetails?.email;
    }

    if (employeeDetails?.designation === "Python Developer") {
      result = "P-DEV-" + employeeDetails?.designationLevel + "-" + employeeDetails?.email;
    }

    if (employeeDetails?.designation === "Python Desktop Developer") {
      result = "P-DES-" + employeeDetails?.designationLevel + "-" + employeeDetails?.email;
    }

    if (employeeDetails?.designation === "Digital Marketing") {
      result = "DM-" + employeeDetails?.designationLevel + "-" + employeeDetails?.email;
    }

    if (employeeDetails?.designation === "Poster Designer") {
      result = "POS-DEG-" + employeeDetails?.designationLevel + "-" + employeeDetails?.email;
    }

    if (employeeDetails?.designation === "Video Editor") {
      result = "VID-ED-" + employeeDetails?.designationLevel + "-" + employeeDetails?.email;
    }

    if (employeeDetails?.designation === "UI/UX Designer") {
      result = "UIX-" + employeeDetails?.designationLevel + "-" + employeeDetails?.email;
    }

    if (employeeDetails?.designation === "VOICE") {
      result = "TEL-CAL-" + employeeDetails?.designationLevel + "-" + employeeDetails?.email;
    }

    if (employeeDetails?.designation === "NON VOICE") {
      result = "TEL-NV-" + employeeDetails?.designationLevel + "-" + employeeDetails?.email;
    }

    if (employeeDetails?.designation && employeeDetails?.designationLevel) {
      setEmployeeDetails((prev)=>({...prev,employeeId:result}));
    }
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    Object.entries({...employeeDetails,...uploadedDocuments}).forEach(([key, value]) => {
      if(key !== 'previewUrl'){
        myForm.append(key, value);
      }
    });

    console.log({...employeeDetails,...uploadedDocuments});

    // dispatch(addEmployee({privateAxios, data:myForm,accessToken:user?.accessToken}));
    
  }
  
  return (
    <div className="min-h-screen bg-white flex justify-center rounded-lg shadow-lg items-center p-4 mt-6">
      <form className="min-h-screen bg-white p-6 rounded-lg w-full max-w-10xl">
        <div className="flex justify-end items-center mb-6">
          <div className="hidden lg:block">
            {!isLoading?<button
              type="submit"
              onClick={handleAddEmployee}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
            >
              Save Changes
            </button>:<p className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700">updating employee...</p>}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row-reverse">
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0 flex flex-col items-center lg:items-start lg:mr-6">
            <div className="mb-6 lg:ml-20">
              <h3 className="text-lg font-medium mb-2">Profile image</h3>
              <p className="mt-1 mb-4 text-sm text-gray-500 text-left lg:text-left lg:text-m">
                Image must be at least 500x500px and no larger than 5mb.
              </p>
              <img className="h-32 w-32 mb-4" src={uploadedDocuments?.avatar?uploadedDocuments?.avatar:employeePrevData?.avatar?.url} alt="Profile" />
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
                Choose file
              </label>
            </div>
          </div>
          <div className="w-full lg:w-2/3">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Personal information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    value={employeeDetails?.firstName?employeeDetails?.firstName:employeePrevData?.firstName}
                    name="firstName"
                    onChange={handleEmployeeDetails}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    onChange={handleEmployeeDetails}
                    name="lastName"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Father Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Father Name"
                    onChange={handleEmployeeDetails}
                    name="fatherName"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mother Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Mother Name"
                    onChange={handleEmployeeDetails}
                    name="motherName"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email 
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email Address"
                    onChange={handleEmployeeDetails}
                    name="email"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Phone Number"
                    onChange={handleEmployeeDetails}
                    name="phoneNo"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Full Address"
                    onChange={handleEmployeeDetails}
                    name="address"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="mt-[10px]">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <input
                    type="text"
                    placeholder="write something about employee"
                    onChange={handleEmployeeDetails}
                    name="description"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Upload Documents</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
                {[
                  { label: "Aadhar Card (pdf)",name:'aadhar', accept: "application/pdf" },
                  { label: "PAN Card (pdf)",name:'pan', accept: "application/pdf" },
                  { label: "Bank Detail (pdf)",name:'Bank', accept: "application/pdf" },
                  { label: "PF (pdf)",name:'PF', accept: "application/pdf" },
                  { label: "10th MarkSheet (pdf)",name:'xthMarksheet', accept: "application/pdf" },
                  { label: "12th MarkSheet (pdf)",name:'xiithMarksheet', accept: "application/pdf" },
                  {
                    label: "Graduation MarkSheet (pdf)",
                    name:'graduationMarksheet',
                    accept: "application/pdf",
                  },
                  { label: "PG MarkSheet (pdf)",name:'pgMarksheet', accept: "application/pdf" },
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
                  </div>
                ))}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Choose Designation
                  </label>
                  <select
                    value={employeeDetails?.designation}
                    onChange={(e) => setEmployeeDetails((prev)=>({...prev,designation:e.target.value}))}
                    className="block w-full p-2 border border-gray-300 rounded"
                  >
                    {designations?.map(
                      (designation)=><option key={designation} value={designation}>
                        {designation}
                      </option>)}
                    
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Choose Designation Level
                  </label>
                  <select
                    value={employeeDetails?.designationLevel}
                    onChange={(e) => setEmployeeDetails((prev)=>({...prev,designationLevel:e.target.value}))}
                    className="block w-full p-2 border border-gray-300 rounded"
                  >
                    {levels?.map(
                      (level)=><option key={level} value={level}>
                        {level}
                      </option>
                    )}
                  </select>
                </div>
              </div>
                <button
                  type="button"
                  onClick={handleGenerateId}
                  className="w-full py-2 bg-black text-white font-semibold rounded mb-2"
                >
                  Generate Virtual Id (Employee Id)
                </button>
                {employeeDetails?.employeeId&&<div className="mb-4 p-2 bg-gray-200 text-center rounded">
                    <p className="text-lg font-semibold">{employeeDetails?.employeeId}</p>
                </div>}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;