import React, { useState } from 'react';
import axios from 'axios';
import '../../css/Admin/MoreStudents.css';

const MoreStudents = () => {
  const [csvFile, setCsvFile] = useState(null); // State for storing CSV file
  // const [csvData, setCsvData] = useState([]); // Example unused state variables

  // Function to handle file change event
  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]); // Update state with selected file
  };

  // Function to handle file upload
  const handleUpload = async () => {
    if (!csvFile) {
      alert('Please select a CSV file'); // Alert if no file selected
      return;
    }

    const formData = new FormData(); // Create FormData object
    formData.append('csvFile', csvFile); // Append selected file to FormData

    try {
      // Send POST request to server with FormData containing CSV file
      const response = await axios.post('http://localhost:5000/api/students/bulk', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set headers for FormData
        }
      });

      // Handle server response
      if (response.data.success) {
        alert('Students added successfully!'); // Display success message
        // Optionally, clear form data or update UI as needed
      } else {
        alert('Failed to add students'); // Display error message if request fails
      }
    } catch (error) {
      console.error('Error uploading students:', error); // Log and alert on error
      alert('Error uploading students');
    }
  };

  return (
    <div>
      <h2>Upload CSV File</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} /> {/* Input for file selection */}
      <button onClick={handleUpload}>Upload</button> {/* Button to trigger upload */}
    </div>
  );
};

export default MoreStudents;
