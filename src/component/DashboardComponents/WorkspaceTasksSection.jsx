import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const WorkspaceTasksSection = ({ data }) => {
  // Process the data to count the tasks by status
  const taskStatusCounts = data?.tasks?.items?.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  // Prepare the data for the Pie Chart
  const chartData = {
    labels: Object.keys(taskStatusCounts),
    datasets: [
      {
        data: Object.values(taskStatusCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Colors for the chart
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Tasks</h2>
      {/* Pie Chart Section */}
      <div className="mb-6 max-w-64 flex items-center justify-center,">
        <Pie data={chartData} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {data?.tasks?.items?.map((task) => (
          <div
            key={task._id}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
          >
            <h3 className="text-lg font-medium">{task.taskName}</h3>
            <p className="text-sm text-gray-500">{task.description}</p>
            <p className="text-sm">Project: {task.projectId}</p>
            <p className="text-sm">Status: {task.status}</p>
            <p className="text-sm">Priority: {task.priority}</p>
            <p className="text-sm">
              Due: {new Date(task.dueDate).toDateString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
