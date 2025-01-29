import React, { useState, useEffect } from 'react';
import { ArrowLeft, EyeOff,XCircle, Plus } from 'lucide-react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Search } from 'lucide-react';
import { Filter } from 'lucide-react';
import { Settings } from 'lucide-react';
import { Eye } from 'lucide-react';
import { FolderInput } from 'lucide-react';
import { EllipsisVertical } from 'lucide-react';


function Employee() {
  const [formData, setFormData] = useState({
    empFullName: '',
    empPersonalEmail: '',
    empEmail: '',
    empPassword: '',
    empPhoneNo: '',
    empAadhaarNo: '',
    empPanCardNo: '',
    empDepartment: '',
    empDesignation: '',
    empJoinDate: '',
    empStatus: 'Inactive',
    role: '',
    rolePermission: '',
  });
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [allEmployeeData,setAllEmployeeData] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSideBar,setShowSidebar]= useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'role') {
      fetchRolePermissions(value);
    }

    if (name === 'empFullName') {
      // Generate work email when name changes
      const workEmail = value.toLowerCase().replace(/\s+/g, '.') + '@nikatby.com';
      setFormData(prev => ({
        ...prev,
        empEmail: workEmail
      }));
    }
  };

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

  const fetchRolePermissions = async (roleId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/adduser/getRolePermissions?role_id=${roleId}`);
      if (response.data.success) {
        setFormData(prev => ({
          ...prev,
          rolePermission: response.data.permissions
        }));
      } else {
        console.error('Failed to fetch permissions:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  const fetchAllEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/adduser/getAllEmployees');
      console.log("Response data:", response.data); // Log the response
      if (response.data.success) {
        setAllEmployeeData(response?.data?.data);
        setFilteredData(response?.data?.data);
      } else {
        console.error('Failed to fetch employees:', response.data.error);
      }
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  };

  const handleSearch = (e)=>{
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredData = allEmployeeData.filter((employee) => 
      employee.emp_full_name.toLowerCase().includes(value)
    );
    
    setFilteredEmployees(filteredData);
  }
  const resetSearch= ()=>{
    setSearchTerm('');
    setFilteredEmployees(allEmployeeData);
  }

  useEffect(() => {
    fetchRoles();
    fetchDepartment();
  }, []);

  useEffect(()=>{
    fetchAllEmployees();
  },[])

  useEffect(() => {
    if (selectedDepartment) {
      fetchDesignations(selectedDepartment);
    }
  }, [selectedDepartment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Generate temporary password
    const temporaryPassword = Math.random().toString(36).slice(-8);
    
    const submitData = {
      ...formData,
      empPassword: temporaryPassword,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/adduser/submitUser",
        submitData
      );

      if (response.data.success) {
        console.log("User added successfully:", response.data);
        alert(`User created successfully!\nWork Email: ${submitData.empEmail}\nTemporary Password: ${temporaryPassword}`);
        setShowDialog(false);
        // Reset form
        setFormData({
          empFullName: '',
          empPersonalEmail: '',
          empEmail: '',
          empPassword: '',
          empPhoneNo: '',
          empAadhaarNo: '',
          empPanCardNo: '',
          empDepartment: '',
          empDesignation: '',
          empJoinDate: '',
          empStatus: '',
          role: '',
          rolePermission: '',
        });
      } else {
        console.error("Failed to add user:", response.data.error);
        alert("Failed to add user. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };
 
 
  return (
    <div className="max-h-screen">
      <Link to="/">
        <div className="flex items-center gap-1">
          <ArrowLeft />
          <p>Employee</p>
        </div>
      </Link>
      
      {/** new hire and directory row */}

      <div className="flex justify-between items-center p-2 mt-4">
          <p className="text-indigo-400 underline">Directory</p>
        
        <button
          className="text-indigo-400 border-2 border-gray-300 p-2 flex items-center"
          onClick={() => setShowDialog(true)}
        >
          <Plus className='size-4' /><p className='text-sm font-bold'>New Hire</p> 
        </button>
      </div>

       {/** search and filter row */}

      <div className="flex justify-between items-center mt-4">  
             {/** search */}
           <div className='border-2 flex gap-1 p-2 items-center border-gray-400 rounded-lg'>
             <Search className='text-gray-600 size-4'/>
             <input
              type="text" name='search'
              placeholder="Search Employee"
              className="border-none bg-transparent outline-none rounded-lg w-96 text-sm text-gray-600"
              value={searchTerm}
              onChange={handleSearch}
              />
               {searchTerm && (
                <button onClick={resetSearch} 
                className='text-gray-600'
                >
                  <XCircle/>
                </button>
              )}
             
           </div>

 
           <div className='flex relative'>
        <button
          className=" border-2 border-gray-300 p-2 flex"
          onClick={() => setShowDialog(true)}
        >
          <Filter className='size-4' />
           <div className='rounded-full bg-indigo-400 absolute size-4 top-1 left-5 text-xs text-white'>1</div>
        </button>
        
        <button
          className=" border-2 border-l-0 border-gray-300 p-2 flex"
          onClick={() => setShowDialog(true)}
        >
          <Settings className='size-4' /> 
          <div className='rounded-full bg-indigo-400 absolute size-4 top-1 left-14 text-xs text-white'>1</div>
        </button><button
          className=" border-2 border-l-0 border-gray-300 p-2 flex"
          onClick={() => setShowDialog(true)}
        >
          <Eye className='size-4' />
        </button><button
          className=" border-2 border-l-0 border-gray-300 p-2 flex"
          onClick={() => setShowDialog(true)}
        >
          <FolderInput className='size-4' /> 
        </button>

           </div>
      </div>



{/** employee table */}
<div className="overflow-x-auto border border-gray-300 mt-10 rounded-lg">
  {/* Table Header */}
  <div className="grid grid-cols-[50px_150px_80px_150px_150px_250px_200px_200px_150px_150px] bg-primary-color text-btn-text-color font-semibold">
    <div className="p-2">
      <input type="checkbox" className="accent-secondary-color" />
    </div>
    <div className="p-2 text-sm">Name</div>
    <div className="p-2 text-sm">ID</div>
    <div className="p-2 text-sm">Designation</div>
    <div className="p-2 text-sm">Department</div>
    <div className="p-2 text-sm">Email ID</div>
    <div className="p-2 text-sm">Personal Email</div>
    <div className="p-2 text-sm">Office Mobile Number</div>
    <div className="p-2 text-sm">Current Role</div>
  </div>

  {/* Table Rows */}
  <div className="divide-y divide-gray-300">
    {filteredEmployees.map((row) => (
      <div
        key={row.id}
        className="grid grid-cols-[50px_150px_80px_150px_150px_250px_200px_200px_150px_150px] bg-white hover:bg-gray-100"
      >
        <div className="p-2">
          <input type="checkbox" className="accent-secondary-color" />
        </div>
       <Link to="/employeeOverview"> <div className="p-2 flex items-center gap-4 text-blue-600 font-semibold underline">{row.emp_full_name} <EllipsisVertical  className="text-gray-400 size-4"/></div></Link>
        
       <div className="p-2 text-md">{row.emp_id}</div>
        <div className="p-2 text-md">{row.emp_designation}</div>
        <div className="p-2 text-md">{row.emp_department}</div>
        <div className="p-2 text-md">{row.emp_email}</div>
        <div className="p-2 text-md">{row.emp_personal_email}</div>
        <div className="p-2 text-md">{row.emp_phone_no}</div>
        <div className="p-2 text-md">{row.role_name}</div> {/* Updated role */}
      </div>
    ))}
  </div>
</div>


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
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select a Role</option>
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
                    value={formData.empDepartment}
                    onChange={(e) => {
                      handleChange(e);
                      setSelectedDepartment(e.target.value);
                    }}
                    required
                  >
                    <option value="" disabled>Select Department</option>
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
                    value={formData.empDesignation}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select Designation</option>
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
                    placeholder="Personal Email"
                    value={formData.empPersonalEmail}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="empEmail" className="block">Work Email</label>
                  <input
                    type="email"
                    id="empEmail"
                    name="empEmail"
                    className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                    placeholder="Will be generated automatically"
                    value={formData.empEmail}
                    readOnly
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
                    placeholder="Phone Number"
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
                    placeholder="Aadhaar Number"
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
                    placeholder="PAN Card Number"
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
                    <option value="Inactive" disabled>Inactive</option>
                  
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="rolePermission" className="block">Role Permissions</label>
                <textarea
                  id="rolePermission"
                  name="rolePermission"
                  className="form-control db-input w-full border-2 border-grey-100 mt-2 p-2"
                  value={formData.rolePermission || "Role permissions will be displayed here"}
                  readOnly
                />
              </div>

              <div className="mt-4 flex justify-between">
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                  Submit
                </button>
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => setShowDialog(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employee;