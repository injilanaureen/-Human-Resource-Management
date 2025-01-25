import express from 'express';
import db from '../config/dbControl.js';

const authRouter = express.Router();

// Login route
authRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  
  const query =
    'SELECT * FROM master m RIGHT JOIN role_and_permission r ON m.role_id = r.role_id WHERE m.emp_email = ? AND m.emp_password = ? ';

  db.query(query, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result[0];
    console.log(user);
    // Save user information in the session
    req.session.user = {
      emp_id: user.emp_id,
      emp_full_name: user.emp_full_name,
      role: user.role,
    };

    res.cookie('isAuthenticated', true, {

      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    // Send a success response
    return res.json({
      isAuthenticated: true,
      emp_id: user.emp_id,
      emp_full_name: user.emp_full_name,
      role: user.role,
    });
  });
});

// Logout route
authRouter.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to log out' });
    }
    res.clearCookie('isAuthenticated');
    return res.json({ message: 'Logged out successfully' });
  });
});

// Check session route (for front-end validation)
authRouter.get('/session', (req, res) => {
  if (req.session.user) {
    return res.json({
      isAuthenticated: true,
      user: req.session.user,
    });
  } else {
    return res.status(401).json({ isAuthenticated: false });
  }
});

export default authRouter;
