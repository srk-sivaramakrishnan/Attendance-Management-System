-- Create the attendance_system database if it doesn't exist
CREATE DATABASE IF NOT EXISTS attendance_system;

-- Use the attendance_system database
USE attendance_system;

-- Table for users (admins, faculty, students)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'faculty', 'student') NOT NULL
);

-- Sample data for users
INSERT INTO users (username, password, role) VALUES
('admin', 'password', 'admin'),
('faculty1', 'password', 'faculty'),
('student1', 'password', 'student');

-- Table for students
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  dob DATE NOT NULL,
  roll_no VARCHAR(50) UNIQUE NOT NULL,
  register_no VARCHAR(50) UNIQUE NOT NULL,
  phone_no VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  address TEXT NOT NULL,
  blood_group VARCHAR(10) NOT NULL,
  department VARCHAR(50) NOT NULL,
  year VARCHAR(50) NOT NULL,
  accommodation VARCHAR(50) NOT NULL,
  class_advisor VARCHAR(255) NOT NULL,
  profile_photo VARCHAR(255),
  password VARCHAR(255) NOT NULL
);

-- Sample query to fetch all students
SELECT * FROM students;
