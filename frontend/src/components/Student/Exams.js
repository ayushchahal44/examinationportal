import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const Exams = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/exams/');
        const formattedExams = response.data.map(exam => ({
          ...exam,
          formattedStartTime: moment(exam.startTime).format('MMMM D, YYYY h:mm A'),
          formattedEndTime: moment(exam.endTime).format('h:mm A')
        }));
        setExams(formattedExams);
      } catch (error) {
        console.error('Error fetching exams:', error);
        setError('Failed to fetch exams. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const handleExamSelection = (id) => {
    setExams(prevExams =>
      prevExams.map(exam =>
        exam._id === id ? { ...exam, selected: true } : { ...exam, selected: false }
      )
    );
  };

  const handleStart = () => {
    const selectedExam = exams.find(exam => exam.selected);
    if (selectedExam) {
      navigate(`/student/exams/take-exam/${selectedExam._id}`); // Navigate to TakeExam page with exam ID
    } else {
      alert('Please select an exam to start.');
    }
  };

  const filteredExams = exams.filter(exam =>
    exam.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>; // Add a loading indicator
  }

  if (error) {
    return <div>{error}</div>; // Display error message if fetching fails
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ width: '80%', textAlign: 'center', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2>Available Exams</h2>
        <input
          type="text"
          placeholder="Search exams"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '97%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <div style={{ maxHeight: '250px', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {filteredExams.map(exam => (
              <li
                key={exam._id}
                style={{
                  margin: '10px 0',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: exam.selected ? '#28a745' : 'inherit',
                  color: exam.selected ? 'white' : 'inherit'
                }}
                onClick={() => handleExamSelection(exam._id)}
              >
                <div style={{ flexGrow: 1 }}>
                  <div>{exam.subjectName} ({exam.examType})</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {exam.formattedStartTime} - {exam.formattedEndTime}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleStart}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Exams;
