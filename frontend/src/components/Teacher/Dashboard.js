import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [upcomingPracticals, setUpcomingPracticals] = useState([]);
  const [examSearchTerm, setExamSearchTerm] = useState('');
  const [practicalSearchTerm, setPracticalSearchTerm] = useState('');

  useEffect(() => {
    // Fetch exams from backend
    axios.get('/api/exams')
      .then(response => {
        setUpcomingExams(response.data);
      })
      .catch(error => {
        console.error('Error fetching exams:', error);
      });

    // Fetch practicals from backend
    axios.get('/api/practicals')
      .then(response => {
        setUpcomingPracticals(response.data);
      })
      .catch(error => {
        console.error('Error fetching practicals:', error);
      });
  }, []); // Empty dependency array to run only once on component mount

  // Function to handle exam search
  const handleExamSearch = (e) => {
    setExamSearchTerm(e.target.value);
  };

  // Function to handle practical search
  const handlePracticalSearch = (e) => {
    setPracticalSearchTerm(e.target.value);
  };

  // Filter exams based on search term
  const filteredExams = upcomingExams.filter((exam) =>
    exam.name.toLowerCase().includes(examSearchTerm.toLowerCase())
  );

  // Filter practicals based on search term
  const filteredPracticals = upcomingPracticals.filter((practical) =>
    practical.name.toLowerCase().includes(practicalSearchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '10px', height: '90vh' }}>
      {/* Container for upcoming exams */}
      <div style={{ backgroundColor: '#ececec', padding: '20px', borderRadius: '8px', flex: 1, height: '90%', overflowY: 'auto' }}>
        <h3 style={{ color: 'black', textAlign: 'center', borderBottom: '1px solid black', paddingBottom: '10px' }}>Upcoming Exams</h3>
        <input
          type="text"
          placeholder="Search exams"
          value={examSearchTerm}
          onChange={handleExamSearch}
          style={{
            width: '97%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        />
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {filteredExams.map((exam) => (
            <li
              key={exam._id}
              style={{
                margin: '10px 0',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '10px',
                cursor: 'pointer',
                backgroundColor: '#ffffff',
                color: '#000000'
              }}
            >
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{exam.name}</div>
              <div style={{ fontSize: '14px', color: '#666666' }}>{new Date(exam.dateTime).toLocaleString()}</div>
              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Container for upcoming practicals */}
      <div style={{ backgroundColor: '#ececec', padding: '20px', borderRadius: '8px', flex: 1, height: '90%', overflowY: 'auto' }}>
        <h3 style={{ color: 'black', textAlign: 'center', borderBottom: '1px solid black', paddingBottom: '10px' }}>Upcoming Practicals</h3>
        <input
          type="text"
          placeholder="Search practicals"
          value={practicalSearchTerm}
          onChange={handlePracticalSearch}
          style={{
            width: '97%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        />
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {filteredPracticals.map((practical) => (
            <li
              key={practical._id}
              style={{
                margin: '10px 0',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '10px',
                cursor: 'pointer',
                backgroundColor: '#ffffff',
                color: '#000000'
              }}
            >
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{practical.name}</div>
              <div style={{ fontSize: '14px', color: '#666666' }}>{new Date(practical.dateTime).toLocaleString()}</div>
              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
