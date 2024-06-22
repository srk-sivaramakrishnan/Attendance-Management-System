import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../css/Admin/AddStudent.css';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    rollNo: '',
    registerNo: '',
    phoneNumber: '',
    address: '',
    bloodGroup: '',
    department: '',
    year: '',
    dayScholar: '',
    classAdvisor: '',
    email: '',
    password: '',
    profilePhoto: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePhoto: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/students', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        alert('Student added successfully');
      } else {
        alert('Failed to add student');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="add-student-container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>DOB:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Roll No:</label>
          <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Register No:</label>
          <input type="text" name="registerNo" value={formData.registerNo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone No:</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea name="address" value={formData.address} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label>Blood Group:</label>
          <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
        <div className="form-group">
          <label>Department:</label>
          <select name="department" value={formData.department} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="MECH">MECH</option>
            <option value="AIDS">AIDS</option>
            <option value="ECE">ECE</option>
            <option value="CSBS">CSBS</option>
          </select>
        </div>
        <div className="form-group">
          <label>Year:</label>
          <select name="year" value={formData.year} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="Final Year">Final Year</option>
          </select>
        </div>
        <div className="form-group">
          <label>Accommodation:</label>
          <select name="dayScholar" value={formData.dayScholar} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Day Scholar">Day Scholar</option>
            <option value="Hosteller">Hosteller</option>
          </select>
        </div>
        <div className="form-group">
          <label>Class Advisor:</label>
          <input type="text" name="classAdvisor" value={formData.classAdvisor} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Profile Photo:</label>
          <input type="file" name="profilePhoto" onChange={handleFileChange} required />
        </div>
        <button type="submit">Add Student</button>
      </form>

      <div style={{ marginTop: '10px' }}>
        <Link to="/admin/manage-students/more-students" style={{ textDecoration: 'underline' }}>Add more number of students</Link>
      </div>
    </div>
  );
};

export default AddStudent;
