const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a Mongoose schema for students
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobileNumber: String,
  enrollYear: String,
  password: String,
});

// Define a Mongoose schema for teachers
const teacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobileNumber: String,
  department: String,
  password: String,
});

// Create Mongoose models based on the schemas
const Student = mongoose.model('Student', studentSchema);
const Teacher = mongoose.model('Teacher', teacherSchema);

// Route to handle student registration
app.post('/api/register/student', async (req, res) => {
  try {
    const { name, email, mobileNumber, enrollYear, password } = req.body;

    // Hash the password before saving it to MongoDB
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new instance of the Student model
    const newStudent = new Student({
      name,
      email,
      mobileNumber,
      enrollYear,
      password: hashedPassword,
    });

    // Save the new student instance to MongoDB
    const savedStudent = await newStudent.save();

    res.status(201).json(savedStudent);
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ error: 'Failed to register student' });
  }
});

// Route to handle teacher registration
app.post('/api/register/teacher', async (req, res) => {
  try {
    const { name, email, mobileNumber, department, password } = req.body;

    // Hash the password before saving it to MongoDB
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new instance of the Teacher model
    const newTeacher = new Teacher({
      name,
      email,
      mobileNumber,
      department,
      password: hashedPassword,
    });

    // Save the new teacher instance to MongoDB
    const savedTeacher = await newTeacher.save();

    res.status(201).json(savedTeacher);
  } catch (error) {
    console.error('Error registering teacher:', error);
    res.status(500).json({ error: 'Failed to register teacher' });
  }
});

// Dummy login route (replace with actual authentication logic)
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
