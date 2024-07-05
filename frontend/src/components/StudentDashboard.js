// StudentDashboard.js
import React from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

// Import your page components from the Admin folder
import Dashboard from "./Student/Dashboard";
import Practical from "./Student/Practical";
import Exams from "./Student/Exams";
import Results from "./Student/Results";
import NotFound from "./Student/NotFound";
import ChangePassword from "./Student/ChangePassword";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    // Add your logout logic here (e.g., clearing authentication tokens)
    console.log("Logout clicked");
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="student-dashboard-container">
      <div className="left-container">
        <div className="profile-picture-container">
          <div className="profile-picture">
            <img src="/favicon.ico" alt="Profile" />
          </div>
          <h1 className="student-dashboard">Student Dashboard</h1>
        </div>
        <div className="student-dashboard-menu">
          <Link to="dashboard" className="menu-item">
            Dashboard
          </Link>
          <Link to="exams" className="menu-item">
            Exams
          </Link>
          <Link to="practical" className="menu-item">
            Practical
          </Link>
          <Link to="results" className="menu-item">
            Results
          </Link>
          <Link to="change-password" className="menu-item">
            Change Password
          </Link>
        </div>
        <div className="button-container">
            <a href="/" onClick={handleLogout} className="logout-button">Logout</a>
          </div>
      </div>
      <div className="right-container">
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} />{" "}
          {/* Default Route */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="exams" element={<Exams />} />
          <Route path="practical" element={<Practical />} />
          <Route path="results" element={<Results />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="*" element={<NotFound />} />{" "}
          {/* Fallback for unmatched routes */}
        </Routes>
      </div>
    </div>
  );
};

export default StudentDashboard;
