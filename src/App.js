// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminDashboard from './Components/Admin/AdminDashboard';
import ManageStudents from './Components/Admin/ManageStudents';
import AddStudent from './Components/Admin/AddStudent';
import RemoveStudent from './Components/Admin/RemoveStudent';
import UpdateStudentProfile from './Components/Admin/UpdateStudentProfile';
import Home from './Components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-students" element={<ManageStudents />} />
        <Route path="/admin/manage-students/add" element={<AddStudent />} />
        <Route path="/admin/manage-students/remove" element={<RemoveStudent />} />
        <Route path="/admin/manage-students/update" element={<UpdateStudentProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
