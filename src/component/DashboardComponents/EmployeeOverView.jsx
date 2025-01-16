// src/components/SalesOverview.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const EmployeeOverView = () => {
  const data = {
    labels: [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
    ],
    datasets: [
      {
        label: "2021",
        data: [50, 100, 200, 300, 500, 400, 300, 200, 400, 500, 300, 200],
        borderColor: "rgba(0, 173, 239, 1)",
        backgroundColor: "rgba(0, 173, 239, 0.2)",
        fill: true,
      },
      {
        label: "2020",
        data: [80, 60, 150, 250, 350, 300, 200, 150, 300, 100, 250, 440],
        borderColor: "rgba(45, 62, 80, 1)",
        backgroundColor: "rgba(45, 62, 80, 0.2)",
        fill: true,
      },
      {
        label: "2022",
        data: [30, 100, 130, 250, 350, 300, 600, 150, 1000, 100, 250, 1200],
        borderColor: "rgba(255, 62, 80, 1)",
        backgroundColor: "rgba(45, 62, 80, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="p-10 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Employee Overview</h2>
        <div className="text-green-600">▲ 4% more in 2021</div>
      </div>

      <div className="h-64 w-10/12x">
        <Line data={data} options={options}></Line>
      </div>
    </div>
  );
};

export default EmployeeOverView;
