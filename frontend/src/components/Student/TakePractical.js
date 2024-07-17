import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TakePractical = () => {
  const { practicalId } = useParams();
  const [practical, setPractical] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [studentEmail, setStudentEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("You must be logged in to fetch user email");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "http://localhost:5000/api/user/email",
          config
        );
        setStudentEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching user email:", error.message);
        setError("Failed to fetch user email. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserEmail();
  }, []);

  useEffect(() => {
    const fetchPractical = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("You must be logged in to fetch practical details");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `http://localhost:5000/api/practical/${practicalId}`,
          config
        );
        setPractical(response.data);

        if (response.data.endTime) {
          const endTime = new Date(response.data.endTime);
          const currentTime = new Date();
          const timeDiff = endTime.getTime() - currentTime.getTime();
          setTimeRemaining(Math.floor(timeDiff / 1000));
        }
      } catch (error) {
        console.error("Error fetching practical:", error);
        setError("Failed to fetch practical details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPractical();
  }, [practicalId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRemaining]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("You must be logged in to submit the practical");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `http://localhost:5000/api/practical/${practicalId}/submit`,
        { answers },
        config
      );
      console.log(response.data);
      // Optionally handle success
    } catch (error) {
      console.error("Error submitting practical:", error);
      setError("Failed to submit practical. Please try again later.");
    }
  };

  const handleAnswerChange = (questionId, answerText) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerText,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {practical && (
        <>
          <h2>{practical.subjectName} Practical</h2>
          <div>{studentEmail && <p>Student Email: {studentEmail}</p>}</div>
          {timeRemaining > 0 ? (
            <div>
              Time remaining: {Math.floor(timeRemaining / 60)}:
              {("0" + (timeRemaining % 60)).slice(-2)}
            </div>
          ) : (
            <div>Time's up!</div>
          )}
          <form onSubmit={handleSubmit}>
            {practical.questions && (
              <div>
                <h3>Questions:</h3>
                {practical.questions.map((question, index) => (
                  <div key={question._id}>
                    <h4>{index + 1}. {question}</h4>
                    <textarea
                      value={answers[question._id] || ""}
                      onChange={(e) =>
                        handleAnswerChange(question._id, e.target.value)
                      }
                      rows={4}
                      cols={50}
                      placeholder="Enter your answer here..."
                      required
                    />
                  </div>
                ))}
              </div>
            )}
            <button type="submit">Submit Practical</button>
          </form>
        </>
      )}
    </div>
  );
};

export default TakePractical;
