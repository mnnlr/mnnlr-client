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
      <Pie data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center lg:mr-[10px]">
          <span className="text-xl lg:text-2xl font-bold">{totalLeave}</span>
          <br />
          <span className="text-sm lg:text-base text-black">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default LeavePieChart;
