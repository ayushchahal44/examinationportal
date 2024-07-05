import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Practical = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Sample data for available practicals (with start and end times)
  const [practicals, setPracticals] = useState([
    { id: 1, name: 'Practical 1', selected: false, startTime: '10:00 AM', endTime: '11:00 AM' },
    { id: 2, name: 'Practical 2', selected: false, startTime: '11:30 AM', endTime: '12:30 PM' },
    { id: 3, name: 'Practical 3', selected: false, startTime: '1:00 PM', endTime: '2:00 PM' },
    { id: 4, name: 'Practical 4', selected: false, startTime: '2:30 PM', endTime: '3:30 PM' },
    { id: 5, name: 'Practical 5', selected: false, startTime: '4:00 PM', endTime: '5:00 PM' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle practical selection
  const handlePracticalSelection = (id) => {
    setPracticals(prevPracticals =>
      prevPracticals.map(practical =>
        practical.id === id ? { ...practical, selected: true } : { ...practical, selected: false }
      )
    );
  };

  // Function to handle start button click
  const handleStart = () => {
    const selectedPractical = practicals.find(practical => practical.selected);
    if (selectedPractical) {
      // Navigate to another page (replace '/practical' with your actual path)
      navigate(`/practical/${selectedPractical.id}`);
    } else {
      alert('Please select a practical to start.');
    }
  };

  // Filter practicals based on search term
  const filteredPracticals = practicals.filter(practical =>
    practical.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ width: '80%', textAlign: 'center', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2>Available Practicals</h2>
        <input
          type="text"
          placeholder="Search practicals"
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
            {filteredPracticals.map(practical => (
              <li
                key={practical.id}
                style={{
                  margin: '10px 0',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '10px',
                  cursor: 'pointer',
                  backgroundColor: practical.selected ? '#28a745' : 'inherit',
                  color: practical.selected ? 'white' : 'inherit'
                }}
                onClick={() => handlePracticalSelection(practical.id)}
              >
                <div>{practical.name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {`Start Time: ${practical.startTime} - End Time: ${practical.endTime}`}
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

export default Practical;
