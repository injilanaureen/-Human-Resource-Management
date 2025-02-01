import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaBriefcase,
  FaCreditCard,
  FaCalendarAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { FaKey, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
// Mock data - replace with your actual data

function Employee() {
  const { user } = useAuth();
  const [department, setDepartment] = useState(null);
  const [designation, setDesignation] = useState(null);

  //forgetting the password
  const [showPasswordModal, setShowPasswordModal] = useState(false);
const [oldPassword, setOldPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [showOldPassword, setShowOldPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const toggleOldPasswordVisibility = () => setShowOldPassword(!showOldPassword);
const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
const [isLoading, setIsLoading] = useState(false);  // Initially not loading


  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        if (!user?.emp_department) return; // Ensure emp_department exists
        const response = await axios.get(
          `http://localhost:5000/api/adduser/fetchDepartment/${user.emp_department}`
        );
        setDepartment(response.data.department.dep_name);
      } catch (error) {
        console.error("Error fetching department:", error);
      }
    };

    fetchDepartment();
  }, [user?.emp_department]); // Run only when user.emp_department changes

  useEffect(() => {
    const fetchDesignation = async () => {
      try {
        if (!user?.emp_designation) return; // Ensure emp_designation exists
        const response = await axios.get(
          `http://localhost:5000/api/adduser/fetchDesignation/${user.emp_designation}`
        );
        setDesignation(response.data.designation.designation_name);
      } catch (error) {
        console.error("Error fetching department:", error);
      }
    };

    fetchDesignation();
  }, [user?.emp_designation]); // Run only when user.emp_designation changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        // Basic validation
        if (oldPassword.trim() === "") {
            toast.error("Old password is required!");
            return;
        }
        if (newPassword.trim() === "") {
            toast.error("New password is required!");
            return;
        }
        if (confirmPassword.trim() === "") {
            toast.error("Confirm password is required!");
            return;
        }

        // Password requirements validation
        if (newPassword.length < 8) {
            toast.error("New password must be at least 8 characters long!");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match!");
            return;
        }

        // Show loading state
        setIsLoading(true);

        const response = await axios.put('http://localhost:5000/api/auth/updateUserPassword', {
            empId: user.emp_id,
            oldPassword,
            newPassword,
        });

        // Success case
        if (response.data.success) {
          alert(response.data.message);
            // Reset form
            setShowPasswordModal(false);
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } else {
            // Handle unsuccessful response
            alert(response.data.message || "Failed to update password");
        }

    } catch (error) {
        // Error handling
        const errorMessage = error.response?.data?.message || "Failed to update password. Please try again.";
        alert(errorMessage);
        console.error("Password reset error:", error);
    } finally {
        setIsLoading(false);
    }
};
  



  return (
    <div className="max-h-screen">
      <div className="flex items-center gap-1">
        <Link to="/">
          <ArrowLeft />
        </Link>
      </div>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Employee Information
          </h1>

          <div className="grid gap-6">
            {/* Personal Information */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaUserCircle className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Personal Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Employee ID</p>
                  <p className="font-medium">{user.emp_id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{user.emp_full_name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{user.emp_email}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <div className="flex items-center gap-2">
                    <FaPhone className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{user.emp_phone_no}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaBriefcase className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">
                  Professional Information
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Department</p>
                  <div className="flex items-center gap-2">
                    <FaBuilding className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{department}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Designation</p>
                  <p className="font-medium">{designation}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Joining Date</p>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">
                      {new Date(user.emp_join_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <span className="bg-green-100 text-green-800 py-1 px-2 rounded-md">
                    {user.emp_status}
                  </span>
                </div>
              </div>
            </div>

            {/* Documents & Role */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaShieldAlt className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">
                  Documents & Role Information
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Aadhar Number</p>
                  <div className="flex items-center gap-2">
                    <FaCreditCard className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{user.emp_addhar_no}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    PAN Card Number
                  </p>
                  <div className="flex items-center gap-2">
                    <FaCreditCard className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{user.emp_pan_card_no}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Role Permission
                  </p>
                  <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded-md">
                    {user.role_permission}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Total Leave Balance
                  </p>
                  <p className="font-medium"> static days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setShowPasswordModal(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transition"
        >
          <FaKey className="h-4 w-4" />
          <span>Forgot Password</span>
        </button>
        {/* Password Reset Modal */}
        {showPasswordModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-xl w-96">
      <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
      <form className="space-y-4">
        {/* Old Password Input */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Old Password</label>
          <input
            type={showOldPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <button
            type="button"
            className="absolute top-9 right-3 text-gray-600"
            onClick={toggleOldPasswordVisibility}
          >
            {showOldPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* New Password Input */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <button
            type="button"
            className="absolute top-9 right-3 text-gray-600"
            onClick={toggleNewPasswordVisibility}
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Confirm Password Input */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <button
            type="button"
            className="absolute top-9 right-3 text-gray-600"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setShowPasswordModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
          onClick={handleSubmit}
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      </div>
    </div>
  );
}

export default Employee;
