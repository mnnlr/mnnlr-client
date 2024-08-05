import { useState } from "react";
import axios from "axios";

const ApplyLeave = () => {

  const [formData, setFormData] = useState({
    employeeId: "",
    typeOfLeave: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = {
      formData,
    };
    const header = {
      "content-type": "application/json",
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/leave",
        employeeData,
        { header }
      );
      alert(response.data);
    } catch (error) {
      if(error.response){
        console.error(error.response.data)
        alert(error.response.data)
      }
    }
  };

  return (
    <div className="sticky bg-gray-250 flex items-center justify-center mt-20 flex-col">
      <div className="inline-block bg-white p-8 rounded-lg shadow-lg w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-left">
          Apply Leave
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
          </div>
          <div>
            <label className="block text-gray-600 mb-2" htmlFor="employeeId">
              Employee ID
            </label>
            <input
              type="text"
              name="employeeId"
              id="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2" htmlFor="typeOfLeave">
              Leave Type
            </label>
            <select
              name="typeOfLeave"
              id="typeOfLeave"
              value={formData.leaveType}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select leave type</option>
              <option value="sick">Sick Leave</option>
              <option value="casual">Casual Leave</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600 mb-2" htmlFor="startDate">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2" htmlFor="endDate">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2" htmlFor="reason">
              Reason
            </label>
            <textarea
              name="reason"
              id="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-68 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 float-end"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeave;
