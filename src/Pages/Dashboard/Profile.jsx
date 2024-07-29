// src/components/ProfilePage.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    "https://t4.ftcdn.net/jpg/01/64/16/59/360_F_164165971_ELxPPwdwHYEhg4vZ3F4Ej7OmZVzqq4Ov.jpg"
  );

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

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
            <h2 className="text-2xl font-semibold mb-1">Your profile</h2>
            <span className="text-sm lg:text-lg">
              These Settings allows you to customise your personal detials
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <input
                    type="text"
                    placeholder="first name"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="last name"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone number
                  </label>
                  <input
                    type="text"
                    placeholder="phone number"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="email address"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    placeholder="country"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="city"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Password</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mt-4">
                    Current password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="enter current password"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={toggleCurrentPasswordVisibility}
                      className="absolute inset-y-0 right-0 px-2 text-gray-500 bg-gray-100 border-gray-300 rounded-md m-1"
                    >
                      <FontAwesomeIcon
                        icon={showCurrentPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    New password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="enter current password"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={toggleNewPasswordVisibility}
                      className="absolute inset-y-0 right-0 px-2 text-gray-500 bg-gray-100 border-gray-300 rounded-md m-1"
                    >
                      <FontAwesomeIcon
                        icon={showNewPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                </div>
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

export default Profile;
