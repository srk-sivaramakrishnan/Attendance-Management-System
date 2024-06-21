import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Attendance Management System</h1>
      <div className="login-links">
        <Link to="/faculty-login" className="login-link">Faculty Login</Link>
        <Link to="/admin/login" className="login-link">Admin Login</Link>
        <Link to="/student-login" className="login-link">Student Login</Link>
      </div>
    </div>
  );
};

export default Home;
