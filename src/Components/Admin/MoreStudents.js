import React, { useState } from 'react';
import axios from 'axios';
import '../../css/Admin/MoreStudents.css';

const MoreStudents = () => {
  const [csvFile, setCsvFile] = useState(null);

  // Function to handle file change event
  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  // Function to handle file upload
  const handleUpload = async () => {
    if (!csvFile) {
      alert('Please select a CSV file');
      return;
    }

    const formData = new FormData();
    formData.append('csvFile', csvFile);

    try {
      const response = await axios.post('http://localhost:5000/api/students/bulk', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('Students added successfully!');
      } else {
        alert('Failed to add students');
      }
    } catch (error) {
      console.error('Error uploading students:', error);
      alert('Error uploading students');
    }
  };

  return (
    <div className="container">
      <h2>Upload CSV File</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default MoreStudents;
