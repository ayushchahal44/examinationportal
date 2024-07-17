import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [upcomingPracticals, setUpcomingPracticals] = useState([]);
  const [examSearchTerm, setExamSearchTerm] = useState('');
  const [practicalSearchTerm, setPracticalSearchTerm] = useState('');

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/exams');
        setUpcomingExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    const fetchPracticals = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/practicals');
        setUpcomingPracticals(response.data);
      } catch (error) {
        console.error('Error fetching practicals:', error);
      }
    };

    fetchExams();
    fetchPracticals();
  }, []);

  const handleExamSearch = (e) => setExamSearchTerm(e.target.value);
  const handlePracticalSearch = (e) => setPracticalSearchTerm(e.target.value);

  const formatDateTime = (dateTime) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTime).toLocaleDateString(undefined, options);
  };

  const filteredExams = upcomingExams.filter((exam) =>
    exam.subjectName.toLowerCase().includes(examSearchTerm.toLowerCase())
  );

  const filteredPracticals = upcomingPracticals.filter((practical) =>
    practical.subjectName.toLowerCase().includes(practicalSearchTerm.toLowerCase())
  );

  const panelStyle = {
    backgroundColor: '#ececec',
    padding: '20px',
    borderRadius: '8px',
    flex: 1,
    height: 'calc(90vh - 40px)', // Adjusted to use viewport height minus padding
    overflowY: 'auto',  // Enable vertical scrolling if content overflows
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '10px', minHeight: '90vh' }}>
      <div style={panelStyle}>
        <h3 style={{ color: 'black', textAlign: 'center', borderBottom: '1px solid black', paddingBottom: '10px' }}>
          Upcoming Exams
        </h3>
        <input
          type="text"
          placeholder="Search exams"
          value={examSearchTerm}
          onChange={handleExamSearch}
          style={{
            ...inputStyle,
            width: '97%',
            marginBottom: '10px',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
        <ul style={{ listStyleType: 'none', padding: 0, maxHeight: 'calc(100% - 50px)', overflowY: 'auto' }}>
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
                color: '#000000',
              }}
            >
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{exam.subjectName}</div>
              <div style={{ fontSize: '14px', color: '#666666' }}>
                {formatDateTime(exam.startTime)} - {formatDateTime(exam.endTime)}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ ...panelStyle, height: 'calc(90vh - 40px)' }}>
        <h3 style={{ color: 'black', textAlign: 'center', borderBottom: '1px solid black', paddingBottom: '10px' }}>
          Upcoming Practicals
        </h3>
        <input
          type="text"
          placeholder="Search practicals"
          value={practicalSearchTerm}
          onChange={handlePracticalSearch}
          style={{
            ...inputStyle,
            width: '97%',
            marginBottom: '10px',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
        <ul style={{ listStyleType: 'none', padding: 0, maxHeight: 'calc(100% - 50px)', overflowY: 'auto' }}>
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
                color: '#000000',
              }}
            >
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{practical.subjectName}</div>
              <div style={{ fontSize: '14px', color: '#666666' }}>
                {formatDateTime(practical.startTime)} - {formatDateTime(practical.endTime)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;