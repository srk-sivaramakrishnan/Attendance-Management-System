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
