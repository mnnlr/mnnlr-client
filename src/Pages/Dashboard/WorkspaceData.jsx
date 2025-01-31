import React, { useEffect } from "react";
import { WorkspaceProjectSection } from "../../component/DashboardComponents/WorkspaceProjectSection";
// import { WorkspaceIndividualTaskSection } from "../../component/DashboardComponents/WorkspaceIndividualTaskSection";
// import { WorkspaceTasksSection } from "../../component/DashboardComponents/WorkspaceTasksSection";
import { WorkspaceSpacesSection } from "../../component/DashboardComponents/WorkspaceSpacesSection";
import { useGetWorkspaceData } from '../../hooks/dashboardHooks/useGetWorkspaceData'

export const WorkspaceData = ({ }) => {

  const { isWorkspaceDataError, isWorkspaceDataLoading, isWorkspaceData, getWorkspaceData } = useGetWorkspaceData();

  useEffect(() => {
    getWorkspaceData();
  }, [])

  const data = {
    projects: {
      count: 2,
      items: [
        {
          _id: "proj-1",
          projectName: "ClickUp",
          description: "This is a website for creating tasks",
          teams: {
            owner: "67343d7ba59e745e63090d03",
          },
          sprintId: [],
          individualtaskId: ["task-1", "task-2", "task-3"],
          status: "active",
          dueDate: "2024-11-21T00:00:00.000+00:00",
          timestamp: "2024-10-23T06:50:13.632+00:00",
          updatedAt: "2025-01-28T13:13:34.810+00:00",
          __v: 1,
        },
        {
          _id: "proj-2",
          projectName: "Task Manager",
          description: "A project management tool",
          teams: {
            owner: "678f95b399dfcf22d30066bd",
          },
          sprintId: [],
          individualtaskId: ["task-4", "task-5"],
          status: "active",
          dueDate: "2024-12-15T00:00:00.000+00:00",
          timestamp: "2024-11-10T09:00:00.000+00:00",
          updatedAt: "2025-01-28T15:00:00.000+00:00",
          __v: 1,
        },
      ],
    },
    individualTasks: {
      count: 3,
      items: [
        {
          _id: "task-1",
          userId: "user-1",
          kanId: "KAN-103",
          projectId: "proj-1",
          taskName: "Fix Navbar Bug",
          description: "Resolve the alignment issue in the navbar",
          dueDate: "2025-02-02T12:00:00.000Z",
          status: "In Progress",
          priority: "High",
          assignees: "user-1",
          report: "report-3",
          createdAt: "2025-01-21T10:00:00.000Z",
          updatedAt: "2025-01-28T16:00:00.000Z",
        },
        {
          _id: "task-2",
          userId: "user-2",
          kanId: "KAN-104",
          projectId: "proj-2",
          taskName: "Implement Dark Mode",
          description: "Add a dark mode toggle feature",
          dueDate: "2025-02-05T14:00:00.000Z",
          status: "Pending",
          priority: "Medium",
          assignees: "user-2",
          report: "report-4",
          createdAt: "2025-01-23T14:00:00.000Z",
          updatedAt: "2025-01-28T16:30:00.000Z",
        },
        {
          _id: "task-3",
          userId: "user-3",
          kanId: "KAN-105",
          projectId: "proj-1",
          taskName: "Optimize Database Queries",
          description: "Improve the database query performance",
          dueDate: "2025-02-10T18:00:00.000Z",
          status: "Done",
          priority: "Low",
          assignees: "user-3",
          report: "report-5",
          createdAt: "2025-01-25T09:00:00.000Z",
          updatedAt: "2025-01-28T17:00:00.000Z",
        },
      ],
    },
    tasks: {
      count: 3,
      items: [
        {
          _id: "task-1",
          userId: "user-1",
          kanId: "KAN-103",
          projectId: "proj-1",
          taskName: "Fix Navbar Bug",
          description: "Resolve the alignment issue in the navbar",
          dueDate: "2025-02-02T12:00:00.000Z",
          status: "In Progress",
          priority: "High",
          assignees: "user-1",
          report: "report-3",
          createdAt: "2025-01-21T10:00:00.000Z",
          updatedAt: "2025-01-28T16:00:00.000Z",
        },
        {
          _id: "task-2",
          userId: "user-2",
          kanId: "KAN-104",
          projectId: "proj-2",
          taskName: "Implement Dark Mode",
          description: "Add a dark mode toggle feature",
          dueDate: "2025-02-05T14:00:00.000Z",
          status: "Pending",
          priority: "Medium",
          assignees: "user-2",
          report: "report-4",
          createdAt: "2025-01-23T14:00:00.000Z",
          updatedAt: "2025-01-28T16:30:00.000Z",
        },
        {
          _id: "task-3",
          userId: "user-3",
          kanId: "KAN-105",
          projectId: "proj-1",
          taskName: "Optimize Database Queries",
          description: "Improve the database query performance",
          dueDate: "2025-02-10T18:00:00.000Z",
          status: "Done",
          priority: "Low",
          assignees: "user-3",
          report: "report-5",
          createdAt: "2025-01-25T09:00:00.000Z",
          updatedAt: "2025-01-28T17:00:00.000Z",
        },
      ],
    },
    workspaces: {
      count: 2,
      items: [
        {
          _id: "1",
          workspaceName: "MERN Stack Team",
          workspaceDocuments: ["doc-1", "doc-2"],
          workspaceMembers: ["user-1", "user-2", "user-3"],
          workspaceCreatedBy: "admin-1",
          createdAt: "2025-01-22T06:11:14.558Z",
          updatedAt: "2025-01-29T10:28:59.061Z",
        },
        {
          _id: "2",
          workspaceName: "React Developers",
          workspaceDocuments: ["doc-3"],
          workspaceMembers: ["user-4", "user-5"],
          workspaceCreatedBy: "admin-2",
          createdAt: "2025-01-25T10:00:00.000Z",
          updatedAt: "2025-01-29T10:30:00.000Z",
        },
      ],
    },
    documents: {
      count: 3,
      items: [
        {
          _id: "doc-1",
          documentTitle: "Project Proposal",
          workspaceId: "1",
          createdBy: "admin-1",
          createdAt: "2025-01-22T06:15:36.795Z",
          updatedAt: "2025-01-28T12:59:13.241Z",
          documentContent_cloudinaryURL: "https://example.com/document1.pdf",
        },
        {
          _id: "doc-2",
          documentTitle: "Team Guidelines",
          workspaceId: "1",
          createdBy: "admin-1",
          createdAt: "2025-01-23T10:15:36.795Z",
          updatedAt: "2025-01-28T13:00:00.000Z",
          documentContent_cloudinaryURL: "https://example.com/document2.pdf",
        },
        {
          _id: "doc-3",
          documentTitle: "API Documentation",
          workspaceId: "2",
          createdBy: "admin-2",
          createdAt: "2025-01-24T08:30:00.000Z",
          updatedAt: "2025-01-28T14:00:00.000Z",
          documentContent_cloudinaryURL: "https://example.com/document3.pdf",
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-5 rounded-lg">
      {isWorkspaceDataLoading ?
        <div>
          Loading
        </div> :
        <>
          {/* Projects Section */}
          <WorkspaceProjectSection data={isWorkspaceData ? isWorkspaceData : data} />

          {/* Tasks Section */}
          {/* <WorkspaceTasksSection data={isWorkspaceData ? isWorkspaceData : data} /> */}

          {/* Individual Tasks Section */}
          {/* <WorkspaceIndividualTaskSection data={isWorkspaceData ? isW} /> */}

          {/* Workspaces Section */}
          <WorkspaceSpacesSection data={isWorkspaceData ? isWorkspaceData : data} />
        </>
      }
    </div>
  );
};
