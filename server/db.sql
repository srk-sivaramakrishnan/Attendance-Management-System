CREATE DATABASE attendance_system;

USE attendance_system;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('faculty', 'admin', 'student') NOT NULL
);

INSERT INTO users (username, password, role) VALUES ('faculty1', 'password', 'faculty');
INSERT INTO users (username, password, role) VALUES ('admin', 'password', 'admin');
INSERT INTO users (username, password, role) VALUES ('student1', 'password', 'student');

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  dob DATE NOT NULL,
  roll_no VARCHAR(50) NOT NULL,
  register_no VARCHAR(50) NOT NULL,
  phone_no VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  blood_group VARCHAR(10) NOT NULL,
  department VARCHAR(50) NOT NULL,
  year VARCHAR(50) NOT NULL,
  accommodation VARCHAR(50) NOT NULL,
  class_advisor VARCHAR(255) NOT NULL,
  profile_photo VARCHAR(255),
  password VARCHAR(255) NOT NULL
);
