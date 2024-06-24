import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FaArrowLeft } from 'react-icons/fa';
import '../../css/Admin/ManageStudents.css';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const ManageStudents = () => {
  const [departments, setDepartments] = useState([]);
  const [years, setYears] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0); // State to hold total student count
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [departmentResponse, yearResponse, totalResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/students/departments'),
          axios.get('http://localhost:5000/api/students/years'),
          axios.get('http://localhost:5000/api/students/total'), // Fetch total student count
        ]);
        setDepartments(departmentResponse.data.departments);
        setYears(yearResponse.data.years);
        setTotalStudents(totalResponse.data.total); // Update total student count state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const departmentChartData = {
    labels: departments.map(department => department.department),
    datasets: [
      {
        data: departments.map(department => department.count),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const yearChartData = {
    labels: years.map(year => year.year),
    datasets: [
      {
        data: years.map(year => year.count),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}: ${value}`;
        },
        color: '#fff',
        font: {
          weight: 'bold'
        }
      }
    }
  };

  return (
    <div className="manage-students">
      <div className="navbar">
        <div className="navbar-left">
          <button onClick={() => navigate(-1)} className="back-button">
            <FaArrowLeft />
            <span style={{ marginLeft: '10px' }}>Back</span>
          </button>
        </div>
        <div className="navbar-right">
          <Link to="/admin/manage-students/add">Add Students</Link>
          <Link to="/admin/manage-students/remove">Remove Students</Link>
          <Link to="/admin/manage-students/update">Update Students</Link>
          <Link to="/admin/manage-students/search">Search Students</Link>
        </div>
      </div>
      <div className="content">
        <h1>Manage Students</h1>
        <div className="main-content">
          <div className="chart">
            <h2>Students Distribution by Department</h2>
            <Pie data={departmentChartData} options={options} />
          </div>
          <div className="chart">
            <h2>Students Count by Year</h2>
            <Pie data={yearChartData} options={options} />
          </div>
        </div>
        <div className="total-students">
          <h2>Total Students</h2>
          <p>{totalStudents}</p>
        </div>
      </div>
    </div>
  );
};

export default ManageStudents;
