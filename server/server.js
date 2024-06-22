const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

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

    const user = results[0];
    if (password === user.password) {
      res.json({ success: true, message: `${role.charAt(0).toUpperCase() + role.slice(1)} login successful` });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// Endpoint to add a student
app.post('/api/students', upload.single('profilePhoto'), (req, res) => {
  const {
    name, dob, rollNo, registerNo, phoneNumber, address, bloodGroup, department,
    year, dayScholar, email, classAdvisor, password
  } = req.body;

  const profilePhoto = req.file ? req.file.filename : null;

  const query = `
    INSERT INTO students (
      name, dob, roll_no, register_no, phone_no, address, blood_group, department,
      year, accommodation, email, class_advisor, profile_photo, password
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(query, [
    name, dob, rollNo, registerNo, phoneNumber, address, bloodGroup, department,
    year, dayScholar, email, classAdvisor, profilePhoto, password
  ], (err) => {
    if (err) {
      console.error('Error inserting student:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }
    res.json({ success: true, message: 'Student added successfully!' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
