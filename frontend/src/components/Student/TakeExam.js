// TakeExam.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TakeExam = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds
  const [studentEmail, setStudentEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user email on component mount
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('You must be logged in to fetch user email');
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get('http://localhost:5000/api/user/email', config);
        setStudentEmail(response.data.email); // Assuming the response data contains the email
      } catch (error) {
        console.error('Error fetching user email:', error.message);
        setError('Failed to fetch user email. Please log in again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserEmail();
  }, []); // Run this effect only once on component mount

  // Fetch exam details based on examId
  useEffect(() => {
    const fetchExam = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('You must be logged in to fetch exam details');
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get(`http://localhost:5000/api/exams/${examId}`, config);
        setExam(response.data);

        // Set time remaining if exam has a time limit (in seconds)
        if (response.data.endTime) {
          const endTime = new Date(response.data.endTime.$date);
          const currentTime = new Date();
          const timeDiff = endTime.getTime() - currentTime.getTime();
          setTimeRemaining(Math.floor(timeDiff / 1000));
        }
      } catch (error) {
        console.error('Error fetching exam:', error);
        setError('Failed to fetch exam details.');
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [examId]);

  // Countdown timer effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(prevTime => prevTime - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRemaining]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('You must be logged in to submit the exam');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.post(`http://localhost:5000/api/exams/${examId}/submit`, { answers }, config);
      console.log(response.data);
      // Optionally handle success, e.g., show a success message or navigate to results page
    } catch (error) {
      console.error('Error submitting exam:', error);
      setError('Failed to submit exam. Please try again later.');
    }
  };

  // Update answers array with selected option for the given question
  const handleAnswerChange = (questionId, selectedOption) => {
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

  // Loading state while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error if fetch fails
  if (error) {
    return <div>{error}</div>;
  }

  // Render exam details and form
  return (
    <div>
      {exam && (
        <>
          <h2>{exam.subjectName} Exam</h2>
          <div>{studentEmail && <p>Student Email: {studentEmail}</p>}</div>
          {timeRemaining > 0 ? (
            <div>Time remaining: {Math.floor(timeRemaining / 60)}:{('0' + (timeRemaining % 60)).slice(-2)}</div>
          ) : (
            <div>Time's up!</div>
          )}
          <form onSubmit={handleSubmit}>
            {exam.questions.map(question => (
              <div key={question._id.$oid}>
                <h3>{question.questionText}</h3>
                <ul>
                  {question.options.map((option, index) => (
                    <li key={`${question._id.$oid}_${index}`}>
                      <label>
                        <input
                          type="radio"
                          name={`question_${question._id.$oid}`}
                          value={option}
                          onChange={() => handleAnswerChange(question._id.$oid, option)}
                          checked={answers.some(answer => answer.questionId === question._id.$oid && answer.selectedOption === option)}
                        />{' '}
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button type="submit">Submit Exam</button>
          </form>
        </>
      )}
    </div>
  );
};

export default TakeExam;
