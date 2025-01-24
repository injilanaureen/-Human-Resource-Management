import express from 'express';
import db from '../config/dbControl.js';  // Make sure it's correct

const authRouter = express.Router();

authRouter.post('/login', (req, res) => {
  const { email, password } = req.body;

  // SQL query to check user credentials
  const query = 'SELECT * FROM master m RIGHT JOIN role_and_permission r ON m.role_id = r.role_id WHERE m.emp_email = ? AND m.emp_password = ?';
  
  db.query(query, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }

    // If no result is found, return a 401 (Unauthorized) status
    if (result.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Assuming only one result is returned, use result[0]
    const user = result[0];
    
    // Return user data along with the role
    return res.json({
      isAuthenticated: true,
      emp_id: user.emp_id,
      emp_full_name: user.emp_full_name,
      role: user.role,
    });
  });
});

export default authRouter;
