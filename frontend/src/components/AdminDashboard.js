// AdminDashboard.js
import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import './AdminDashboard.css';

// Import your page components from the Admin folder
import Dashboard from './Admin/Dashboard';
import Register from './Admin/Register';
import Exams from './Admin/Exams';
import Results from './Admin/Results';
import NotFound from './Admin/NotFound';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <div className="left-container">
        <div className='profile-picture-container'>
          <div className='profile-picture'>
            <img src='/favicon.ico' alt='Profile' />
          </div>
          <h1 className='admin-dashboard'>Admin Dashboard</h1>
        </div>
        <div className='admin-dashboard-menu'>
          <Link to="dashboard" className="menu-item">Dashboard</Link>
          <Link to="register" className="menu-item">Register</Link>
          <Link to="exams" className="menu-item">Exams</Link>
          <Link to="results" className="menu-item">Results</Link>
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

export default AdminDashboard;
