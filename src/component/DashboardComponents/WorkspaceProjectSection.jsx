import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const WorkspaceProjectSection = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Projects ({data?.projects?.count}</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {data?.projects?.items?.map((project) => {
          // Count task statuses
          const taskStatuses = { ToDo: 0, InProgress: 0, OnHold: 0, Done: 0 };

          project?.individualtaskId?.forEach((task) => {
            if (task.status === "ToDo") taskStatuses.ToDo++;
            if (task.status === "In-Progress") taskStatuses.InProgress++;
            if (task.status === "On-Hold") taskStatuses.OnHold++;
            if (task.status === "Done") taskStatuses.Done++;
          });

          const chartData = {
            labels: ["Sprints", "Individual Tasks"],
            datasets: [
              {
                label: "Project Data",
                data: [
                  project?.sprintId?.length || 0,
                  project?.individualtaskId?.length || 0,
                ],
                backgroundColor: ["#3b82f6", "#f59e0b"],
              },
            ],
          };

          const pieData = {
            labels: ["ToDo", "In-Progress", "On-Hold", "Done"],
            datasets: [
              {
                label: "Task Status Distribution",
                data: [
                  taskStatuses.ToDo,
                  taskStatuses.InProgress,
                  taskStatuses.OnHold,
                  taskStatuses.Done,
                ],
                backgroundColor: ["#f59e0b", "#3b82f6", "#d97706", "#22c55e"],
              },
            ],
          };

          return (
            <div key={project?._id} className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
              <h3 className="text-lg font-medium">{project?.projectName || "Untitled Project"}</h3>
              <p className="text-sm text-gray-500">{project?.description || "No description available"}</p>
              <p className="text-sm">Owner: {project?.owner?.name || "Unknown"}</p>
              <p className="text-sm">Status: {project?.status || "Unknown"}</p>
              <p className="text-sm">
                Due Date: {project?.dueDate ? new Date(project?.dueDate).toDateString() : "No due date"}
              </p>

              {/* Bar Chart (Sprints and Tasks) */}
              <div className="mt-4">
                <Bar data={chartData} options={options} />
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-between">
                {/* Pie Chart (Task Status Distribution) */}
                <div className="mt-4 w-[300px]">
                  <Pie data={pieData} options={{ responsive: true }} />
                </div>

                {/* Display Task Counts */}
                <div className="mt-4">
                  <p className="text-sm">ToDo: {taskStatuses.ToDo}</p>
                  <p className="text-sm">In-Progress: {taskStatuses.InProgress}</p>
                  <p className="text-sm">On-Hold: {taskStatuses.OnHold}</p>
                  <p className="text-sm">Done: {taskStatuses.Done}</p>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
