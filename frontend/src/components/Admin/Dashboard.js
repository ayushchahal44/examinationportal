import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [upcomingPracticals, setUpcomingPracticals] = useState([]);
  const [examSearchTerm, setExamSearchTerm] = useState('');
  const [practicalSearchTerm, setPracticalSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentExam, setCurrentExam] = useState(null);
  const [currentPractical, setCurrentPractical] = useState(null);

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

  const filteredExams = upcomingExams.filter((exam) =>
    exam.subjectName.toLowerCase().includes(examSearchTerm.toLowerCase())
  );

  const filteredPracticals = upcomingPracticals.filter((practical) =>
    practical.subjectName.toLowerCase().includes(practicalSearchTerm.toLowerCase())
  );

  const handleEditExam = (exam) => {
    setCurrentExam(exam);
    setIsEditing(true);
  };

  const handleSaveExam = async () => {
    try {
      await axios.put(`http://localhost:5000/api/exams/${currentExam._id}`, currentExam);
      setUpcomingExams(upcomingExams.map((exam) => (exam._id === currentExam._id ? currentExam : exam)));
      setIsEditing(false);
      setCurrentExam(null);
    } catch (error) {
      console.error('Error saving exam:', error);
    }
  };

  const handleDeleteExam = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/exams/${currentExam._id}`);
      setUpcomingExams(upcomingExams.filter((exam) => exam._id !== currentExam._id));
      setIsEditing(false);
      setCurrentExam(null);
    } catch (error) {
      console.error('Error deleting exam:', error);
    }
  };

  const handleEditPractical = (practical) => {
    setCurrentPractical(practical);
    setIsEditing(true);
  };

  const handleSavePractical = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/practicals/${currentPractical._id}`, currentPractical);
      const updatedPractical = response.data;
      setUpcomingPracticals(
        upcomingPracticals.map((practical) => (practical._id === updatedPractical._id ? updatedPractical : practical))
      );
      setIsEditing(false);
      setCurrentPractical(null);
    } catch (error) {
      console.error('Error saving practical:', error);
    }
  };

  const handleDeletePractical = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/practicals/${currentPractical._id}`);
      setUpcomingPracticals(upcomingPracticals.filter((practical) => practical._id !== currentPractical._id));
      setIsEditing(false);
      setCurrentPractical(null);
    } catch (error) {
      console.error('Error deleting practical:', error);
    }
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setCurrentExam(null);
    setCurrentPractical(null);
  };

  const panelStyle = {
    backgroundColor: '#ececec',
    padding: '20px',
    borderRadius: '8px',
    flex: 1,
    height: 'calc(90vh - 40px)', // Adjusted to use viewport height minus padding
    overflowY: 'auto',  // Enable vertical scrolling if content overflows
  };

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const formGroupStyle = {
    marginBottom: '10px',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  };

  const deleteButtonStyle = {
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const formatDateTime = (dateTime) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric'
    };
    return new Date(dateTime).toLocaleTimeString('en-US', options);
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
              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button onClick={() => handleEditExam(exam)} style={buttonStyle}>
                  Edit
                </button>
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
              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button onClick={() => handleEditPractical(practical)} style={buttonStyle}>
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isEditing && (
        <div style={modalStyle}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '400px' }}>
            <h2>Edit {currentExam ? 'Exam' : 'Practical'}</h2>
            <div style={formGroupStyle}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Subject Name</label>
              <input
                type="text"
                value={currentExam ? currentExam.subjectName : currentPractical.subjectName}
                onChange={(e) => {
                  const value = e.target.value;
                  if (currentExam) {
                    setCurrentExam({ ...currentExam, subjectName: value });
                  } else {
                    setCurrentPractical({ ...currentPractical, subjectName: value });
                  }
                }}
                style={inputStyle}
              />
            </div>
            <div style={formGroupStyle}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Start Time</label>
              <input
                type="datetime-local"
                value={currentExam ? currentExam.startTime : currentPractical.startTime}
                onChange={(e) => {
                  const value = e.target.value;
                  if (currentExam) {
                    setCurrentExam({ ...currentExam, startTime: value });
                  } else {
                    setCurrentPractical({ ...currentPractical, startTime: value });
                  }
                }}
                style={inputStyle}
              />
            </div>
            <div style={formGroupStyle}>
              <label style={{ display: 'block', marginBottom: '5px' }}>End Time</label>
              <input
                type="datetime-local"
                value={currentExam ? currentExam.endTime : currentPractical.endTime}
                onChange={(e) => {
                  const value = e.target.value;
                  if (currentExam) {
                    setCurrentExam({ ...currentExam, endTime: value });
                  } else {
                    setCurrentPractical({ ...currentPractical, endTime: value });
                  }
                }}
                style={inputStyle}
              />
            </div>
            <div style={{ textAlign: 'right' }}>
              <button onClick={currentExam ? handleSaveExam : handleSavePractical} style={buttonStyle}>
                Save
              </button>
              <button onClick={currentExam ? handleDeleteExam : handleDeletePractical} style={deleteButtonStyle}>
                Delete
              </button>
              <button onClick={handleCloseEdit} style={{ ...buttonStyle, backgroundColor: '#6c757d' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;