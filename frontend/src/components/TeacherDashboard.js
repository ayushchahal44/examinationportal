// TeacherDashboard.js
import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import './TeacherDashboard.css';
import { useNavigate } from 'react-router-dom';


// Import your page components from the Admin folder
import Dashboard from './Teacher/Dashboard';
import RegisterStudent from './Teacher/RegisterStudent';
import CreateExam from './Teacher/CreateExam';
import CreatePractical from './Teacher/CreatePractical';
import Results from './Teacher/Results';
import NotFound from './Teacher/NotFound';
import ChangePassword from './Student/ChangePassword';

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
          <Link to="home" className="menu-item">Dashboard</Link>
          <Link to="registerstudent" className="menu-item">Register Student</Link>
          <Link to="createexam" className="menu-item">Create Exam</Link>
          <Link to="createpractical" className="menu-item">Create Practical</Link>
          <Link to="results" className="menu-item">Results</Link>
          <Link to="change-password" className="menu-item">Change Password</Link>
        </div>
        <div className="button-container">
            <a href="/" onClick={handleLogout} className="logout-button">Logout</a>
          </div>
      </div>
      <div className="right-container">
        <Routes>
          <Route path="/" element={<Navigate to="home" />} /> {/* Default Route */}
          <Route path="home" element={<Dashboard />} />
          <Route path="registerstudent" element={<RegisterStudent />} />
          <Route path="createexam" element={<CreateExam />} />
          <Route path="createpractical" element={<CreatePractical />} />
          <Route path="results" element={<Results />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="*" element={<NotFound />} /> {/* Fallback for unmatched routes */}
        </Routes>
      </div>
    </div>
  );
};

export default TeacherDashboard;
