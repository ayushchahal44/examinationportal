// AdminDashboard.js
import React from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

// Import your page components from the Admin folder
import Dashboard from "./Admin/Dashboard";
import CreateExam from "./Admin/CreateExam";
import CreatePractical from "./Admin/CreatePractical";
import Results from "./Admin/Results";
import NotFound from "./Admin/NotFound";
import ChangePassword from "./Admin/ChangePassword";
import RegisterStudent from "./Admin/RegisterStudent";
import RegisterTeacher from "./Admin/RegisterTeacher"

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    // Add your logout logic here (e.g., clearing authentication tokens)
    console.log("Logout clicked");
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="admin-dashboard-container">
      <div className="left-container">
        <div className="profile-picture-container">
          <div className="profile-picture">
            <img src="/favicon.ico" alt="Profile" />
          </div>
          <h1 className="admin-dashboard">Admin Dashboard</h1>
        </div>
        <div className="admin-dashboard-menu">
          <Link to="home" className="menu-item">
            Dashboard
          </Link>
          <Link to="create-exam" className="menu-item">
            Create Exam
          </Link>
          <Link to="create-practical" className="menu-item">
            Create Practical
          </Link>
          <Link to="results" className="menu-item">
            Results
          </Link>
          <Link to="register-student" className="menu-item">
            Register Student
          </Link>
          <Link to="register-teacher" className="menu-item">
            Register Teacher
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
          <Route path="/" element={<Navigate to="home" />} />{" "}
          {/* Default Route */}
          <Route path="home" element={<Dashboard />} />
          <Route path="create-exam" element={<CreateExam />} />
          <Route path="create-practical" element={<CreatePractical />} />
          <Route path="results" element={<Results />} />
          <Route path="register-student" element={<RegisterStudent />} />
          <Route path="register-teacher" element={<RegisterTeacher />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="*" element={<NotFound />} />{" "}
          {/* Fallback for unmatched routes */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
