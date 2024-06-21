// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Validate username and password (dummy example)
  if (username === 'admin' && password === 'admin') {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Login failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
