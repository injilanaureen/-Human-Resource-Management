const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Mock user database
const users = [
  { id: 1, username: 'admin', password: bcrypt.hashSync('admin', 10), role: 'admin' },
  { id: 2, username: 'employee', password: bcrypt.hashSync('employee', 10), role: 'employee' },
  { id: 3, username: 'hr', password: bcrypt.hashSync('hr', 10), role: 'hr' },
];

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

exports.login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, role: user.role });
};
