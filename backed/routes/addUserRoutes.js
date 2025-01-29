import express from 'express';
import db from '../config/dbControl.js';

const addUserRoutes = express.Router();

// Fetch all roles
addUserRoutes.get('/fetchRole', (req, res) => {
  const query = "SELECT * FROM role_and_permission";
  
  db.query(query, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch role",
        details: err
      });
    }
    return res.json({
      success: true,
      message: "Role fetched successfully",
      data: result,
    });
  });
});

// Get role permissions for a specific role
addUserRoutes.get('/getRolePermissions', (req, res) => {
  const { role_id } = req.query;
  console.log("Role ID received:", role_id);

  const query = "SELECT permission FROM role_and_permission WHERE role_id = ?";
  
  db.query(query, [role_id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch permissions",
        details: err
      });
    }

    if (result.length > 0) {
      return res.json({
        success: true,
        permissions: result[0].permission
      });
    } else {
      return res.status(404).json({
        success: false,
        error: "Role not found"
      });
    }
  });
});

// Fetch all departments
addUserRoutes.get('/fetchDepartment', (req, res) => {
  const query = "SELECT * FROM department";
  
  db.query(query, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch departments",
        details: err
      });
    }
    return res.json({
      success: true,
      message: "Departments fetched successfully",
      data: result,
    });
  });
});

// Fetch designations for a specific department
addUserRoutes.get('/fetchDesignation', (req, res) => {
  const { dept_id } = req.query;
  
  if (!dept_id) {
    return res.status(400).json({
      success: false,
      error: "Department ID is required"
    });
  }

  const query = "SELECT * FROM designation WHERE dept_id = ?";
  
  db.query(query, [dept_id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch designations",
        details: err
      });
    }
    return res.json({
      success: true,
      message: "Designations fetched successfully",
      data: result,
    });
  });
});

// Submit new user data
addUserRoutes.post('/submitUser', (req, res) => {
  console.log("Received user data:", req.body);

  const {
    role,
    rolePermission,
    empFullName,
    empPersonalEmail,
    empEmail,
    empPassword,
    empPhoneNo,
    empAadhaarNo,
    empPanCardNo,
    empDepartment,
    empDesignation,
    empJoinDate,
    empStatus,
  } = req.body;

  // Validate required fields
  if (!empFullName || !empPersonalEmail || !empEmail || !empPassword || !role) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields"
    });
  }

  const query = `
    INSERT INTO master (
      emp_full_name,
      emp_personal_email,
      emp_email,
      emp_password,
      emp_phone_no,
      emp_addhar_no,
      emp_pan_card_no,
      emp_department,
      emp_designation,
      emp_join_date,
      emp_status,
      role_id,
      role_permission
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    empFullName,
    empPersonalEmail,
    empEmail,
    empPassword,
    empPhoneNo || null,
    empAadhaarNo || null,
    empPanCardNo || null,
    empDepartment,
    empDesignation,
    empJoinDate,
    empStatus,
    role,
    rolePermission
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        success: false,
        error: "Failed to submit user data",
        details: err
      });
    }

    return res.json({
      success: true,
      message: "User data submitted successfully",
      data: {
        id: result.insertId,
        empEmail,
        empPassword
      }
    });
  });
});
//fetch employee

addUserRoutes.get('/getAllEmployees', (req, res) => {
  const query = `
    SELECT 
      e.emp_id,
      e.emp_full_name,
      e.emp_personal_email,
      e.emp_phone_no,
      e.emp_addhar_no,
      e.emp_pan_card_no,
      d.dep_name AS emp_department,
      des.designation_name AS emp_designation,
      e.emp_join_date,
      e.emp_status,
      r.role AS role_name,
      e.emp_email,
      e.emp_password,
      r.permission
    FROM 
      master e
    LEFT JOIN 
      department d ON e.emp_department = d.dep_id
    LEFT JOIN 
      designation des ON e.emp_designation = des.designation_id
    LEFT JOIN 
      role_and_permission r ON e.role_id = r.role_id;
  `;
  
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching employees:", err);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch employees",
        details: err,
      });
    }
    console.log("Employees fetched:", result); // Log the result here
    return res.status(200).json({
      success: true,
      message: "Successfully fetched employees",
      data: result,
    });
  });
  
});
addUserRoutes.get('/getSingleEmployee/:emp_id', (req, res) => {
  const { emp_id } = req.params;
  const query = `
    SELECT 
      e.emp_id,
      e.emp_full_name,
      e.emp_personal_email,
      e.emp_phone_no,
      e.emp_addhar_no,
      e.emp_pan_card_no,
      d.dep_name AS emp_department,
      des.designation_name AS emp_designation,
      e.emp_join_date,
      e.emp_status,
      r.role AS role_name,
      e.emp_email,
      e.emp_password,
      r.permission
    FROM 
      master e
    LEFT JOIN 
      department d ON e.emp_department = d.dep_id
    LEFT JOIN 
      designation des ON e.emp_designation = des.designation_id
    LEFT JOIN 
      role_and_permission r ON e.role_id = r.role_id
      where e.emp_id= ?;
      
  `;
  
  db.query(query,[emp_id] ,(err, result) => {
    if (err) {
      console.error("Error fetching employee:", err);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch employee",
        details: err,
      });
    }
    
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetched employee",
      data: result[0], // Return single object instead of array
    });
  });
  
});

// Update user status
addUserRoutes.put('/updateUserStatus', (req, res) => {
  const { empId, status } = req.body;

  if (!empId || !status) {
    return res.status(400).json({
      success: false,
      error: "Employee ID and status are required"
    });
  }

  const query = "UPDATE master SET emp_status = ? WHERE emp_id = ?";

  db.query(query, [status, empId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        success: false,
        error: "Failed to update user status",
        details: err
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Employee not found"
      });
    }

    return res.json({
      success: true,
      message: "User status updated successfully"
    });
  });
});

// Delete user
addUserRoutes.delete('/deleteUser/:empId', (req, res) => {
  const { empId } = req.params;

  if (!empId) {
    return res.status(400).json({
      success: false,
      error: "Employee ID is required"
    });
  }

  const query = "DELETE FROM master WHERE emp_id = ?";

  db.query(query, [empId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        success: false,
        error: "Failed to delete user",
        details: err
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Employee not found"
      });
    }

    return res.json({
      success: true,
      message: "User deleted successfully"
    });
  });
});

export default addUserRoutes;