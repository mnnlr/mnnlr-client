import React from "react";
import { Bar } from "react-chartjs-2";
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

export const WorkspaceIndividualTaskSection = ({ data }) => {
  // Process the data to get the count of tasks by priority
  const taskStats = data?.individualTasks?.items?.reduce((acc, task) => {
    const priority = task.priority || "Unknown";
    acc[priority] = (acc[priority] || 0) + 1;
    return acc;
  }, {});

  // Prepare the data for the Bar Chart
  const chartData = {
    labels: Object.keys(taskStats), // Priority levels (High, Medium, Low)
    datasets: [
      {
        label: "Number of Tasks",
        data: Object.values(taskStats), // Task count by priority
        backgroundColor: "#36A2EB", // Color for the task bars
        borderColor: "#1E79B2", // Border color for the task bars
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true, // Ensures the chart is responsive
    maintainAspectRatio: false, // Allows chart resizing without maintaining aspect ratio
    scales: {
      x: {
        title: {
          display: true,
          text: "Priority",
        },
      },
      y: {
        title: {
          display: true,
          text: "Task Count",
        },
        min: 0, // Ensures y-axis starts at 0
      },
    },
    plugins: {
      legend: {
        position: "top", // Position the legend at the top
      },
    },
  };

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Individual Tasks</h2>

      {/* Chart Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Tasks by Priority</h3>
        <div className="relative w-full h-72 sm:h-96 md:h-[400px] lg:h-[500px]">
          {/* Chart Container with Tailwind */}
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Individual Tasks List */}
      <div className="grid md:grid-cols-2 gap-4">
        {data?.individualTasks?.items?.map((task) => (
          <div
            key={task._id}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
          >
            <h3 className="text-lg font-medium">{task.taskName}</h3>
            <p className="text-sm text-gray-500">{task.description}</p>
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
