import React, { useState, useEffect } from 'react';

const ResultPage = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [subjects] = useState([
    'Mathematics', 'Science', 'English', 'History', 'Physics',
    'Chemistry', 'Biology', 'Geography', 'Computer Science', 'Economics'
  ]);
  
  const [examsBySubject, setExamsBySubject] = useState({
    'Mathematics': [
      { id: 1, name: 'Maths Quiz', type: 'MCQ', dateTime: '2024-07-06T10:00:00' },
      { id: 2, name: 'Algebra Test', type: 'Theory', dateTime: '2024-07-05T14:00:00' },
      { id: 3, name: 'Geometry Exam', type: 'Mix', dateTime: '2024-07-04T09:00:00' },
      { id: 4, name: 'Trigonometry Test', type: 'MCQ', dateTime: '2024-07-03T15:00:00' },
      { id: 5, name: 'Calculus Exam', type: 'Theory', dateTime: '2024-07-02T11:00:00' },
      { id: 6, name: 'Statistics Practical', type: 'Practical', dateTime: '2024-07-01T10:00:00' },
      { id: 7, name: 'Mathematical Modeling', type: 'Mix', dateTime: '2024-06-30T14:00:00' },
      { id: 8, name: 'Discrete Mathematics Quiz', type: 'MCQ', dateTime: '2024-06-29T09:00:00' },
      { id: 9, name: 'Numerical Methods Exam', type: 'Theory', dateTime: '2024-06-28T13:00:00' },
      { id: 10, name: 'Linear Algebra Exam', type: 'Mix', dateTime: '2024-06-27T11:00:00' }
    ],
    'Science': [],
    'English': [],
    'History': [],
    'Physics': [],
    'Chemistry': [],
    'Biology': [],
    'Geography': [],
    'Computer Science': [],
    'Economics': []
  });

  useEffect(() => {
    // Simulate fetching exam data from an API
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Update state with fetched data
        setExamsBySubject({
          ...examsBySubject,
          'Science': [
            { id: 11, name: 'Physics Practical', type: 'Practical', dateTime: '2024-06-26T12:00:00' },
            { id: 12, name: 'Chemical Reactions Test', type: 'MCQ', dateTime: '2024-06-25T14:00:00' }
          ],
          'English': [
            { id: 13, name: 'Literature Exam', type: 'Theory', dateTime: '2024-06-24T16:00:00' }
          ],
          'History': [
            { id: 14, name: 'World War II Quiz', type: 'MCQ', dateTime: '2024-06-23T10:00:00' }
          ],
          'Physics': [
            { id: 15, name: 'Electromagnetism Exam', type: 'Theory', dateTime: '2024-06-22T11:00:00' }
          ],
          'Chemistry': [
            { id: 16, name: 'Organic Chemistry Practical', type: 'Practical', dateTime: '2024-06-21T13:00:00' }
          ],
          'Biology': [
            { id: 17, name: 'Cell Biology Exam', type: 'Theory', dateTime: '2024-06-20T15:00:00' }
          ],
          'Geography': [
            { id: 18, name: 'World Geography Quiz', type: 'MCQ', dateTime: '2024-06-19T09:00:00' }
          ],
          'Computer Science': [
            { id: 19, name: 'Data Structures Exam', type: 'Theory', dateTime: '2024-06-18T14:00:00' }
          ],
          'Economics': [
            { id: 20, name: 'Macroeconomics Exam', type: 'Theory', dateTime: '2024-06-17T12:00:00' }
          ]
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error (e.g., show error message)
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedExam('');
  };

  const handleExamSelect = (exam) => {
    setSelectedExam(exam);
  };

  const renderExamList = () => {
    if (!selectedSubject) {
      return <h4 style={{ color: 'black', textAlign: 'center', marginTop: '25vh' }}>Select a subject</h4>;
    } else if (examsBySubject[selectedSubject]) {
      if (examsBySubject[selectedSubject].length === 0) {
        return <p>No exams found for {selectedSubject}</p>;
      } else {
        return (
          <ul style={{ listStyleType: 'none', padding: 0, maxHeight: '280px', overflowY: 'auto', textAlign: 'left' }}>
            {examsBySubject[selectedSubject].map(exam => (
              <li key={exam.id} style={{ marginBottom: '10px' }}>
                <button
                  style={{
                    backgroundColor: selectedExam && selectedExam.id === exam.id ? '#2b824c' : '#4aee88',
                    color: '#ffffff',
                    padding: '5px', // Adjusted padding for equal size
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    width: '100%',
                    boxSizing: 'border-box', // Ensures padding does not affect width
                  }}
                  onClick={() => handleExamSelect(exam)}
                >
                  {exam.name} - {exam.type} {exam.type === 'Practical' && '(Practical Written)'}<br />
                  Attempted: {new Date(exam.dateTime).toLocaleString()}
                </button>
              </li>
            ))}
          </ul>
        );
      }
    } else {
      return <h4 style={{ color: 'black', textAlign: 'center', marginTop: '25vh' }}>No exams found for selected subject</h4>;
    }
  };

  const renderResultButton = () => {
    if (selectedExam) {
      return (
        <button
          style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          onClick={() => handleShowResult(selectedExam)}
        >
          Show Result
        </button>
      );
    } else {
      return null;
    }
  };

  const handleShowResult = (exam) => {
    // Placeholder function to show the result for the selected exam/practical
    alert(`Showing results for ${exam.name}`);
    // You can implement logic here to fetch and display detailed results
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', flexDirection: 'row' }}>
      {/* Container for selecting subject */}
      <div style={{ width: '50%', height: '400px', marginRight: '20px', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', overflowY: 'auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Select Subject</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {subjects.map((subject, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <button
                style={{
                  backgroundColor: selectedSubject === subject ? '#2b824c' : '#4aee88',
                  color: '#ffffff',
                  padding: '10px', // Adjusted padding for equal size
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  width: '100%',
                  boxSizing: 'border-box', // Ensures padding does not affect width
                }}
                onClick={() => handleSubjectSelect(subject)}
              >
                {subject}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Container for displaying exams and practicals */}
      <div style={{ width: '50%', height: '400px', textAlign: 'center', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', overflowY: 'auto' }}>
        <h2>Exams & Practicals</h2>
        {renderExamList()}
        {renderResultButton()}
      </div>
    </div>
  );
};

export default ResultPage;
