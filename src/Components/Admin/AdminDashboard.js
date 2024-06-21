import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserGraduate, faChalkboardTeacher, faChartBar, faCog, faTimes } from '@fortawesome/free-solid-svg-icons';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-dashboard">
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          Admin Dashboard
          <div className="close-icon" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/admin/dashboard" className="sidebar-link" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faUserGraduate} />
              <span>Manage Students</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/manage-faculty" className="sidebar-link" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faChalkboardTeacher} />
              <span>Manage Faculty</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/reports" className="sidebar-link" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faChartBar} />
              <span>Reports</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/settings" className="sidebar-link" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faCog} />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="content">
        <div className="hamburger-menu" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
        </div>
        <h1>Welcome to the Admin Dashboard</h1>
        <p>Select an option from the sidebar to manage the application.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
