import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faChalkboardTeacher, faChartBar, faCog } from '@fortawesome/free-solid-svg-icons';
import '../../css/Admin/AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="navbar">
        <div className="navbar-links">
          <Link to="/admin/manage-students">
            <FontAwesomeIcon icon={faUserGraduate} />
            <span>Manage Students</span>
          </Link>
          <Link to="/admin/manage-faculty">
            <FontAwesomeIcon icon={faChalkboardTeacher} />
            <span>Manage Faculty</span>
          </Link>
          <Link to="/admin/reports">
            <FontAwesomeIcon icon={faChartBar} />
            <span>Reports</span>
          </Link>
          <Link to="/admin/settings">
            <FontAwesomeIcon icon={faCog} />
            <span>Settings</span>
          </Link>
        </div>
      </div>
      <div className="content">
        <h1>Welcome to the Admin Dashboard</h1>
      </div>
    </div>
  );
};

export default AdminDashboard;
