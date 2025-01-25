import express from 'express';
import db from '../config/dbControl.js';

const addUserRoutes = express.Router();

addUserRoutes.post('/addUser', (req, res) => {
  
    console.log(req.body);
    
  });
addUserRoutes.get('/fetchRole', (req, res) => {
  
const query = "SELECT * FROM role_and_permission";

db.query(query, (err,result)=>{
  if(err){
    return res.status(500).json({error: "Failed to fetch role",details:err});
  }
  return res.json({
    success: true,
    message: "Role fetched successfully",
    data: result,
  })
  
})

  }); 
  // Fetch role permissions from the database based on roleId
addUserRoutes.get('/api/getRolePermissions', (req, res) => {
  const { roleId } = req.query;

  // Query the database to get permissions for the given roleId
  const query = "SELECT permissions FROM role_and_permission WHERE role_id = ?";
  
  db.query(query, [roleId], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: "Failed to fetch permissions", details: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ success: false, error: "Role not found" });
    }

    // Assuming 'permissions' column contains the permissions related to the role.
    return res.json({
      success: true,
      permissions: result[0].permissions, // Adjust this based on your table structure
    });
  });
});

  addUserRoutes.get('/fetchDepartment',(resq,res)=>{
    const query= "SELECT * FROM department";
      db.query(query,(err,result)=>{
        if(err){
          return res.status(500).json({error: "Failed to fetch department",details:err});
        }
        return res.json({
          success: true,
          message: "Department fetched successfully",
          data: result,
        })
      })
  })
// Backend route to fetch designations based on department
addUserRoutes.get('/fetchDesignation', (req, res) => {
  const { dept_id } = req.query;  // dept_id passed as a query parameter
  const query = "SELECT * FROM designation WHERE dept_id = ?";
  
  db.query(query, [dept_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch designations", details: err });
    }
    return res.json({
      success: true,
      message: "Designations fetched successfully",
      data: result,
    });
  });
});


addUserRoutes.post('/submitUser', (req, res) => {
  const { 
    role, 
    rolePermission, 
    empFullName, 
    empPersonalEmail, 
    empPhoneNo, 
    empAadhaarNo, 
    empPanCardNo, 
    empDepartment, 
    empDesignation, 
    empJoinDate, 
    empStatus, 
    empEmail, 
    empPassword 
  } = req.body;

  // Corrected SQL Query with appropriate field names
  const query = `
    INSERT INTO master (
      emp_full_name,
      emp_personal_email,
      emp_phone_no,
      emp_addhar_no,
      emp_pan_card_no,
      emp_department,
      emp_designation,
      emp_join_date,
      emp_status,
      role_id,
      role_permission,
      emp_email,
      emp_password
    ) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;

  db.query(query, [
    empFullName,
    empPersonalEmail,
    empPhoneNo,
    empAadhaarNo,
    empPanCardNo,
    empDepartment,
    empDesignation,
    empJoinDate,
    empStatus,
    role, // Assuming 'role' corresponds to the role_id
    rolePermission,
    empEmail,
    empPassword
  ], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to submit user data", details: err });
    }
    return res.json({
      success: true,
      message: "User data submitted successfully",
      data: result,
    });
  });
});



export default addUserRoutes;