const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Validate username and password (dummy example)
  if (username === 'admin' && password === 'admin') {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Login failed' });
  }
});

// Exam Creation Route
app.post('/api/createExam', async (req, res) => {
  const { examType, subjectName, numQuestions, numMcqs, numTheory } = req.body;
  let prompts = [];

  if (examType === 'mcq' || examType === 'mix') {
    prompts.push(`Generate ${numMcqs} multiple-choice questions on ${subjectName}.`);
  }
  if (examType === 'theory' || examType === 'mix') {
    prompts.push(`Generate ${numTheory} theory questions on ${subjectName}.`);
  }

  try {
    const responses = await Promise.all(
      prompts.map(prompt =>
        axios.post(
          'https://api.openai.com/v1/engines/davinci-codex/completions',
          {
            prompt,
            max_tokens: 150,
            n: 1,
            stop: null,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
          }
        )
      )
    );

    const questions = responses.map(response => response.data.choices[0].text.trim());
    res.json({ questions });
  } catch (error) {
    console.error('Error creating exam:', error);
    res.status(500).json({ error: 'Failed to create exam' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
