import React, { useState } from 'react';
import axios from 'axios';
import './CreatePractical.css'; // Assuming you have a separate CSS file for styling
import DatePicker from 'react-datepicker'; // Import date picker component
import 'react-datepicker/dist/react-datepicker.css';

const CreatePractical = () => {
  const [subjectName, setSubjectName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [examDate, setExamDate] = useState(new Date()); // State for exam date

  const apiUrl = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      subjectName,
      numTasks: tasks.length, // Calculate the number of tasks dynamically
      tasks,
      startTime,
      endTime,
      examDate // Include examDate in payload
    };

    try {
      const response = await axios.post(`${apiUrl}/api/createPractical`, payload);
      console.log('Practical created successfully:', response.data);
      alert('Practical created successfully');
      // Reset form fields after successful submission
      setSubjectName('');
      setTasks([]);
    } catch (error) {
      console.error('Error creating practical:', error);
      alert('Error creating practical');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask('');
  };

  const handleTaskChange = (e) => {
    setCurrentTask(e.target.value);
  };

  const addTask = () => {
    setTasks((prev) => [...prev, currentTask]);
    setCurrentTask('');
    closeModal();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ width: '50%', textAlign: 'center', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2>Create Practical</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginTop: '10px' }}>
            <label>
              Subject Name:
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                required
                style={{ marginLeft: '10px', padding: '5px' }}
              />
            </label>
          </div>
          <div style={{ marginTop: '10px' }}>
            <label>
              Exam Date:
              <DatePicker
                selected={examDate}
                onChange={date => setExamDate(date)}
                dateFormat="MMMM d, yyyy"
                className="date-picker"
              />
            </label>
          </div>
          <div style={{ marginTop: '10px' }}>
            <label>
              Start Time:
              <DatePicker
                selected={startTime}
                onChange={date => setStartTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="h:mm aa"
                className="date-picker"
              />
            </label>
          </div>
          <div style={{ marginTop: '10px' }}>
            <label>
              End Time:
              <DatePicker
                selected={endTime}
                onChange={date => setEndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="h:mm aa"
                className="date-picker"
              />
            </label>
          </div>
          <div style={{ marginTop: '10px' }}>
            <label>Tasks:</label>
            <ul>
              {tasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
            <button type="button" onClick={openModal} style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Add Task
            </button>
          </div>
          <button type="submit" disabled={isLoading} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {isLoading ? 'Creating...' : 'Create Practical'}
          </button>
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2>Add Task</h2>
            <form>
              <div style={{ marginBottom: '10px' }}>
                <label>
                  Task:
                  <input
                    type="text"
                    value={currentTask}
                    onChange={handleTaskChange}
                    required
                    style={{ marginLeft: '10px', padding: '5px' }}
                  />
                </label>
              </div>
              <button type="button" onClick={addTask} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Add Task
              </button>
              <button type="button" onClick={closeModal} style={{ padding: '10px 20px', backgroundColor: '#ff0000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePractical;
