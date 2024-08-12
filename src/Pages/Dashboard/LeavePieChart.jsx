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
    radius: "60%",
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: true,
        position: "bottom", // Hide legend
        labels: {
          padding: 10, // Adjust this value to increase or decrease the margin
        },
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <div className="relative w-full max-w-xs mx-auto mb-8 rounded-lg p-4">
      <Pie data={data} options={options} />
      <div className="absolute inset-0 flex top-[-20px] right-2 items-center justify-center lg:right-14 lg:top-0">
        <div className="text-center flex flex-col items-center transform translate-x-0 translate-y-0 sm:translate-x-1 sm:translate-y-[-4px] md:translate-x-2 md:translate-y-[-8px] lg:translate-x-3 lg:translate-y-[-12px] px-2 sm:px-4">
          <span className="text-base sm:text-xl md:text-3xl lg:text-lg font-bold">
            {totalLeave}
          </span>
          <span className="text-xs sm:text-sm md:text-xs lg:text-xs lg:font-bold text-black">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeavePieChart;
