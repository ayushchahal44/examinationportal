import React, { useState } from 'react';

const AdminDashboard = () => {
  // Sample data
  const [upcomingExams, setUpcomingExams] = useState([
    { id: 1, name: 'Math Exam', dateTime: '2024-07-15 10:00 AM' },
    { id: 2, name: 'Science Exam', dateTime: '2024-07-16 11:30 AM' },
    // Add more exams as needed
  ]);

  const [upcomingPracticals, setUpcomingPracticals] = useState([
    { id: 1, name: 'Math Practical', dateTime: '2024-07-15 10:00 AM' },
    { id: 2, name: 'Science Practical', dateTime: '2024-07-16 11:30 AM' },
    // Add more practicals as needed
  ]);

  const [examSearchTerm, setExamSearchTerm] = useState('');
  const [practicalSearchTerm, setPracticalSearchTerm] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [currentExam, setCurrentExam] = useState(null);
  const [currentPractical, setCurrentPractical] = useState(null);

  // Functions to handle exam and practical search
  const handleExamSearch = (e) => setExamSearchTerm(e.target.value);
  const handlePracticalSearch = (e) => setPracticalSearchTerm(e.target.value);

  // Filter exams and practicals based on search term
  const filteredExams = upcomingExams.filter((exam) =>
    exam.name.toLowerCase().includes(examSearchTerm.toLowerCase())
  );
  const filteredPracticals = upcomingPracticals.filter((practical) =>
    practical.name.toLowerCase().includes(practicalSearchTerm.toLowerCase())
  );

  // Function to handle editing an exam
  const handleEditExam = (exam) => {
    setCurrentExam(exam);
    setIsEditing(true);
  };

  // Function to handle saving changes to an exam
  const handleSaveExam = () => {
    setUpcomingExams(
      upcomingExams.map((exam) =>
        exam.id === currentExam.id ? currentExam : exam
      )
    );
    setIsEditing(false);
    setCurrentExam(null);
  };

  // Function to handle deleting an exam
  const handleDeleteExam = () => {
    const updatedExams = upcomingExams.filter((exam) => exam.id !== currentExam.id);
    setUpcomingExams(updatedExams);
    setIsEditing(false);
    setCurrentExam(null);
  };

  // Function to handle editing a practical
  const handleEditPractical = (practical) => {
    setCurrentPractical(practical);
    setIsEditing(true);
  };

  // Function to handle saving changes to a practical
  const handleSavePractical = () => {
    setUpcomingPracticals(
      upcomingPracticals.map((practical) =>
        practical.id === currentPractical.id ? currentPractical : practical
      )
    );
    setIsEditing(false);
    setCurrentPractical(null);
  };

  // Function to handle deleting a practical
  const handleDeletePractical = () => {
    const updatedPracticals = upcomingPracticals.filter((practical) => practical.id !== currentPractical.id);
    setUpcomingPracticals(updatedPracticals);
    setIsEditing(false);
    setCurrentPractical(null);
  };

  // Function to close the edit modal
  const handleCloseEdit = () => {
    setIsEditing(false);
    setCurrentExam(null);
    setCurrentPractical(null);
  };

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
                <button onClick={() => handleEditExam(exam)} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
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
                <button onClick={() => handleEditPractical(practical)} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit modal */}
      {isEditing && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '400px' }}>
            <h2>Edit {currentExam ? 'Exam' : 'Practical'}</h2>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
              <input
                type="text"
                value={currentExam ? currentExam.name : currentPractical.name}
                onChange={(e) => {
                  const value = e.target.value;
                  if (currentExam) {
                    setCurrentExam({ ...currentExam, name: value });
                  } else {
                    setCurrentPractical({ ...currentPractical, name: value });
                  }
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  marginBottom: '10px'
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Date & Time</label>
              <input
                type="text"
                value={currentExam ? currentExam.dateTime : currentPractical.dateTime}
                onChange={(e) => {
                  const value = e.target.value;
                  if (currentExam) {
                    setCurrentExam({ ...currentExam, dateTime: value });
                  } else {
                    setCurrentPractical({ ...currentPractical, dateTime: value });
                  }
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  marginBottom: '10px'
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={currentExam ? handleSaveExam : handleSavePractical}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Save
              </button>
              <button
                onClick={currentExam ? handleDeleteExam : handleDeletePractical}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#dc3545',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
              <button
                onClick={handleCloseEdit}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#6c757d',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
