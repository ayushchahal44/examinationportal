import React, { useState } from 'react';

const Dashboard = () => {
  // Sample data
  const [upcomingExams, setUpcomingExams] = useState([
    { id: 1, name: 'Math Exam', dateTime: '2024-07-15 10:00 AM' },
    { id: 2, name: 'Science Exam', dateTime: '2024-07-16 11:30 AM' },
    { id: 3, name: 'History Exam', dateTime: '2024-07-17 1:00 PM' },
    { id: 4, name: 'English Exam', dateTime: '2024-07-18 2:30 PM' },
    { id: 5, name: 'Physics Exam', dateTime: '2024-07-19 4:00 PM' },
    { id: 6, name: 'Chemistry Exam', dateTime: '2024-07-20 5:30 PM' },
    { id: 7, name: 'Biology Exam', dateTime: '2024-07-21 7:00 PM' },
    { id: 8, name: 'Geography Exam', dateTime: '2024-07-22 8:30 PM' },
    { id: 9, name: 'Computer Science Exam', dateTime: '2024-07-23 10:00 AM' },
    { id: 10, name: 'Economics Exam', dateTime: '2024-07-24 1:00 PM' },
  ]);

  const [upcomingPracticals, setUpcomingPracticals] = useState([
    { id: 1, name: 'Math Practical', dateTime: '2024-07-15 10:00 AM' },
    { id: 2, name: 'Science Practical', dateTime: '2024-07-16 11:30 AM' },
    { id: 3, name: 'History Practical', dateTime: '2024-07-17 1:00 PM' },
    { id: 4, name: 'English Practical', dateTime: '2024-07-18 2:30 PM' },
    { id: 5, name: 'Physics Practical', dateTime: '2024-07-19 4:00 PM' },
    { id: 6, name: 'Chemistry Practical', dateTime: '2024-07-20 5:30 PM' },
    { id: 7, name: 'Biology Practical', dateTime: '2024-07-21 7:00 PM' },
    { id: 8, name: 'Geography Practical', dateTime: '2024-07-22 8:30 PM' },
    { id: 9, name: 'Computer Science Practical', dateTime: '2024-07-23 10:00 AM' },
    { id: 10, name: 'Economics Practical', dateTime: '2024-07-24 1:00 PM' },
  ]);

  const [examSearchTerm, setExamSearchTerm] = useState('');
  const [practicalSearchTerm, setPracticalSearchTerm] = useState('');

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
              key={exam.id}
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
              <div style={{ fontSize: '14px', color: '#666666' }}>{exam.dateTime}</div>
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
              key={practical.id}
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
              <div style={{ fontSize: '14px', color: '#666666' }}>{practical.dateTime}</div>
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
