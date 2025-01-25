import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Plus } from 'lucide-react';
import { Link } from "react-router-dom";
import axios from 'axios';

function Employee() {
  const [formData, setFormData] = useState({
    empFullName: '',
    empPersonalEmail: '',
    empPhoneNo: '',
    empAadhaarNo: '',
    empPanCardNo: '',
    empDepartment: '',
    empDesignation: '',
    empJoinDate: '',
    empStatus: '',
    role: '',
    rolePermission: '',  // Added field for role permissions
  });
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // State to show/hide the dialog
  const [showDialog, setShowDialog] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // When the role is selected, fetch role permissions
    if (name === 'role') {
      fetchRolePermissions(value);
    }
  };

  // Fetch roles data
  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/adduser/fetchRole');
      if (response.data.success) {
        setRoles(response.data.data);
      } else {
        console.error("Failed to fetch roles", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching roles", error);
    }
  };

  // Fetch department data
  const fetchDepartment = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/adduser/fetchDepartment');
      if (response.data.success) {
        setDepartments(response.data.data);
      } else {
        console.error("Failed to fetch department", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching department", error);
    }
  };

  // Fetch designations based on selected department
  const fetchDesignations = async (dept_id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/adduser/fetchDesignation?dept_id=${dept_id}`);
      if (response.data.success) {
        setDesignations(response.data.data);
      } else {
        console.error("Failed to fetch designations", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching designations", error);
    }
  };

  // Fetch role permissions based on selected role
  const fetchRolePermissions = async (roleId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/adduser/fetchRolePermissions?role_id=${roleId}`);
      if (response.data.success) {
        // Update formData with the role permissions
        setFormData((prevData) => ({
          ...prevData,
          rolePermission: response.data.permissions,  // Assuming the response returns the permissions in 'permissions' field
        }));
      } else {
        console.error("Failed to fetch role permissions", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching role permissions", error);
    }
  };

  // Fetch roles and departments on component mount
  useEffect(() => {
    fetchRoles();
    fetchDepartment();
  }, []);

  // Fetch designations whenever the selected department changes
  useEffect(() => {
    if (selectedDepartment) {
      fetchDesignations(selectedDepartment);
    }
  }, [selectedDepartment]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    const response = await axios.post('http://localhost:5000/api/adduser/submitUser', {
      formData
    });
    console.log(response);
    
    setShowDialog(false);
  };

  return (
    <div className="max-h-screen">
      <Link to="/">
        <div className="flex items-center gap-1">
          <ArrowLeft />
          <p>Employee</p>
        </div>
      </Link>
      <div className="flex justify-between items-center p-2 mt-4">
        <p className="text-indigo-400 underline">Directory</p>
        <button
          className="text-indigo-400 border-2 border-indigo-400 p-1 flex"
          onClick={() => setShowDialog(true)} // Open dialog when clicked
        >
          <Plus /> New Hire
        </button>
      </div>

      {/* Dialog Box */}
      {showDialog && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-8 rounded-md w-3/4 md:w-1/2 lg:w-2/3">
            <h2 className="text-lg mb-4 font-semibold">Add Employee</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="empRole" className="block">Role *</label>
                  <select
                    id="empRole"
                    name="role"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    placeholder="Employee Role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    {roles.map((role) => (
                      <option key={role.role_id} value={role.role_id}>
                        {role.role}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="empFullName" className="block">Full Name *</label>
                  <input
                    type="text"
                    id="empFullName"
                    name="empFullName"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    placeholder="Employee Full Name"
                    value={formData.empFullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="empDepartment" className="block">Department *</label>
                  <select
                    id="empDepartment"
                    name="empDepartment"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    placeholder="Employee Department"
                    value={formData.empDepartment}
                    onChange={(e) => {
                      handleChange(e);
                      setSelectedDepartment(e.target.value);
                    }}
                    required
                  >
                    {departments.map((department) => (
                      <option key={department.dep_id} value={department.dep_id}>
                        {department.dep_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="empDesignation" className="block">Designation *</label>
                  <select
                    id="empDesignation"
                    name="empDesignation"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    placeholder="Employee Designation"
                    value={formData.empDesignation}
                    onChange={handleChange}
                    required
                  >
                    {designations.map((designation) => (
                      <option key={designation.designation_id} value={designation.designation_id}>
                        {designation.designation_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="empPersonalEmail" className="block">Personal Email *</label>
                  <input
                    type="email"
                    id="empPersonalEmail"
                    name="empPersonalEmail"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    placeholder="Employee Personal Email"
                    value={formData.empPersonalEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="empPhoneNo" className="block">Phone Number</label>
                  <input
                    type="tel"
                    id="empPhoneNo"
                    name="empPhoneNo"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    placeholder="Employee Phone Number"
                    value={formData.empPhoneNo}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="empAadhaarNo" className="block">Aadhaar Number</label>
                  <input
                    type="text"
                    id="empAadhaarNo"
                    name="empAadhaarNo"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    placeholder="Employee Aadhaar Number"
                    value={formData.empAadhaarNo}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="empPanCardNo" className="block">PAN Card Number</label>
                  <input
                    type="text"
                    id="empPanCardNo"
                    name="empPanCardNo"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    placeholder="Employee PAN Card Number"
                    value={formData.empPanCardNo}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="empJoinDate" className="block">Date of Joining *</label>
                  <input
                    type="date"
                    id="empJoinDate"
                    name="empJoinDate"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    value={formData.empJoinDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="empStatus" className="block">Status *</label>
                  <select
                    id="empStatus"
                    name="empStatus"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    value={formData.empStatus}
                    onChange={handleChange}
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Role Permissions (Optional) */}
<div>
  <label htmlFor="rolePermission" className="block">Role Permissions</label>
  <textarea
    id="rolePermission"
    name="rolePermission"
    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
    value={formData.rolePermission}
    onChange={handleChange} // Make sure this is only necessary if you want to allow editing
    placeholder="Role permissions will be displayed here"
    readOnly // Make it read-only if you're not allowing editing
  />
</div>


              <div className="mt-4">
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                  Submit
                </button>
              </div>
            </form>

            <button
              className="mt-4 text-red-500"
              onClick={() => setShowDialog(false)} // Close dialog when clicked
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employee;
