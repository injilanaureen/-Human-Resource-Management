import React from 'react';
import Attendance from './attendance';
import CustomCalendar from './CustomCalendar'; // Import the CustomCalendar component

const Dashboard = () => {
  const totalEmployees = 50;
  const present = 32;
  const absent = totalEmployees - present;
  const projects = { total: 10, completed: 9, pending: 1 };

  const handleAddEmployee = () => {
    alert('Add New Employee functionality');
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Overview of your organization</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Employees */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold">Total Employees</h2>
          <p className="text-5xl font-bold mt-2">{totalEmployees}</p>
          <div className="mt-4 flex justify-between">
            <p>Present: {present}</p>
            <p>Absent: {absent}</p>
          </div>
          <button
            onClick={handleAddEmployee}
            className="w-full mt-6 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Add New Employee
          </button>
        </div>

        {/* Attendance */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800">Today's Attendance</h2>
          <div className="flex items-center justify-center mt-4">
            <div className="relative w-24 h-24">
              <svg className="absolute inset-0" viewBox="0 0 36 36">
                <circle
                  className="text-gray-300 stroke-current"
                  strokeWidth="3"
                  fill="none"
                  r="16"
                  cx="18"
                  cy="18"
                />
                <circle
                  className="text-blue-500 stroke-current"
                  strokeWidth="3"
                  strokeDasharray={`${((present / totalEmployees) * 100).toFixed(0)}, 100`}
                  fill="none"
                  r="16"
                  cx="18"
                  cy="18"
                />
              </svg>
              <p className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-blue-500">
                {((present / totalEmployees) * 100).toFixed(0)}%
              </p>
            </div>
          </div>
          <p className="text-gray-500 text-center mt-4">Present</p>
        </div>

        {/* Project Status */}
        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold">Project Status</h2>
          <div className="mt-4">
            <p>Total: {projects.total}</p>
            <p>Completed: {projects.completed}</p>
            <p>Pending: {projects.pending}</p>
          </div>
          <div className="mt-4 w-full bg-gray-100 rounded-full h-3">
            <div
              className="bg-green-300 h-full rounded-full"
              style={{ width: `${(projects.completed / projects.total) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Leave Requests */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800">Leave Requests</h2>
          <div className="mt-4">
            <p className="text-gray-600">Approved: 5</p>
            <p className="text-gray-600">Pending: 3</p>
            <p className="text-gray-600">Rejected: 2</p>
          </div>
          <button className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            View Details
          </button>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800">Events Calendar</h2>
        <CustomCalendar />
      </div>

      {/* Attendance Component */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800">Attendance Details</h2>
        <Attendance />
      </div>
    </div>
  );
};

export default Dashboard;
