import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const LeavePieChart = ({ title, labels, leaveData, totalLeave }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Leave Data",
        data: leaveData,
        backgroundColor: [
          "rgba(76, 175, 80)", // total balnce
          "rgba(76, 175, 80, 0.5)", // leave used
        ],
        borderColor: ["rgba(76, 175, 80, 1)", "rgba(76, 175, 80, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "75%",
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: true,
        position: "bottom", // Hide legend
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <div className="relative w-full max-w-xs mx-auto mb-8 rounded-lg p-4">
      <div className="w-full h-0 pb-[100%] relative">
        <Pie data={data} options={options} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center mb-14">
          <span className="text-lg sm:text-xl lg:text-xl font-bold block leading-none">
            {totalLeave}
          </span>
          <span className="text-xs sm:text-sm lg:text-xs text-black block leading-none">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeavePieChart;
