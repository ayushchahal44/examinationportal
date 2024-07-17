// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import TakeExam from './components/Student/TakeExam';
import TakePractical from './components/Student/TakePractical'; // Import TakePractical component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Check for token in localStorage

    // Validate the token with your authentication mechanism
    // For simplicity, assume checking the presence of token is sufficient
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount
  
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/admin/*" element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="/teacher/*" element={isLoggedIn ? <TeacherDashboard /> : <Navigate to="/" />} />
        <Route path="/student/*" element={isLoggedIn ? <StudentDashboard /> : <Navigate to="/" />} />
        <Route path="/student/exams/take-exam/:examId" element={<TakeExam />} />
        <Route path="/student/practical/take-practical/:practicalId" element={<TakePractical />} /> {/* Ensure this matches the path used in navigate() */}
      </Routes>
    </Router>
  );
};

export default App;
