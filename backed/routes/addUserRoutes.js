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
  
    empConfirmationdate,
    empofferedCTC,
    empPhoneNo,
    empAadhaarNo,
    empPanCardNo,
    empDepartment,
    empDesignation,
    empJoinDate,
    empStatus,
  } = req.body;

  // Validate required fields
  if (!empFullName || !empPersonalEmail  || !role) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields"
    });
  }

  const query = `
    INSERT INTO master (
      emp_full_name,
      emp_personal_email,
      emp_confirmation_date,
      emp_offered_ctc,
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
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)
  `;

  const values = [
    empFullName,
    empPersonalEmail,
    empConfirmationdate,
    empofferedCTC,
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
     
      }
    });
  });
});

//submit personal information
addUserRoutes.post('/submitPersonalInformation', async(req, res) => {
  const { 
    emp_id,
    permanent_address,
    permanent_city,
    permanent_state,
    permanent_zip_code,
    current_address,
    current_city,
    current_state,
    current_zip_code,
    alternate_mob_no,
    emergency_person_name,
    emergency_relationship,
    emergency_mob_no,
    emergency_address,
    marital_status,
    account_holder_name,
    bank_name,
    branch_name,
    account_no,
    IFSC_code,
    education
  } = req.body;

  // ✅ Insert into `bank_details`
  const bankQuery = `INSERT INTO bank_details (account_holder_name, bank_name, branch_name, account_no, IFSC_code, emp_id) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(bankQuery, [account_holder_name, bank_name, branch_name, account_no, IFSC_code, emp_id], (bankError, bankResults) => {
    if (bankError) {
      console.error("Error inserting into bank_details:", bankError);
      return res.status(500).json({
        success: false,
        error: "Database operation failed for bank details",
        details: bankError.message
      });
    }

    // ✅ Insert into `personal_information`
    const personalQuery = `INSERT INTO personal_information (permanent_address, permanent_city, permanent_state, permanent_zip_code, current_address, current_city, current_state,
        current_zip_code, alternate_mob_no, emergency_person_name, emergency_relationship, emergency_mob_no, emergency_address, marital_status, emp_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(personalQuery, [
      permanent_address, permanent_city, permanent_state, permanent_zip_code,
      current_address, current_city, current_state, current_zip_code,
      alternate_mob_no, emergency_person_name, emergency_relationship,
      emergency_mob_no, emergency_address, marital_status, emp_id
    ], (personalError, personalResults) => {
      if (personalError) {
        console.error("Error inserting into personal_information:", personalError);
        return res.status(500).json({
          success: false,
          error: "Database operation failed for personal information",
          details: personalError.message
        });
      }

      // ✅ Insert into `educational_background`
      if (education && Array.isArray(education)) {
        let completed = 0;
        let failed = false;

        education.forEach((edu, index) => {
          const educationQuery = `INSERT INTO educational_background (degree, institution, year_of_passing, emp_id) VALUES (?, ?, ?, ?)`;
          db.query(educationQuery, [edu.degree, edu.institution, edu.year_of_passing, emp_id], (eduError, eduResults) => {
            if (eduError) {
              console.error("Error inserting into educational_background:", eduError);
              failed = true;
            } else {
              completed++;
            }

            // If all education records are processed, check if there was any failure
            if (index === education.length - 1) {
              if (failed) {
                return res.status(500).json({
                  success: false,
                  error: "Database operation failed for education records",
                });
              }

              // ✅ Final Response after all operations are done
              return res.json({
                success: true,
                message: "Personal Information and Education details submitted successfully"
              });
            }
          });
        });
      } else {
        // If education data is empty or not provided
        return res.json({
          success: true,
          message: "Personal Information submitted successfully (no education data)"
        });
      }
    });
  });
});



//fetch employee
addUserRoutes.get('/getAllEmployees', (req, res) => {
  const query = `
SELECT 
    e.id,
    e.emp_id,
    e.emp_full_name,
    e.emp_department AS emp_departmentid,
    e.emp_designation AS emp_designationid,
    e.emp_confirmation_date,
    e.emp_empstatus,
    e.emp_offered_ctc,
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
    r.permission,
    tl.emp_full_name AS team_leader_name,  -- Fetch Team Leader Name
    m.emp_full_name AS manager_name        -- Fetch Manager Name
FROM 
    master e
LEFT JOIN 
    department d ON e.emp_department = d.dep_id
LEFT JOIN 
    designation des ON e.emp_designation = des.designation_id
LEFT JOIN 
    role_and_permission r ON e.role_id = r.role_id
LEFT JOIN 
    master tl ON e.team_leader_id = tl.id  -- Joining master table for Team Leader
LEFT JOIN 
    master m ON e.manager_id = m.id;       -- Joining master table for Manager


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

  let { id, empStatus, empManager, empTeamLeader, workEmail, empPassword } = req.body;
  console.log(req.body)

  if (!id) {
    return res.status(400).json({
      success: false,
      error: "Employee ID (id) is required"
    });
  }

  // Validate required fields
  const missingFields = [];
  if (!empStatus) missingFields.push("empStatus");
  if (!empManager) missingFields.push("empManager");
  if (!empTeamLeader) missingFields.push("empTeamLeader");
  if (!workEmail) missingFields.push("workEmail");
  if (!empPassword) missingFields.push("empPassword");

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: "Required fields missing",
      missingFields
    });
  }

  // Fetch emp_id first before updating
  const getEmpIdQuery = "SELECT emp_id FROM master WHERE id = ?";
  db.query(getEmpIdQuery, [id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch employee record",
        details: err
      });
    }

    let newEmpId = result[0]?.emp_id || null;

    if (!newEmpId) {
      // Generate emp_id if not present
      const getLastEmployeeIdQuery = "SELECT emp_id FROM master WHERE emp_id IS NOT NULL ORDER BY emp_id DESC LIMIT 1";

      db.query(getLastEmployeeIdQuery, (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({
            success: false,
            error: "Failed to fetch last employee ID",
            details: err
          });
        }

        if (result.length > 0 && result[0].emp_id) {
          const lastEmpNumber = parseInt(result[0].emp_id.split('-')[1]); 
          newEmpId = `NKT-${String(lastEmpNumber + 1).padStart(3, '0')}`;
        } else {
          newEmpId = `NKT-001`;
        }

        console.log('Generated emp_id:', newEmpId);
        // Now update employee details with the generated emp_id
        updateEmployeeDetails(newEmpId);
      });
    } else {
      // emp_id already exists, proceed with update
      console.log('Using existing emp_id:', newEmpId);
      updateEmployeeDetails(newEmpId);
    }
  });

  function updateEmployeeDetails(empIdToUse) {
    const updateQuery = `
      UPDATE master SET 
        emp_status = ?, 
        manager_id = ?, 
        team_leader_id= ?, 
        emp_email = ?, 
        emp_password = ?, 
        emp_id = ?
      WHERE id = ?
    `;

    db.query(updateQuery, [empStatus, empManager, empTeamLeader, workEmail, empPassword, empIdToUse, id], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({
          success: false,
          error: "Failed to update employee status",
          details: err
        });
      }

      return res.json({
        success: true,
        message: "Employee details updated successfully",
        empId: empIdToUse
      });
    });
  }
});
addUserRoutes.put('/updateEmploymentStatus', (req, res) => {
  let { id, newDesignation, newStatus, newMobileNumber, newTeamLeader, newManager } = req.body;

  if (!id) {
    return res.status(400).json({ success: false, error: "Employee ID is required" });
  }

  const updateQuery = `
    UPDATE master 
    SET 
      emp_empstatus = ?, 
      emp_designation = ?, 
      emp_phone_no = ?, 
      team_leader_id = ?, 
      manager_id = ? 
    WHERE id = ?
  `;

  db.query(updateQuery, [newStatus, newDesignation, newMobileNumber, newTeamLeader, newManager, id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, error: "Failed to update employment details", details: err });
    }

    return res.json({ success: true, message: "Employment details updated successfully" });
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

// fetch Department by 
addUserRoutes.get('/fetchDepartment/:id', (req, res) => {
  const { id } = req.params;
  console.log("Department ID received:", id);

  const query = `SELECT * FROM department WHERE dep_id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch department",
        details: err.message
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Department not found"
      });
    }

    res.json({
      success: true,
      message: "Department fetched successfully",
      department: result[0]
    });
  });
});

//fetch Designation by
addUserRoutes.get('/fetchDesignation/:id', (req, res) => {
  const { id } = req.params;
  console.log("Designation ID received:", id);

  const query = `SELECT * FROM designation WHERE designation_id = ?;`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch designation",
        details: err.message
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Designation not found"
      });
    }

    res.json({
      success: true,
      message: "Designation fetched successfully",
      designation: result[0]
    });
  });
});


export default addUserRoutes;