const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'shapna0327.', // Replace with your MySQL password
  database: 'attendance_system' // Replace with your database name
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

// Endpoint to add a single student
app.post('/api/students', (req, res) => {
  const {
    name, rollNo, registerNo, dob, class: studentClass, department, year,
    classAdvisor, email, phoneNumber, address, bloodGroup, dayScholar, password
  } = req.body;

  const query = `
    INSERT INTO students (
      name, roll_no, register_no, dob, class, department, year, class_advisor,
      email, phone_no, address, blood_group, accommodation, password
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(query, [
    name, rollNo, registerNo, dob, studentClass, department, year, classAdvisor,
    email, phoneNumber, address, bloodGroup, dayScholar, password
  ], (err) => {
    if (err) {
      console.error('Error inserting student:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }
    res.json({ success: true, message: 'Student added successfully!' });
  });
});

// Endpoint to handle bulk upload of students from CSV
app.post('/api/students/bulk', upload.single('csvFile'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'No file uploaded' });
    return;
  }

  const filePath = req.file.path;
  const students = [];

  // Read CSV file and parse data
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      students.push([
        row.name, row.dob, row.rollNo, row.registerNo, row.phoneNumber, row.address,
        row.bloodGroup, row.department, row.year, row.dayScholar, row.email,
        row.classAdvisor, row.password, row.class // Add class field
      ]);
    })
    .on('end', () => {
      // Insert parsed data into MySQL database
      const query = `
        INSERT INTO students (
          name, dob, roll_no, register_no, phone_no, address, blood_group, department,
          year, accommodation, email, class_advisor, password, class
        ) VALUES ?
      `;

      connection.query(query, [students], (err) => {
        if (err) {
          console.error('Error inserting students:', err);
          res.status(500).json({ success: false, message: 'Internal server error' });
          return;
        }

        res.json({ success: true, message: 'Students added successfully!' });
      });

      // Delete the temporary file after processing
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });
    })
    .on('error', (error) => {
      console.error('Error reading CSV file:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    });
});

// Endpoint to get student counts by department
app.get('/api/students/departments', (req, res) => {
  const query = `
    SELECT department, COUNT(*) as count
    FROM students
    GROUP BY department
  `;
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }
    
    res.json({ success: true, departments: results });
  });
});

// Endpoint to get student counts by year
app.get('/api/students/years', (req, res) => {
  const query = `
    SELECT year, COUNT(*) as count
    FROM students
    GROUP BY year
  `;
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }
    
    res.json({ success: true, years: results });
  });
});

// Endpoint to get total number of students
app.get('/api/students/total', (req, res) => {
  const query = `
    SELECT COUNT(*) as total
    FROM students
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    res.json({ success: true, total: results[0].total });
  });
});


// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});