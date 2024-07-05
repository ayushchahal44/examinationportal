import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Exams = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Sample data for available exams (with start and end times)
  const [exams, setExams] = useState([
    { id: 1, name: 'Exam 1', selected: false, startTime: '10:00 AM', endTime: '11:00 AM' },
    { id: 2, name: 'Exam 2', selected: false, startTime: '11:30 AM', endTime: '12:30 PM' },
    { id: 3, name: 'Exam 3', selected: false, startTime: '1:00 PM', endTime: '2:00 PM' },
    { id: 4, name: 'Exam 4', selected: false, startTime: '2:30 PM', endTime: '3:30 PM' },
    { id: 5, name: 'Exam 5', selected: false, startTime: '4:00 PM', endTime: '5:00 PM' },
    { id: 6, name: 'Exam 6', selected: false, startTime: '5:30 PM', endTime: '6:30 PM' },
    { id: 7, name: 'Exam 7', selected: false, startTime: '7:00 PM', endTime: '8:00 PM' },
    { id: 8, name: 'Exam 8', selected: false, startTime: '8:30 PM', endTime: '9:30 PM' },
    { id: 9, name: 'Exam 9', selected: false, startTime: '10:00 AM', endTime: '12:00 PM' },
    { id: 10, name: 'Exam 10', selected: false, startTime: '1:00 PM', endTime: '3:00 PM' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle exam selection
  const handleExamSelection = (id) => {
    setExams(prevExams =>
      prevExams.map(exam =>
        exam.id === id ? { ...exam, selected: true } : { ...exam, selected: false }
      )
    );
  };

  // Function to handle start button click
  const handleStart = () => {
    const selectedExam = exams.find(exam => exam.selected);
    if (selectedExam) {
      // Navigate to another page (replace '/exam' with your actual path)
      navigate(`/exam/${selectedExam.id}`);
    } else {
      alert('Please select an exam to start.');
    }
  };

  // Filter exams based on search term
  const filteredExams = exams.filter(exam =>
    exam.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh',marginTop: '5px'}}>
      <div style={{ width: '80%', textAlign: 'center', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)',marginTop: '5px' }}>
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
                key={exam.id}
                style={{
                  margin: '10px 0',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '10px',
                  cursor: 'pointer',
                  backgroundColor: exam.selected ? '#28a745' : 'inherit',
                  color: exam.selected ? 'white' : 'inherit'
                }}
                onClick={() => handleExamSelection(exam.id)}
              >
                <div>{exam.name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {`Start Time: ${exam.startTime} - End Time: ${exam.endTime}`}
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
