// server.js
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'; // Add the .js extension
import addUserRoutes from './routes/addUserRoutes.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: 'your-secret-key', // Replace with a strong, unique secret
    resave: false,             // Don't save the session if it hasn't been modified
    saveUninitialized: false,  // Don't create a session for unauthenticated users
    cookie: {
      httpOnly: true,          // Prevent client-side JavaScript from accessing cookies
      secure: false,           // Set `true` only when using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // Expiration time for the session cookie (1 day in milliseconds)
    },
  })
);

app.use('/api/auth', authRoutes); // Use the routes for authentication
app.use('/api/adduser', addUserRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
