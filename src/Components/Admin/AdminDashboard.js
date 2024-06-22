import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUserGraduate, faChalkboardTeacher, faChartBar, faCog } from '@fortawesome/free-solid-svg-icons';
import '../../css/Admin/AdminDashboard.css';

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
            <Link to="/admin/manage-students" className="sidebar-link" onClick={toggleSidebar}>
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
          <FontAwesomeIcon icon={faBars} />
        </div>  
      </div>
    </div>
  );
};

export default AdminDashboard;
