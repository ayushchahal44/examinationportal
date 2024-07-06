import React, { useState, useEffect } from 'react';

const Results = () => {
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [grades] = useState([
    'Grade 10', 'Grade 11', 'Grade 12', 'Grade 13', 'Grade 14',
    'Grade 15', 'Grade 16', 'Grade 17', 'Grade 18', 'Grade 19'
  ]);

  const [studentsByGrade, setStudentsByGrade] = useState({
    'Grade 10': [
      { id: 1, name: 'John Doe', registrationId: '202345' },
      { id: 2, name: 'Jane Smith', registrationId: '202346' },
      { id: 3, name: 'Adam Johnson', registrationId: '202347' },
      { id: 4, name: 'Emily Brown', registrationId: '202348' },
      { id: 5, name: 'Michael Davis', registrationId: '202349' },
      { id: 6, name: 'Sarah Wilson', registrationId: '202350' },
      { id: 7, name: 'David Lee', registrationId: '202351' },
      { id: 8, name: 'Emma White', registrationId: '202352' },
      { id: 9, name: 'Liam Harris', registrationId: '202353' },
      { id: 10, name: 'Olivia Taylor', registrationId: '202354' },
    ],
    'Grade 11': [],
    'Grade 12': [],
    'Grade 13': [],
    'Grade 14': [],
    'Grade 15': [],
    'Grade 16': [],
    'Grade 17': [],
    'Grade 18': [],
    'Grade 19': [],
  });

  useEffect(() => {
    // Simulate fetching student data from an API
    // This could be an async operation (fetching from backend)
    // For demonstration, we're setting a timeout to simulate delay
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Update state with fetched data
        setStudentsByGrade({
          ...studentsByGrade,
          'Grade 11': [
            { id: 11, name: 'Isabella Martinez', registrationId: '202355' },
            { id: 12, name: 'James Moore', registrationId: '202356' },
            { id: 13, name: 'Ella Thompson', registrationId: '202357' },
            { id: 14, name: 'William Clark', registrationId: '202358' },
            { id: 15, name: 'Ava Rodriguez', registrationId: '202359' },
          ],
          'Grade 12': [
            { id: 16, name: 'Noah Lewis', registrationId: '202360' },
            { id: 17, name: 'Sophia Hall', registrationId: '202361' },
            { id: 18, name: 'Alexander King', registrationId: '202362' },
            { id: 19, name: 'Mia Scott', registrationId: '202363' },
            { id: 20, name: 'Benjamin Green', registrationId: '202364' },
          ],
          'Grade 13': [
            { id: 21, name: 'Charlotte Adams', registrationId: '202365' },
            { id: 22, name: 'Jacob Baker', registrationId: '202366' },
            { id: 23, name: 'Amelia Walker', registrationId: '202367' },
            { id: 24, name: 'Daniel Hill', registrationId: '202368' },
            { id: 25, name: 'Sophie Carter', registrationId: '202369' },
          ],
          'Grade 14': [
            { id: 26, name: 'Logan Powell', registrationId: '202370' },
            { id: 27, name: 'Evelyn Price', registrationId: '202371' },
            { id: 28, name: 'Jackson Reed', registrationId: '202372' },
            { id: 29, name: 'Grace Ward', registrationId: '202373' },
            { id: 30, name: 'Lucas Cooper', registrationId: '202374' },
          ],
          'Grade 15': [
            { id: 31, name: 'Avery Bailey', registrationId: '202375' },
            { id: 32, name: 'Madison Foster', registrationId: '202376' },
            { id: 33, name: 'Elijah Morris', registrationId: '202377' },
            { id: 34, name: 'Scarlett Richardson', registrationId: '202378' },
            { id: 35, name: 'Ryan Butler', registrationId: '202379' },
          ],
          'Grade 16': [
            { id: 36, name: 'Chloe Long', registrationId: '202380' },
            { id: 37, name: 'Gabriel Brooks', registrationId: '202381' },
            { id: 38, name: 'Lily Hughes', registrationId: '202382' },
            { id: 39, name: 'Landon Ramirez', registrationId: '202383' },
            { id: 40, name: 'Zoe Ross', registrationId: '202384' },
          ],
          'Grade 17': [
            { id: 41, name: 'Carter Sanders', registrationId: '202385' },
            { id: 42, name: 'Hannah Price', registrationId: '202386' },
            { id: 43, name: 'Isaac Peterson', registrationId: '202387' },
            { id: 44, name: 'Mila Coleman', registrationId: '202388' },
            { id: 45, name: 'Jack Kelly', registrationId: '202389' },
          ],
          'Grade 18': [
            { id: 46, name: 'Mason Rivera', registrationId: '202390' },
            { id: 47, name: 'Eleanor Barnes', registrationId: '202391' },
            { id: 48, name: 'Aiden Ward', registrationId: '202392' },
            { id: 49, name: 'Lillian Powell', registrationId: '202393' },
            { id: 50, name: 'Ethan Cox', registrationId: '202394' },
          ],
          'Grade 19': [
            { id: 51, name: 'Mackenzie Russell', registrationId: '202395' },
            { id: 52, name: 'Connor Bryant', registrationId: '202396' },
            { id: 53, name: 'Hazel Simmons', registrationId: '202397' },
            { id: 54, name: 'Grayson Howard', registrationId: '202398' },
            { id: 55, name: 'Aria Foster', registrationId: '202399' },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error (e.g., show error message)
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
    setSelectedStudent('');
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  const renderStudentList = () => {
    if (!selectedGrade) {
      return <h4 style={{color:'black',textAlign:'center', marginTop:'25vh'}}>Select a grade</h4>;
    } else if (studentsByGrade[selectedGrade]) {
      if (studentsByGrade[selectedGrade].length === 0) {
        return <p>No students found for {selectedGrade}</p>;
      } else {
        return (
          <ul style={{ listStyleType: 'none', padding: 0, maxHeight: '280px', overflowY: 'auto', textAlign: 'left' }}>
            {studentsByGrade[selectedGrade].map(student => (
              <li key={student.id} style={{ marginBottom: '10px' }}>
                <button
                  style={{
                    backgroundColor: selectedStudent && selectedStudent.id === student.id ? '#2b824c' : '#4aee88',
                    color: '#ffffff',
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    width: '100%',
                  }}
                  onClick={() => handleStudentSelect(student)}
                >
                  {student.name} - {student.registrationId}
                </button>
              </li>
            ))}
          </ul>
        );
      }
    } else {
      return <h4 style={{color:'black',textAlign:'center', marginTop:'25vh'}}>No students found for selected grade</h4>;
    }
  };

  const renderResultButton = () => {
    if (selectedStudent) {
      return (
        <button
          style={{ marginTop: '0px', padding: '10px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          onClick={() => handleShowResult(selectedStudent)}
        >
          Show Result
        </button>
      );
    } else {
      return null;
    }
  };

  const handleShowResult = (student) => {
    // Placeholder function to show the result for the selected student
    alert(`Showing results for ${student.name}`);
    // You can implement logic here to fetch and display detailed results
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', flexDirection: 'row' }}>
      {/* Container for selecting grade */}
      <div style={{ width: '50%', height: '400px', marginRight: '20px', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', overflowY: 'auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Select Grade</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {grades.map((grade, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <button
                style={{
                  backgroundColor: selectedGrade === grade ? '#2b824c' : '#4aee88',
                  color: '#ffffff',
                  padding: '5px 10px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  width: '100%',
                }}
                onClick={() => handleGradeSelect(grade)}
              >
                {grade}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Container for displaying students and showing result button */}
      <div style={{ width: '50%', height: '400px', textAlign: 'center', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', overflowY: 'auto' }}>
        <h2>Students</h2>
        {renderStudentList()}
        {renderResultButton()}
      </div>
    </div>
  );
};

export default Results;
