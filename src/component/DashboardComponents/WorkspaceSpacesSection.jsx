import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const WorkspaceSpacesSection = ({ data }) => {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Workspaces</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {data?.workspaces?.items?.map((workspace) => {
          // Count task statuses for each workspace
          const taskStatuses = { ToDo: 0, InProgress: 0, OnHold: 0, Done: 0 };
          workspace?.tasks?.forEach((task) => {
            if (task.status === "ToDo") taskStatuses.ToDo++;
            if (task.status === "In-Progress") taskStatuses.InProgress++;
            if (task.status === "On-Hold") taskStatuses.OnHold++;
            if (task.status === "Done") taskStatuses.Done++;
          });

          // Bar chart data for this specific workspace
          const chartData = {
            labels: [workspace.workspaceName], // Workspace name
            datasets: [
              {
                label: "Number of Members",
                data: [workspace.workspaceMembers.length], // Members data
                backgroundColor: "#36A2EB", // Color for the members bar
                borderColor: "#1E79B2", // Border color for the members bar
                borderWidth: 1,
              },
              {
                label: "Number of Documents",
                data: [workspace.workspaceDocuments.length], // Documents data
                backgroundColor: "#FF6384", // Color for the documents bar
                borderColor: "#D84C5F", // Border color for the documents bar
                borderWidth: 1,
              },
            ],
          };

          // Chart options for the Bar chart
          const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Workspaces",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Counts",
                },
                min: 0,
                stacked: true,
              },
            },
            plugins: {
              legend: {
                position: "top",
              },
            },
          };

          return (
            <div
              key={workspace._id}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              <h3 className="text-lg font-medium">{workspace.workspaceName}</h3>
              <p className="text-sm text-gray-500">
                Created By: {workspace?.workspaceCreatedBy?.name || "Unknown"}
              </p>
              <p className="text-sm">Members: {workspace.workspaceMembers.map((member) => member.name).join(", ")}</p>
              <p className="text-sm">
                Documents: {workspace.workspaceDocuments.length}
              </p>
              <p className="text-sm">
                Last Updated: {new Date(workspace.updatedAt).toDateString()}
              </p>

              {/* Bar Chart for Members and Documents */}
              <div className="mt-4">
                <div className="relative w-full h-48 sm:h-64 md:h-[250px] lg:h-[300px]">
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
