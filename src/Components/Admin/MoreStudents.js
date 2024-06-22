import React, { useState } from 'react';
import axios from 'axios';

const MoreStudents = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('csvFile', csvFile);

    try {
      const response = await axios.post('http://localhost:5000/api/students/bulk', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        setUploadSuccess(true);
      } else {
        alert('Failed to upload students');
      }
    } catch (error) {
      console.error('Error uploading students:', error);
    }
  };

  return (
    <div className="more-students-container">
      <h2>Add More Students</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Upload CSV File:</label>
          <input type="file" name="csvFile" onChange={handleFileChange} accept=".csv" required />
        </div>
        <button type="submit">Upload</button>
      </form>
      {uploadSuccess && <p>Students uploaded successfully!</p>}
    </div>
  );
};

export default MoreStudents;
