/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('Admin'); // Default role
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post('http://localhost:5000/login', { username, password });
      setMessage('Login successful');
      // Navigate based on selectedRole
      switch (selectedRole) {
        case 'Admin':
          navigate('/admin-dashboard');
          break;
        case 'Teacher':
          navigate('/teacher-dashboard');
          break;
        case 'Student':
          navigate('/student-dashboard');
          break;
        default:
          navigate('/'); // Default fallback
          break;
      }
    } catch (error) {
      setMessage('Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src="/favicon.ico" alt="Logo" />
          <h1>Examination Portal</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <select
              className="input-select"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
            </select>
          </div>
          <div className="input-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button type="submit">Login</button>
         <p><a href='#'>Forgot your password?</a></p>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
