import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'; // Import moment for date formatting

const Practical = () => {
  const navigate = useNavigate();
  const [practicals, setPracticals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPracticals = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/practicals');
        setPracticals(response.data);
      } catch (error) {
        console.error('Error fetching practicals:', error);
      }
    };

    fetchPracticals();
  }, []);

  const handlePracticalSelection = (id) => {
    setPracticals(prevPracticals =>
      prevPracticals.map(practical =>
        practical._id === id ? { ...practical, selected: true } : { ...practical, selected: false }
      )
    );
  };

  const handleStart = () => {
    const selectedPractical = practicals.find(practical => practical.selected);
    if (selectedPractical) {
      navigate(`/practical/${selectedPractical._id}`);
    } else {
      alert('Please select a practical to start.');
    }
  };

  const filteredPracticals = practicals.filter(practical =>
    practical.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
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
                key={practical._id}
                style={{
                  margin: '10px 0',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: practical.selected ? '#28a745' : 'inherit',
                  color: practical.selected ? 'white' : 'inherit'
                }}
                onClick={() => handlePracticalSelection(practical._id)}
              >
                <div>{practical.subjectName}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {moment(practical.startTime).format('MMMM D, YYYY')}<br />
                  {moment(practical.startTime).format('h:mm A')} - {moment(practical.endTime).format('h:mm A')}
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
