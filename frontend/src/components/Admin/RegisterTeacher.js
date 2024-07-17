import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs'; // Import bcryptjs for password hashing

const RegisterTeacher = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    department: '',
    password: '',
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
      // Hash the password before sending it to the server
      const hashedPassword = await bcrypt.hash(formData.password, 10); // Hash with salt rounds

      // Modify the formData to include hashed password
      const updatedFormData = {
        ...formData,
        password: hashedPassword
      };

      const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be logged in to register teacher');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

      // Your Axios POST request to register the teacher
      const response = await axios.post('http://localhost:5000/api/register/teacher', updatedFormData,config);
      console.log('Teacher registered successfully!', response.data);
      alert('Teacher registered successfully!', response.data);

      // Reset the form after successful registration
      setFormData({
        name: '',
        email: '',
        mobileNumber: '',
        department: '',
        password: '',
      });
    } catch (error) {
      console.error('Error registering teacher:', error);
      // Optionally handle error feedback
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Register Teacher</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="mobileNumber" style={styles.label}>Mobile Number</label>
          <input type="text" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="department" style={styles.label}>Department</label>
          <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} style={styles.input} />
        </div>
        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '10px',
    color: '#333',
    fontSize: '24px',
  },
  formGroup: {
    marginBottom: '10px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#333',
  },
  input: {
    width: 'calc(100% - 16px)',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#2980b9',
  },
};

export default RegisterTeacher;
