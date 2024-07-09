import React, { useState } from 'react';
import axios from 'axios';

const CreatePractical = () => {
  const [subjectName, setSubjectName] = useState('');
  const [numTasks, setNumTasks] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      subjectName,
      numTasks: parseInt(numTasks, 10),
    };

    try {
      const response = await axios.post(`${apiUrl}/api/createPractical`, payload);
      console.log('Practical created successfully:', response.data);
      alert('Practical created successfully');
      // Reset form fields after successful submission
      setSubjectName('');
      setNumTasks('');
    } catch (error) {
      console.error('Error creating practical:', error);
      alert('Error creating practical');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ width: '50%', textAlign: 'center', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2>Create Practical</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginTop: '10px' }}>
            <label>
              Subject Name:
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                required
                style={{ marginLeft: '10px', padding: '5px' }}
              />
            </label>
          </div>
          <div style={{ marginTop: '10px' }}>
            <label>
              Number of Tasks:
              <input
                type="number"
                value={numTasks}
                onChange={(e) => setNumTasks(e.target.value)}
                required
                style={{ marginLeft: '10px', padding: '5px' }}
              />
            </label>
          </div>
          <button type="submit" disabled={isLoading} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {isLoading ? 'Creating...' : 'Create Practical'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePractical;
