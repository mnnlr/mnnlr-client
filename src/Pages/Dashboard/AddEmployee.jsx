import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const AddEmployee = () => {
  const [designation, setDesignation] = useState("");
  const [designationLevel, setDesignationLevel] = useState("");
  const [, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    "https://t4.ftcdn.net/jpg/01/64/16/59/360_F_164165971_ELxPPwdwHYEhg4vZ3F4Ej7OmZVzqq4Ov.jpg"
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center rounded-lg shadow-lg items-center p-4 mt-6">
      <div className="min-h-screen bg-white p-6 rounded-lg w-full max-w-10xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold mb-1">Employee Form</h2>
            <span className="text-sm lg:text-lg">
              Fill Employee personal detials
            </span>
          </div>
          <div className="hidden lg:block">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
            >
              Save changes
            </button>
          </div>
        </div>
        <form className="flex flex-col lg:flex-row-reverse">
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0 flex flex-col items-center lg:items-start lg:mr-6">
            <div className="mb-6 lg:ml-20">
              <h3 className="text-lg font-medium mb-2">Profile image</h3>
              <p className="mt-1 mb-4 text-sm text-gray-500 text-left lg:text-left lg:text-m">
                Image must be at least 500x500px and no larger than 5mb.
              </p>
              <img className="h-32 w-32 mb-4" src={previewUrl} alt="Profile" />
              <input
                type="file"
                className="hidden"
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
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email 
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Email Address"
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
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Full Address"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Upload Documents</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
                {[
                  { label: "Aadhar Card (pdf)", accept: "application/pdf" },
                  { label: "PAN Card (pdf)", accept: "application/pdf" },
                  { label: "Bank Detail (pdf)", accept: "application/pdf" },
                  { label: "PF (pdf)", accept: "application/pdf" },
                  { label: "10th MarkSheet (pdf)", accept: "application/pdf" },
                  { label: "12th MarkSheet (pdf)", accept: "application/pdf" },
                  {
                    label: "Graduation MarkSheet (pdf)",
                    accept: "application/pdf",
                  },
                  { label: "PG MarkSheet (pdf)", accept: "application/pdf" },
                ].map((file, index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-gray-700 mb-2">{`Upload ${file.label}`}</label>
                    <input
                      type="file"
                      accept={file.accept}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Choose Designation
                  </label>
                  <select
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select Designation</option>
                    <option value="Manager">Manager</option>
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Tester">Tester</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Choose Designation Level
                  </label>
                  <select
                    value={designationLevel}
                    onChange={(e) => setDesignationLevel(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select Level</option>
                    <option value="Junior">Junior</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
              </div>
                <button
                  onClick={()=>console.log('generate')}
                  className="w-full py-2 bg-black text-white font-semibold rounded mb-2"
                >
                  Generate Virtual Id (Employee Id)
                </button>
                <div className="mb-4 p-2 bg-gray-200 text-center rounded">
                    <input className="w-full"/>
                </div>
            </div>
          </div>
          <div className="flex justify-end mt-10 lg:hidden ">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
