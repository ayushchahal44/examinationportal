// StudentDashboard.js
import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import './StudentDashboard.css';

// Import your page components from the Admin folder
import Dashboard from './Student/Dashboard';
import Practical from './Student/Practical';
import Exams from './Student/Exams';
import Results from './Student/Results';
import NotFound from './Student/NotFound';

const StudentDashboard = () => {
  return (
    <div className="student-dashboard-container">
      <div className="left-container">
        <div className='profile-picture-container'>
          <div className='profile-picture'>
            <img src='/favicon.ico' alt='Profile' />
          </div>
          <h1 className='student-dashboard'>Student Dashboard</h1>
        </div>
        <div className='student-dashboard-menu'>
          <Link to="dashboard" className="menu-item">Dashboard</Link>
          <Link to="exams" className="menu-item">Exams</Link>
          <Link to="practical" className="menu-item">Practical</Link>
          <Link to="results" className="menu-item">Results</Link>
        </div>
      </div>
      <div className="right-container">
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} /> {/* Default Route */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="exams" element={<Exams />} />
          <Route path="practical" element={<Practical />} />
          <Route path="results" element={<Results />} />
          <Route path="*" element={<NotFound />} /> {/* Fallback for unmatched routes */}
        </Routes>
      </div>
    </div>
  );
};

export default StudentDashboard;
