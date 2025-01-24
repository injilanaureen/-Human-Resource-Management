// server.js
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';  // Add the .js extension

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); // Use the routes for authentication

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
