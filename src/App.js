import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import ManageStudents from './components/Admin/ManageStudents';
import AddStudent from './components/Admin/AddStudent';
import MoreStudents from './components/Admin/MoreStudents'; 
import RemoveStudent from './components/Admin/RemoveStudent';
import UpdateStudentProfile from './components/Admin/UpdateStudentProfile';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-students" element={<ManageStudents />} />
        <Route path="/admin/manage-students/add" element={<AddStudent />} />
        <Route path="/admin/manage-students/more-students" element={<MoreStudents />} />
        <Route path="/admin/manage-students/remove" element={<RemoveStudent />} />
        <Route path="/admin/manage-students/update" element={<UpdateStudentProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
