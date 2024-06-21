// ManageStudents.js

import React from 'react';
import { Link } from 'react-router-dom';
import './ManageStudents.css';
import AdminDashboard from './AdminDashboard'; // Importing the AdminDashboard sidebar

const ManageStudents = () => {
  return (
    <div className="admin-dashboard">
      <AdminDashboard /> {/* Include the AdminDashboard sidebar here */}
      <div className="content">
        <h1>Manage Students</h1>
        <div className="actions">
          <Link to="/admin/manage-students/add">
            <button>Add Student</button>
          </Link>
          <Link to="/admin/manage-students/remove">
            <button>Remove Student</button>
          </Link>
          <Link to="/admin/manage-students/update">
            <button>Update Student</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageStudents;
