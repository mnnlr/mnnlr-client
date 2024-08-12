// LeaveDashboard.jsx
import React from "react";
import LeaveStatus from "./LeaveStatus";
import LeavePieChart from "./LeavePieChart";


// const data = [
//   {
//     title: "Casual Leave",
//     value: "2",
//     bgColor: "bg-pink-400",
//     textColor: "white",
//   },
//   {
//     title: "Sick Leave",
//     value: "2",
//     bgColor: "bg-white",
//     textColor: "blue-900",
//   },
//   {
//     title: "Total Leave",
//     value: "4",
//     bgColor: "bg-blue-900",
//     textColor: "white",
//   },
// ];

const LeaveDashboard = () => {
  const sickLeaveLabels = ['Balance', 'Used'];
  const sickLeaveData = [1, 1]; 
  const totalSickLeave = 2;

  const casualLeaveLabels = ['Balance', 'Used'];
  const casualLeaveData = [2, 0]; 
  const totalCasualLeave = 2;

  const totalLeaveLabels = ['Balance', 'Used'];
  const totalLeaveData = [4, 1];
  const totalLeave = 2;

  return (  //grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
    <div className="p-6 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:flex lg:flex-wrap lg:justify-start gap-6 mb-8 xl:gap-10 bg-white shadow-sm rounded-lg">
        {/* {data.map((item, index) => (
          <LeaveData
            key={index}
            title={item.title}
            value={item.value}
            bgColor={item.bgColor}
            textColor={item.textColor}
          />
        ))} */}
        <LeavePieChart
         title="Sick Leave"
         labels={sickLeaveLabels}
         leaveData={sickLeaveData}
         totalLeave={totalSickLeave}
    />
        <LeavePieChart
           title="Casual Leave"
           labels={casualLeaveLabels}
           leaveData={casualLeaveData}
           totalLeave={totalCasualLeave}
        />
        <LeavePieChart
           title="Total Leave"
           labels={totalLeaveLabels}
           leaveData={totalLeaveData}
           totalLeave={totalLeave}
        />
      </div>
      {/* <div className="bg-white rounded-lg p-6 shadow-lg">
        <LeaveGraph />
      </div> */}
      <div className="bg-white rounded-lg p-6 shadow-lg mt-10">
        <LeaveStatus/>
      </div>
    </div>
  );
};

export default LeaveDashboard;
