import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/Admin/ManageStudents.css';
import axios from 'axios';

const ManageStudents = () => {
  const [counts, setCounts] = useState({ departments: [], total: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students/counts');
        setCounts(response.data);
      } catch (error) {
        console.error('Error fetching student counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="manage-students">
      <div className="navbar">
        <div className="navbar-links">
          <Link to="/admin/manage-students/add">Add Students</Link>
          <Link to="/admin/manage-students/remove">Remove Students</Link>
          <Link to="/admin/manage-students/update">Update Students</Link>
          <Link to="/admin/manage-students/search">Search Students</Link>
        </div>
      </div>
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
        <div className="counts">
          <h2>Student Counts</h2>
          <ul>
            {counts.departments.map(department => (
              <li key={department.department}>
                {department.department}: {department.count}
              </li>
            ))}
          </ul>
          <p>Total Students: {counts.total}</p>
        </div>
      </div>
    </div>
  );
};

export default ManageStudents;
