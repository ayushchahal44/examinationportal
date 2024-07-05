import React, { useState } from 'react';
import axios from 'axios';

const CreateExam = () => {
  const [examType, setExamType] = useState('mcq');
  const [subjectName, setSubjectName] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  const [numMcqs, setNumMcqs] = useState('');
  const [numTheory, setNumTheory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      examType,
      subjectName,
      numQuestions: examType === 'mix' ? undefined : parseInt(numQuestions, 10),
      numMcqs: examType === 'mix' ? parseInt(numMcqs, 10) : undefined,
      numTheory: examType === 'mix' ? parseInt(numTheory, 10) : undefined,
    };

    try {
      const response = await axios.post(`${apiUrl}/api/createExam`, payload);
      console.log('Exam created successfully:', response.data);
      alert('Exam created successfully');
      // Reset form fields after successful submission
      setExamType('mcq');
      setSubjectName('');
      setNumQuestions('');
      setNumMcqs('');
      setNumTheory('');
    } catch (error) {
      console.error('Error creating exam:', error);
      alert('Error creating exam');
    } finally {
      setIsLoading(false);
    }
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
                <option value="mix">Mix</option>
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
          {examType === 'mix' ? (
            <>
              <div style={{ marginTop: '10px' }}>
                <label>
                  Number of MCQs:
                  <input
                    type="number"
                    value={numMcqs}
                    onChange={(e) => setNumMcqs(e.target.value)}
                    required
                    style={{ marginLeft: '10px', padding: '5px' }}
                  />
                </label>
              </div>
              <div style={{ marginTop: '10px' }}>
                <label>
                  Number of Theory Questions:
                  <input
                    type="number"
                    value={numTheory}
                    onChange={(e) => setNumTheory(e.target.value)}
                    required
                    style={{ marginLeft: '10px', padding: '5px' }}
                  />
                </label>
              </div>
            </>
          ) : (
            <div style={{ marginTop: '10px' }}>
              <label>
                Number of Questions:
                <input
                  type="number"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(e.target.value)}
                  required
                  style={{ marginLeft: '10px', padding: '5px' }}
                />
              </label>
            </div>
          )}
          <button type="submit" disabled={isLoading} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {isLoading ? 'Creating...' : 'Create Exam'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateExam;
