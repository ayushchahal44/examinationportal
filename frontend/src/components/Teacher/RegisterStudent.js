import React, { useState } from 'react';
import axios from 'axios';

const RegisterStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    enrollYear: '',
    // Add more fields as needed
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Your Axios POST request to register the student
      const response = await axios.post('http://localhost:5000/api/register/student', formData); // Updated URL
      console.log('Student registered successfully!', response.data);
      // Optionally handle success feedback or navigation
    } catch (error) {
      console.error('Error registering student:', error);
      // Optionally handle error feedback
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Register Student</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} style={{ width: 'calc(100% - 10px)', padding: '8px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} style={{ width: 'calc(100% - 10px)', padding: '8px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="mobileNumber" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Mobile Number</label>
          <input type="text" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} style={{ width: 'calc(100% - 10px)', padding: '8px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="enrollYear" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Enroll Year</label>
          <input type="text" id="enrollYear" name="enrollYear" value={formData.enrollYear} onChange={handleChange} style={{ width: 'calc(100% - 10px)', padding: '8px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
        {/* Add more input fields as needed */}
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>Register</button>
      </form>
      {/* Optional feedback message */}
      {/* <p style={{ marginTop: '10px', fontSize: '14px', color: '#333', textAlign: 'center' }}>Student registered successfully!</p> */}
    </div>
  );
};

export default RegisterStudent;
