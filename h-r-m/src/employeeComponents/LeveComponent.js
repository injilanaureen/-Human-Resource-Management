import React, { useState } from 'react';

const LeaveManagement = () => {
  const [leaveBalance, setLeaveBalance] = useState({
    sickLeave: 10,
    vacationLeave: 20,
    unpaidLeave: 0,
  });

  const [leaveRequests, setLeaveRequests] = useState([]);

  const [formData, setFormData] = useState({
    employeeName: '',
    leaveType: 'Sick Leave',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const daysRequested = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    if (formData.leaveType === 'Sick Leave') {
      if (leaveBalance.sickLeave >= daysRequested) {
        setLeaveBalance({
          ...leaveBalance,
          sickLeave: leaveBalance.sickLeave - daysRequested,
        });
      } else {
        alert('Insufficient sick leave balance!');
        return;
      }
    } else if (formData.leaveType === 'Vacation Leave') {
      if (leaveBalance.vacationLeave >= daysRequested) {
        setLeaveBalance({
          ...leaveBalance,
          vacationLeave: leaveBalance.vacationLeave - daysRequested,
        });
      } else {
        alert('Insufficient vacation leave balance!');
        return;
      }
    } else if (formData.leaveType === 'Unpaid Leave') {
      setLeaveBalance({
        ...leaveBalance,
        unpaidLeave: leaveBalance.unpaidLeave + daysRequested,
      });
    }

    const newRequest = {
      ...formData,
      daysRequested,
      status: 'Pending',
    };

    setLeaveRequests([...leaveRequests, newRequest]);
    setFormData({
      employeeName: '',
      leaveType: 'Sick Leave',
      startDate: '',
      endDate: '',
      reason: '',
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Leave Management System</h1>

      {/* Leave Balance Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Leave Balance</h2>
        <ul className="space-y-2">
          <li className="text-lg text-gray-700">Sick Leave: {leaveBalance.sickLeave} days</li>
          <li className="text-lg text-gray-700">Vacation Leave: {leaveBalance.vacationLeave} days</li>
          <li className="text-lg text-gray-700">Unpaid Leave: {leaveBalance.unpaidLeave} days</li>
        </ul>
      </div>

      {/* Leave Request Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Request Leave</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Employee Name</label>
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleInputChange}
              required
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Leave Type</label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            >
              <option value="Sick Leave">Sick Leave</option>
              <option value="Vacation Leave">Vacation Leave</option>
              <option value="Unpaid Leave">Unpaid Leave</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              required
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Submit Request
          </button>
        </form>
      </div>

      {/* Leave Requests Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Leave Requests</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Employee Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Leave Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Start Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">End Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Days Requested</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{request.employeeName}</td>
                <td className="border border-gray-300 px-4 py-2">{request.leaveType}</td>
                <td className="border border-gray-300 px-4 py-2">{request.startDate}</td>
                <td className="border border-gray-300 px-4 py-2">{request.endDate}</td>
                <td className="border border-gray-300 px-4 py-2">{request.daysRequested}</td>
                <td className="border border-gray-300 px-4 py-2">{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveManagement;