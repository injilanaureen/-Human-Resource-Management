// db.js
import mysql from 'mysql2';

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'alquamaa',
  password: 'Alquama@123',
  database: 'hrm',

});

db.connect((err) => {
  if (err) {
    console.error('Could not connect to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

export default db;  // Export the DB connection
