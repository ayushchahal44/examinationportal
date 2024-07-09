// App.js (or index.js)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/teacher/*" element={<TeacherDashboard />} />
        <Route path="/student/*" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
