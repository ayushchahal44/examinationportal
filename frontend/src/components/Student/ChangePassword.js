import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    email: '', // Add email state if needed
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert('New password and confirm password do not match');
      return;
    }
    try {
      // Your Axios POST request to change the password
      const response = await axios.post('http://localhost:5000/api/change-password', {
        email: formData.email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      console.log('Password changed successfully!', response.data);
      // Optionally handle success feedback or navigation
    } catch (error) {
      console.error('Error changing password:', error);
      // Optionally handle error feedback
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="currentPassword" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Current Password</label>
          <input type="password" id="currentPassword" name="currentPassword" value={formData.currentPassword} onChange={handleChange} style={{ width: 'calc(100% - 10px)', padding: '8px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="newPassword" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>New Password</label>
          <input type="password" id="newPassword" name="newPassword" value={formData.newPassword} onChange={handleChange} style={{ width: 'calc(100% - 10px)', padding: '8px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="confirmNewPassword" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Confirm New Password</label>
          <input type="password" id="confirmNewPassword" name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} style={{ width: 'calc(100% - 10px)', padding: '8px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>Change Password</button>
      </form>
      {/* Optional feedback message */}
      {/* <p style={{ marginTop: '10px', fontSize: '14px', color: '#333', textAlign: 'center' }}>Password changed successfully!</p> */}
    </div>
  );
};

export default ChangePassword;
