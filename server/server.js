const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'shapna0327.',
  database: 'attendance_system'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to Database Successfully');
});

// Login endpoint for admin, faculty, and student
app.post('/:role/login', (req, res) => {
  const { role } = req.params;
  const { username, password } = req.body;

  // Query to check if the user exists
  const query = 'SELECT * FROM users WHERE username = ? AND role = ?';
  connection.query(query, [username, role], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    // Check password (since we're not hashing it here)
    const user = results[0];
    if (password === user.password) {
      res.json({ success: true, message: `${role.charAt(0).toUpperCase() + role.slice(1)} login successful` });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
