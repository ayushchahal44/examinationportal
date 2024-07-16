// TakeExam.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TakeExam = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/exams/${examId}`);
        setExam(response.data);
      } catch (error) {
        console.error('Error fetching exam:', error);
      }
    };

    fetchExam();
  }, [examId]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/exams/${examId}/submit`, { answers });
      console.log(response.data);
      // Optionally handle success, e.g., show a success message or navigate to results page
    } catch (error) {
      console.error('Error submitting exam:', error);
      // Handle error
    }
  };

  const handleAnswerChange = (questionId, selectedOption) => {
    // Update answers array with selected option for the given question
    setAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      const answerIndex = updatedAnswers.findIndex(answer => answer.questionId === questionId);

      if (answerIndex !== -1) {
        updatedAnswers[answerIndex] = { questionId, selectedOption };
      } else {
        updatedAnswers.push({ questionId, selectedOption });
      }

      return updatedAnswers;
    });
  };

  if (!exam) {
    return <div>Loading exam...</div>;
  }

  return (
    <div>
      <h2>{exam.subjectName} Exam</h2>
      <form onSubmit={handleSubmit}>
        {exam.questions.map(question => (
          <div key={question._id}>
            <h3>{question.questionText}</h3>
            <ul>
              {question.options.map(option => (
                <li key={option.optionId}>
                  <label>
                    <input
                      type="radio"
                      name={`question_${question._id}`}
                      value={option.optionId}
                      onChange={() => handleAnswerChange(question._id, option.optionId)}
                    />
                    {option.optionText}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button type="submit">Submit Exam</button>
      </form>
    </div>
  );
};

export default TakeExam;
