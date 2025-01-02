import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalworkingHours } from '../../redux/actions/AttendanceAction';

const EmployeePerformance = ({ employee, user }) => {
  const dispatch = useDispatch();
  const privateAxios = useAxiosPrivate();

 
  const { totalWorkingHours, isLoading, error } = useSelector(state => state.attendances);

  const [selectedView, setSelectedView] = useState('daily'); 

  const fallbackData = [
    { period: "2024-12-31", totalWorkingHours: "10.54" },
    { period: "2025-01-01", totalWorkingHours: "0.03" },
    { period: "2024-08-12", totalWorkingHours: "19.33" },
  ];

  const timeTracking = totalWorkingHours.length ? totalWorkingHours : fallbackData;

  useEffect(() => {
    if (employee?.userId) {
      dispatch(getTotalworkingHours({
        id: employee?.userId,
        period: selectedView,
        accessToken: user.accessToken,
        privateAxios
      }));
    }
  }, [employee?.userId, selectedView, dispatch, user.accessToken, privateAxios]);

  if (error) {
    return (
      <div className="flex justify-center items-center mt-5 rounded-lg bg-gray-50">
        <div className="p-6 space-y-6 max-w-4xl w-full">
          <div className="mt-6 text-center text-gray-700 font-semibold">
            <h3>Error: {error}</h3>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 max-w-4xl w-full">
      <div className="flex justify-center items-center mt-5 rounded-lg bg-gray-50 animate-pulse">
        <div className="mt-6 p-6 w-full">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
          </h2>
          <div className="flex justify-between items-center mb-6">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
    );
  }


  const formattedTimeTracking = timeTracking.map(entry => ({
    period: entry.period,
    totalWorkingHours: parseFloat(entry.totalWorkingHours),
  }));

  const chartData = formattedTimeTracking.map(entry => ({
    name: entry.period, 
    performance: entry.totalWorkingHours,
  }));

  const handleViewChange = (event) => {
    setSelectedView(event.target.value);
  };

  const totalWorkedHours = chartData.reduce((acc, entry) => acc + entry.performance, 0);
  const hours = Math.floor(totalWorkedHours); 
  const minutes = Math.round((totalWorkedHours - hours) * 60); 
  const formattedTotalWorkedHours = `${hours} hrs ${minutes} mins`;

  return (
    <div className="flex justify-center items-center mt-5 rounded-lg bg-gray-50">
      <div className="p-6 space-y-6 max-w-4xl w-full">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Performance</h1>
            <p className="mt-2 text-sm text-gray-600">
              Showing user performance for the {selectedView} view
            </p>
          </div>
          <select
            className="border rounded p-2 text-gray-700"
            value={selectedView}
            onChange={handleViewChange}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div className="mt-4 text-gray-700 font-semibold">
          <h3>Total Worked Hours: {formattedTotalWorkedHours}</h3>
        </div>
        <div className="mt-6 p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Performance Employee</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              barCategoryGap={20}
              margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  fontSize: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  padding: '5px',
                }}
                labelStyle={{
                  fontWeight: 'bold',
                  color: '#333',
                }}
              />
              <Legend />
              <Bar dataKey="performance" fill="#8884d8" animationDuration={1000}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.performance > 9 ? '#ff6f61' : '#8884d8'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EmployeePerformance;
