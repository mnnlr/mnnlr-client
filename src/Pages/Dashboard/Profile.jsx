import React from "react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-white flex justify-center rounded-xl mt-8 items-center p-4">
      <div className="min-h-screen bg-white p-6 rounded-lg w-full max-w-10xl">
        <h2 className="text-2xl font-semibold mb-6">Your profile</h2>
        <form className="flex flex-col lg:flex-row-reverse">
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0 flex flex-col items-center lg:items-start lg:mr-6">
            <div className="mb-6 lg:ml-20">
              <h3 className="text-lg font-medium mb-2">Profile image</h3>
              <img
                className="h-32 w-32  mb-4"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFwlTyKJZQTzAUHm3ClY49pHSKyWFu1a6l7A&s"
                alt="Profile"
              />
              <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Choose file
              </button>
              <p className="mt-1 text-sm text-gray-500 text-center lg:text-left">
                Image must be at least 500x500px and no larger than 5mb.
              </p>
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
                    type="text" placeholder="first name"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <input
                    type="text" placeholder="last name"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone number
                  </label>
                  <input
                    type="text" placeholder="phone number"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    type="email" placeholder="email address"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text" placeholder="country"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text" placeholder="city"
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
                  <input
                    type="password" placeholder="enter current password"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    New password
                  </label>
                  <input
                    type="password" placeholder="enter new password"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
