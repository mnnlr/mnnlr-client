import React, { useState } from "react";

const LeaveStatus = () => {
  const [previousLeaveRecords, setPreviousLeaveRecords] = useState([
    {
      leaveType: "Sick Leave",
      startDate: "2024-07-10",
      endDate: "2024-07-12",
    },
    {
      leaveType: "Casual Leave",
      startDate: "2024-07-15",
      endDate: "2024-07-20",
    },
  ]);
  const [currentLeaveRecords, setcurrentLeaveRecords] = useState([
    {
      leaveType: "Sick Leave",
      startDate: "2024-08-10",
      endDate: "2024-08-12",
    },
  ]);

  const addLeaveRecord = () => {
    setPreviousLeaveRecords([
      ...previousLeaveRecords,
      {
        leaveType: "Personal Leave",
        startDate: "2024-08-01",
        endDate: "2024-08-05",
      },
    ]);
  };

  const employeeInfo = {
    name: "Rahul Pharthyal",
    position: "MERN Stack Developer",
    department: "IT Department",
    image:
      "https://cdn.pixabay.com/photo/2023/07/04/07/25/self-consciousness-8105584_640.jpg", // Placeholder image URL, replace with actual image URL
  };

  return (
    <div className="p-4 bg-white mx-2 sm:mx-4 md:mx-6 lg:mx-8">
      <div className="flex flex-col items-center md:mb-12 lg:flex-row lg:justify-start lg:space-x-4">
          <img
            src={employeeInfo.image}
            alt="Employee"
            className="w-14 h-14 rounded-full mb-4 lg:w-24 lg:h-24"
          />
        <div className="text-center sm:text-left lg:space-y-2">
          <h2 className="text-lg lg:text-4xl">{employeeInfo.name}</h2>
          <p className="text-sm text-gray-500">{employeeInfo.position}</p>
          <p className="text-sm text-gray-500">{employeeInfo.department}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-16">Previous Leave Information</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                Leave Type
              </th>
              <th className="px-4 py-2 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-4 py-2 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                End Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {previousLeaveRecords.map((record, index) => (
              <tr key={index}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {record.leaveType}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {record.startDate}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {record.endDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <button
          onClick={addLeaveRecord}
          className="mt-4 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Sample Leave Record
        </button> */}
      </div>
      <h2 className="text-xl font-semibold mt-16 mb-4">
        Current Leave Information
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                Leave Type
              </th>
              <th className="px-4 py-2 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-4 py-2 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                End Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentLeaveRecords.map((record, index) => (
              <tr key={index}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {record.leaveType}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {record.startDate}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {record.endDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col md:flex-row md:justify-end space-y-4 md:space-y-0 md:space-x-4 mt-10">
          <button className="bg-red-500 hover:bg-red-700 text-white text-lg px-4 py-2 rounded-lg shadow-lg">
            Reject
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-lg px-4 py-2 rounded-lg shadow-lg">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveStatus;
