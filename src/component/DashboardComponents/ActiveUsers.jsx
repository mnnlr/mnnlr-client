import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaUsers, FaMousePointer, FaShoppingCart, FaBox } from 'react-icons/fa';

const ActiveUsers = () => {
  const data = {
    labels: ['', '', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        label: 'Active Users',
        data: [400, 200, 150, 300, 250, 400, 300, 100, 200, 350],
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 5,
        barThickness: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'white',
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
    <div className="h-96 bg-white p-6 rounded-lg shadow-lg">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-lg">
        <div className="h-20">
          <Bar data={data} options={options} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold">Active Users</h3>
        <p className="text-green-600">(+23%) than last week</p>
      </div>
      <div className="flex justify-around mt-4">
        <div className="text-center">
          <FaUsers className="text-pink-500 text-2xl mx-auto" />
          <p className="text-gray-700">Users</p>
          <p className="text-xl font-bold">36K</p>
        </div>
        <div className="text-center">
          <FaMousePointer className="text-blue-500 text-2xl mx-auto" />
          <p className="text-gray-700">Clicks</p>
          <p className="text-xl font-bold">2M</p>
        </div>
        <div className="text-center">
          <FaShoppingCart className="text-orange-500 text-2xl mx-auto" />
          <p className="text-gray-700">Sales</p>
          <p className="text-xl font-bold">$435</p>
        </div>
        <div className="text-center">
          <FaBox className="text-red-500 text-2xl mx-auto" />
          <p className="text-gray-700">Items</p>
          <p className="text-xl font-bold">43</p>
        </div>
      </div>
    </div>
  );
};

export default ActiveUsers;
