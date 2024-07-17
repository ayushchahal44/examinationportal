import React, { useState } from 'react';
import axios from 'axios';
import './CreateExam.css'; // Assuming you have a separate CSS file for styling
import DatePicker from 'react-datepicker'; // Import date picker component
import 'react-datepicker/dist/react-datepicker.css';

const CreateExam = () => {
  const [examType, setExamType] = useState('mcq');
  const [subjectName, setSubjectName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({ questionText: '', options: ['', '', '', ''], correctAnswer: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [examDate, setExamDate] = useState(new Date()); // State for exam date

  const apiUrl = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      examType,
      subjectName,
      numQuestions: questions.length,
      questions,
      startTime,
      endTime,
      examDate // Include examDate in payload
    };


    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be logged in to create exam');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const response = await axios.post(`${apiUrl}/api/createExam`, payload,config);
      console.log('Exam created successfully:', response.data);
      alert('Exam created successfully');
      setExamType('mcq');
      setSubjectName('');
      setQuestions([]);
    } catch (error) {
      console.error('Error creating exam:', error);
      alert('Error creating exam');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentQuestion({ questionText: '', options: ['', '', '', ''], correctAnswer: '' });
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, e) => {
    const { value } = e.target;
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options.map((option, i) => (i === index ? value : option))
    }));
  };

  const addQuestion = () => {
    setQuestions((prev) => [...prev, currentQuestion]);
    closeModal();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ width: '50%', textAlign: 'center', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2>Create Exam</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Exam Type:
              <select value={examType} onChange={(e) => setExamType(e.target.value)} style={{ marginLeft: '10px', padding: '5px' }}>
                <option value="mcq">MCQ</option>
                <option value="theory">Theory</option>
              </select>
            </label>
          </div>
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
            <label>
              Number of Questions: {questions.length}
            </label>
            <button type="button" onClick={openModal} style={{ marginLeft: '10px' }}>Add Question</button>
          </div>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>
                {question.questionText}
                {examType === 'mcq' && (
                  <ul>
                    {question.options.map((option, i) => (
                      <li key={i}>{option}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <button type="submit" disabled={isLoading} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {isLoading ? 'Creating...' : 'Create Exam'}
          </button>
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2>Add Question</h2>
            <form>
              <div style={{ marginBottom: '10px' }}>
                <label>
                  Question:
                  <input
                    type="text"
                    name="questionText"
                    value={currentQuestion.questionText}
                    onChange={handleQuestionChange}
                    required
                    style={{ marginLeft: '10px', padding: '5px' }}
                  />
                </label>
              </div>
              {examType === 'mcq' && (
                <div style={{ marginBottom: '10px' }}>
                  {currentQuestion.options.map((option, index) => (
                    <div key={index}>
                      <label>
                        Option {index + 1}:
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(index, e)}
                          required
                          style={{ marginLeft: '10px', padding: '5px' }}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {examType === 'mcq' && (
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    Correct Answer:
                    <input
                      type="text"
                      name="correctAnswer"
                      value={currentQuestion.correctAnswer}
                      onChange={handleQuestionChange}
                      required
                      style={{ marginLeft: '10px', padding: '5px' }}
                    />
                  </label>
                </div>
              )}
              <button type="button" onClick={addQuestion} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Add Question
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

export default CreateExam;