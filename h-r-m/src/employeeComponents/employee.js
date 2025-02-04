// import {
//   FaUserCircle,
//   FaEnvelope,
//   FaPhone,
//   FaBuilding,
//   FaBriefcase,
//   FaCreditCard,
//   FaCalendarAlt,
//   FaShieldAlt,
// } from "react-icons/fa";
// import { FaKey, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import { ToastContainer, toast } from 'react-toastify';

// import { Link } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// // Mock data - replace with your actual data

// function Employee() {
//   const { user } = useAuth();
//   const [department, setDepartment] = useState(null);
//   const [designation, setDesignation] = useState(null);

//   //forgetting the password
//   const [showPasswordModal, setShowPasswordModal] = useState(false);
// const [oldPassword, setOldPassword] = useState("");
// const [newPassword, setNewPassword] = useState("");
// const [confirmPassword, setConfirmPassword] = useState("");

// const [showOldPassword, setShowOldPassword] = useState(false);
// const [showNewPassword, setShowNewPassword] = useState(false);
// const [showConfirmPassword, setShowConfirmPassword] = useState(false);

// const toggleOldPasswordVisibility = () => setShowOldPassword(!showOldPassword);
// const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
// const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
// const [isLoading, setIsLoading] = useState(false);  // Initially not loading

//   useEffect(() => {
//     const fetchDepartment = async () => {
//       try {
//         if (!user?.emp_department) return; // Ensure emp_department exists
//         const response = await axios.get(
//           `http://localhost:5000/api/adduser/fetchDepartment/${user.emp_department}`
//         );
//         setDepartment(response.data.department.dep_name);
//       } catch (error) {
//         console.error("Error fetching department:", error);
//       }
//     };

//     fetchDepartment();
//   }, [user?.emp_department]); // Run only when user.emp_department changes

//   useEffect(() => {
//     const fetchDesignation = async () => {
//       try {
//         if (!user?.emp_designation) return; // Ensure emp_designation exists
//         const response = await axios.get(
//           `http://localhost:5000/api/adduser/fetchDesignation/${user.emp_designation}`
//         );
//         setDesignation(response.data.designation.designation_name);
//       } catch (error) {
//         console.error("Error fetching department:", error);
//       }
//     };

//     fetchDesignation();
//   }, [user?.emp_designation]); // Run only when user.emp_designation changes
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//         // Basic validation
//         if (oldPassword.trim() === "") {
//             toast.error("Old password is required!");
//             return;
//         }
//         if (newPassword.trim() === "") {
//             toast.error("New password is required!");
//             return;
//         }
//         if (confirmPassword.trim() === "") {
//             toast.error("Confirm password is required!");
//             return;
//         }

//         // Password requirements validation
//         if (newPassword.length < 8) {
//             toast.error("New password must be at least 8 characters long!");
//             return;
//         }
//         if (newPassword !== confirmPassword) {
//             toast.error("New password and confirm password do not match!");
//             return;
//         }

//         // Show loading state
//         setIsLoading(true);

//         const response = await axios.put('http://localhost:5000/api/auth/updateUserPassword', {
//             empId: user.emp_id,
//             oldPassword,
//             newPassword,
//         });

//         // Success case
//         if (response.data.success) {
//           alert(response.data.message);
//             // Reset form
//             setShowPasswordModal(false);
//             setOldPassword("");
//             setNewPassword("");
//             setConfirmPassword("");
//         } else {
//             // Handle unsuccessful response
//             alert(response.data.message || "Failed to update password");
//         }

//     } catch (error) {
//         // Error handling
//         const errorMessage = error.response?.data?.message || "Failed to update password. Please try again.";
//         alert(errorMessage);
//         console.error("Password reset error:", error);
//     } finally {
//         setIsLoading(false);
//     }
// };

//   return (
//     <div className="max-h-screen">
//       <div className="flex items-center gap-1">
//         <Link to="/">
//           <ArrowLeft />
//         </Link>
//       </div>
//       <div className="max-w-4xl mx-auto">
//         {/* Back Button */}

//         <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-8">
//             Employee Information
//           </h1>

//           <div className="grid gap-6">
//             {/* Personal Information */}
//             <div className="bg-white shadow rounded-lg p-6">
//               <div className="flex items-center gap-2 mb-4">
//                 <FaUserCircle className="h-6 w-6 text-primary" />
//                 <h2 className="text-xl font-semibold">Personal Information</h2>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <p className="text-sm text-muted-foreground">Employee ID</p>
//                   <p className="font-medium">{user.emp_id}</p>
//                 </div>
//                 <div className="space-y-1">
//                   <p className="text-sm text-muted-foreground">Full Name</p>
//                   <p className="font-medium">{user.emp_full_name}</p>
//                 </div>
//                 <div className="space-y-1">
//                   <p className="text-sm text-muted-foreground">Email</p>
//                   <div className="flex items-center gap-2">
//                     <FaEnvelope className="h-4 w-4 text-muted-foreground" />
//                     <p className="font-medium">{user.emp_email}</p>
//                   </div>
//                 </div>
//                 <div className="space-y-1">
//                   <p className="text-sm text-muted-foreground">Phone</p>
//                   <div className="flex items-center gap-2">
//                     <FaPhone className="h-4 w-4 text-muted-foreground" />
//                     <p className="font-medium">{user.emp_phone_no}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Professional Information */}
//             <div className="bg-white shadow rounded-lg p-6">
//               <div className="flex items-center gap-2 mb-4">
//                 <FaBriefcase className="h-6 w-6 text-primary" />
//                 <h2 className="text-xl font-semibold">
//                   Professional Information
//                 </h2>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <p className="text-sm text-muted-foreground">Department</p>
//                   <div className="flex items-center gap-2">
//                     <FaBuilding className="h-4 w-4 text-muted-foreground" />
//                     <p className="font-medium">{department}</p>
//                   </div>
//                 </div>
//                 <div className="space-y-1">
//                   <p className="text-sm text-muted-foreground">Designation</p>
//                   <p className="font-medium">{designation}</p>
//                 </div>
//                 <div className="space-y-1">
//                   <p className="text-sm text-muted-foreground">Joining Date</p>
//                   <div className="flex items-center gap-2">
//                     <FaCalendarAlt className="h-4 w-4 text-muted-foreground" />
//                     <p className="font-medium">
//                       {new Date(user.emp_join_date).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="space-y-1">
//                   <p className="text-sm text-muted-foreground">Status</p>
//                   <span className="bg-green-100 text-green-800 py-1 px-2 rounded-md">
//                     {user.emp_status}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Documents & Role */}
//             <div className="bg-white shadow rounded-lg p-6">
//               <div className="flex items-center gap-2 mb-4">
//                 <FaShieldAlt className="h-6 w-6 text-primary" />
//                 <h2 className="text-xl font-semibold">
//                   Documents & Role Information
//                 </h2>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <p className="text-sm text-muted-foreground">Aadhar Number</p>
//                   <div className="flex items-center gap-2">
//                     <FaCreditCard className="h-4 w-4 text-muted-foreground" />
//                     <p className="font-medium">{user.emp_addhar_no}</p>
//                   </div>
//                 </div>
//                 <div className="space-y-1">
//                   <p className="text-sm text-muted-foreground">
//                     PAN Card Number
//                   </p>
//                   <div className="flex items-center gap-2">
//                     <FaCreditCard className="h-4 w-4 text-muted-foreground" />
//                     <p className="font-medium">{user.emp_pan_card_no}</p>
//                   </div>
//                 </div>
//                 <div className="space-y-1">
//                   <p className="text-sm text-muted-foreground">
//                     Role Permission
//                   </p>
//                   <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded-md">
//                     {user.role_permission}
//                   </span>
//                 </div>
//                 <div className="space-y-1">
//                   <p className="text-sm text-muted-foreground">
//                     Total Leave Balance
//                   </p>
//                   <p className="font-medium"> static days</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="fixed bottom-4 right-4">
//         <button
//           onClick={() => setShowPasswordModal(true)}
//           className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transition"
//         >
//           <FaKey className="h-4 w-4" />
//           <span>Forgot Password</span>
//         </button>
//         {/* Password Reset Modal */}
//         {showPasswordModal && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//     <div className="bg-white p-6 rounded-lg shadow-xl w-96">
//       <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
//       <form className="space-y-4">
//         {/* Old Password Input */}
//         <div className="relative">
//           <label className="block text-sm font-medium mb-1">Old Password</label>
//           <input
//             type={showOldPassword ? "text" : "password"}
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//             className="w-full px-3 py-2 border rounded-md"
//             required
//           />
//           <button
//             type="button"
//             className="absolute top-9 right-3 text-gray-600"
//             onClick={toggleOldPasswordVisibility}
//           >
//             {showOldPassword ? <FaEyeSlash /> : <FaEye />}
//           </button>
//         </div>

//         {/* New Password Input */}
//         <div className="relative">
//           <label className="block text-sm font-medium mb-1">New Password</label>
//           <input
//             type={showNewPassword ? "text" : "password"}
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="w-full px-3 py-2 border rounded-md"
//             required
//           />
//           <button
//             type="button"
//             className="absolute top-9 right-3 text-gray-600"
//             onClick={toggleNewPasswordVisibility}
//           >
//             {showNewPassword ? <FaEyeSlash /> : <FaEye />}
//           </button>
//         </div>

//         {/* Confirm Password Input */}
//         <div className="relative">
//           <label className="block text-sm font-medium mb-1">Confirm Password</label>
//           <input
//             type={showConfirmPassword ? "text" : "password"}
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full px-3 py-2 border rounded-md"
//             required
//           />
//           <button
//             type="button"
//             className="absolute top-9 right-3 text-gray-600"
//             onClick={toggleConfirmPasswordVisibility}
//           >
//             {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//           </button>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end gap-2">
//           <button
//             type="button"
//             onClick={() => setShowPasswordModal(false)}
//             className="px-4 py-2 text-gray-600 hover:text-gray-800"
//           >
//             Cancel
//           </button>
//           <button
//           onClick={handleSubmit}
//             type="submit"
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//           >
//             Reset Password
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// )}

//       </div>
//     </div>
//   );
// }

// export default Employee;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { FaEdit } from "react-icons/fa"; // If using React Icons for better performance
 import { FaKey, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
function Employee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
const [oldPassword, setOldPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
 const [isLoading, setIsLoading] = useState(false);  // Initially not loading
const [showOldPassword, setShowOldPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const toggleOldPasswordVisibility = () => setShowOldPassword(!showOldPassword);
const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
  const [modalEmployee, setModalEmployee] = useState({});
  const { user } = useAuth();

  const [employee, setEmployee] = useState(null);

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

  
  const handleEditClick = () => {
    setIsModalOpen(true);
    setModalEmployee(employee); // Load current data into the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = async () => {
    try {
      // Make API call to update the emergency contact details
      const response = await axios.put(
        `http://localhost:5000/api/adduser/updateEmergencyContact/${employee.emp_id}`,
        {
          emergency_person_name: modalEmployee.emergency_person_name,
          emergency_relationship: modalEmployee.emergency_relationship,
          emergency_address: modalEmployee.emergency_address,
          emergency_mob_no: modalEmployee.emergency_mob_no,
        }
      );
  
      console.log("Update response:", response.data);
  
      if (response.data.success) {
        // Update the employee object with the modified data
        setEmployee({
          ...employee,
          emergency_person_name: modalEmployee.emergency_person_name,
          emergency_relationship: modalEmployee.emergency_relationship,
          emergency_address: modalEmployee.emergency_address,
          emergency_mob_no: modalEmployee.emergency_mob_no,
        });
        setIsModalOpen(false); // Close the modal after saving
      } else {
        console.error("Failed to update emergency contact:", response.data.error);
      }
    } catch (error) {
      console.error("Error updating emergency contact:", error);
    }
    setIsModalOpen(false);
  };
  

  const getEmployee = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/adduser/getSingleEmployee/${user.emp_id}`
      );
      console.log(response.data);

      if (response.data.success) {
        const nameParts = name.split(" ");

        // Extract first, middle, and last names

        setEmployee(response.data.data);
      } else {
        console.error("Failed to fetch employee:", response.data.error);
      }
    } catch (error) {
      console.error("Failed to fetch employee:", error);
    }
  };

  useEffect(() => {
    if (user.emp_id) getEmployee();
  }, [user.emo_id]);

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="p-4 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">My Profile</h2>
        <div className="space-x-2">
          <Link to={`/employeepersonaldetails/${employee.emp_id}`}>
            <button className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm">
              VIEW PERSONAL DETAILS
            </button>
          </Link>
          <button className="bg-purple-500 text-white px-3 py-1.5 rounded text-sm">
            DOWNLOAD
          </button>

         {/* forget button  */}
         <button className="bg-indigo-400 text-white px-3 py-1.5 rounded text-sm" onClick={() => setShowPasswordModal(true)}>
          FORGOT PASSWORD
          </button>
 {/* forget model  */}
 {showPasswordModal && (
  <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
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

      <div className="bg-white rounded-lg shadow p-6">
        {/* Main Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-500 text-xs">Employee ID</p>
            <p className="text-sm">{employee.emp_id}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Email ID</p>
            <p className="text-sm">{employee.emp_personal_email}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Department</p>
            <p className="text-sm">{employee.emp_department}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Current Office Location</p>
            <p className="text-sm">
              {employee.office_location ||
                "Nikatby technologies pvt ltd, Noida, Uttar Pradesh, India (Non-Metro City)"}
            </p>
          </div>
              
          <div>
            <p className="text-gray-500 text-xs">HOD</p>
            <p className="text-sm">
              {employee.hod || "Dr Bandana Kedia (PPIN311)"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Gender</p>
            <p className="text-sm">{employee.emp_gender}</p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Date of Joining</p>
            <p className="text-sm">
              {new Date(employee.emp_join_date).toLocaleDateString() ||
                "28-02-2022"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Date of Confirmation</p>
            <p className="text-sm">
              {new Date(employee.emp_confirmation_date).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Company</p>
            <p className="text-sm">
              {employee.company || "NikatBy Technologies  Pvt. Ltd."}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Team Leader</p>
            <p className="text-sm">{employee.team_leader_name}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Manager</p>
            <p className="text-sm">{employee.manager_name}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Assigned Permission</p>
            <p className="text-sm">{employee.permission}</p>
          </div>
        </div>

        {/* Separator */}
        <hr className="my-6 border-gray-200" />

        {/* Biographical Section */}
        <div>
          <h3 className="text-sm font-medium mb-3">Biographical</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-500 text-xs">First Name</p>
              <p className="text-sm">
                {" "}
                {employee.emp_full_name
                  ? employee.emp_full_name.split(" ")[0]
                  : "NA"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Middle Name</p>
              <p className="text-sm">
                {" "}
                {employee.emp_full_name
                  ? employee.emp_full_name.split(" ")[1] || "NA"
                  : "NA"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Last Name</p>
              <p className="text-sm">
                {employee.emp_full_name
                  ? employee.emp_full_name.split(" ")[2] || "NA"
                  : "NA"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Date of Birth</p>
              <p className="text-sm">
                {new Date(employee.emp_dob).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Separator */}
        <hr className="my-6 border-gray-200" />

        <div>
          <h3 className="text-sm font-medium mb-3">Contact</h3>
          <div>
            <p className="text-gray-500 text-xs">Office Mobile No</p>
            <p className="text-sm">{employee.emp_phone_no}</p>
          </div>
        </div>

        {/* Separator */}
        <hr className="my-6 border-gray-200" />

        {/* Organization Chart */}
        <div>
          <h3 className="text-sm font-medium mb-6">Organization Chart</h3>
          <div className="relative">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-xs mb-1 border-2 border-gray-300">
                {
                  // Dynamically extract initials from the full name string
                  employee.manager_name
                    .split(" ") // Split the name by spaces
                    .map((namePart) => namePart.charAt(0).toUpperCase()) // Get first letter of each part
                    .join("") // Join the initials together
                }
              </div>
              <div className="text-center">
                <p className="text-xs font-medium">{employee.manager_name}</p>{" "}
                {/* Full name dynamically rendered */}
                <p className="text-xs text-gray-500">Project Manager</p>
              </div>
              <div className="h-8 w-px bg-gray-300 my-2"></div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-xs mb-1 border-2 border-gray-300">
                {
                  // Dynamically extract initials from the full name string
                  employee.team_leader_name
                    .split(" ") // Split the name by spaces
                    .map((namePart) => namePart.charAt(0).toUpperCase()) // Get first letter of each part
                    .join("") // Join the initials together
                }
              </div>
              <div className="text-center">
                <p className="text-xs font-medium">
                  {employee.team_leader_name}
                </p>{" "}
                {/* Full name dynamically rendered */}
                <p className="text-xs text-gray-500">Team Leader</p>
              </div>
              <div className="h-8 w-px bg-gray-300 my-2"></div>
            </div>

            {/* Current Employee */}
            <div className="flex justify-center">
              <div className="flex bg-indigo-600 p-6 gap-3 items-center rounded-lg shadow-lg shadow-sky-400/50">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs text-white border-2 mb-1">
                  {employee.emp_full_name
                    .split(" ") // Split the full name by space to get the first and last names
                    .map((namePart) => namePart.charAt(0).toUpperCase()) // Take the first letter of each name part
                    .join("")}{" "}
                  {/* Join the initials together */}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium text-white">
                    {employee.emp_full_name}
                  </p>
                  <p className="text-xs text-white">
                    {employee.emp_designation}
                  </p>
                  <p className="text-xs text-white">
                    {employee.emp_department}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employee;
