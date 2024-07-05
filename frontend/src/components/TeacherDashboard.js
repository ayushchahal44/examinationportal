// TeacherDashboard.js
import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import './TeacherDashboard.css';
import { useNavigate } from 'react-router-dom';


// Import your page components from the Admin folder
import Dashboard from './Teacher/Dashboard';
import Register from './Teacher/Register';
import Exams from './Teacher/Exams';
import Results from './Teacher/Results';
import NotFound from './Teacher/NotFound';

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    // Add your logout logic here (e.g., clearing authentication tokens)
    console.log("Logout clicked");
    navigate("/"); // Redirect to login page
  };
  return (
    <div className="teacher-dashboard-container">
      <div className="left-container">
        <div className='profile-picture-container'>
          <div className='profile-picture'>
            <img src='/favicon.ico' alt='Profile' />
          </div>
          <h1 className='teacher-dashboard'>Teacher Dashboard</h1>
        </div>
        <div className='teacher-dashboard-menu'>
          <Link to="dashboard" className="menu-item">Dashboard</Link>
          <Link to="register" className="menu-item">Register</Link>
          <Link to="exams" className="menu-item">Exams</Link>
          <Link to="results" className="menu-item">Results</Link>
        </div>
        <div className="button-container">
            <a href="/" onClick={handleLogout} className="logout-button">Logout</a>
          </div>
      </div>
      <div className="right-container">
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} /> {/* Default Route */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="register" element={<Register />} />
          <Route path="exams" element={<Exams />} />
          <Route path="results" element={<Results />} />
          <Route path="*" element={<NotFound />} /> {/* Fallback for unmatched routes */}
        </Routes>
      </div>
    </div>
  );
};

export default TeacherDashboard;
