const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
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

// Define Mongoose schemas and models
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobileNumber: String,
  enrollYear: String,
  password: String,
});

const teacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobileNumber: String,
  department: String,
  password: String,
});

const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
});

const examSchema = new mongoose.Schema({
  examType: { type: String, required: true },
  subjectName: { type: String, required: true },
  numQuestions: { type: Number },
  numMcqs: { type: Number },
  numTheory: { type: Number },
  questions: [{
    questionText: String,
    questionType: String,
    options: [String],
    correctAnswer: String,
  }],
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const practicalSchema = new mongoose.Schema({
  subjectName: String,
  numTasks: Number,
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Student = mongoose.model('Student', studentSchema);
const Teacher = mongoose.model('Teacher', teacherSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Exam = mongoose.model('Exam', examSchema);
const Practical = mongoose.model('Practical', practicalSchema);

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email, role: user.isAdmin ? 'Admin' : 'User' }, JWT_SECRET, {
    expiresIn: '1h', // Token expiry time
  });
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Routes

// Route to handle student registration
app.post('/api/register/student', async (req, res) => {
  try {
    const { name, email, mobileNumber, enrollYear, password } = req.body;
    const newStudent = new Student({ name, email, mobileNumber, enrollYear, password });
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
    const newTeacher = new Teacher({ name, email, mobileNumber, department, password });
    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (error) {
    console.error('Error registering teacher:', error);
    res.status(500).json({ error: 'Failed to register teacher' });
  }
});

// Route to handle exam creation
app.post('/api/exams', verifyToken, async (req, res) => {
  try {
    const { examType, subjectName, numQuestions, numMcqs, numTheory, questions, startTime, endTime } = req.body;
    const newExam = new Exam({ examType, subjectName, numQuestions, numMcqs, numTheory, questions, startTime, endTime });
    const savedExam = await newExam.save();
    res.status(201).json(savedExam);
  } catch (error) {
    console.error('Error creating exam:', error);
    res.status(500).json({ error: 'Failed to create exam' });
  }
});

// Route to handle practical creation
app.post('/api/practicals', verifyToken, async (req, res) => {
  try {
    const { subjectName, numTasks, startTime, endTime } = req.body;
    const newPractical = new Practical({ subjectName, numTasks, startTime, endTime });
    const savedPractical = await newPractical.save();
    res.status(201).json(savedPractical);
  } catch (error) {
    console.error('Error creating practical:', error);
    res.status(500).json({ error: 'Failed to create practical' });
  }
});

// Route to get all practicals
app.get('/api/practicals', verifyToken, async (req, res) => {
  try {
    const practicals = await Practical.find();
    res.status(200).json(practicals);
  } catch (error) {
    console.error('Error fetching practicals:', error);
    res.status(500).json({ error: 'Failed to fetch practicals' });
  }
});

// Route to get all exams
app.get('/api/exams', verifyToken, async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json(exams);
  } catch (error) {
    console.error('Error fetching exams:', error);
    res.status(500).json({ error: 'Failed to fetch exams' });
  }
});

// Route to get an exam by ID
app.get('/api/exams/:examId', verifyToken, async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.status(200).json(exam);
  } catch (error) {
    console.error('Error fetching exam:', error);
    res.status(500).json({ error: 'Failed to fetch exam' });
  }
});

// Route to submit exam answers
app.post('/api/exams/:examId/submit', verifyToken, async (req, res) => {
  try {
    const { examId } = req.params;
    const { answers } = req.body;

    // Implement your logic here to save answers to the exam document or another collection
    // Example: await Exam.findByIdAndUpdate(examId, { $push: { submissions: { studentId: req.user.id, answers } } });

    res.status(200).json({ message: 'Exam submitted successfully' });
  } catch (error) {
    console.error('Error submitting exam:', error);
    res.status(500).json({ error: 'Failed to submit exam' });
  }
});

// Define the login route
app.post('/api/login', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    let user;
    if (role === 'Admin') {
      user = await Admin.findOne({ email: username });
    } else if (role === 'Teacher') {
      user = await Teacher.findOne({ email: username });
    } else if (role === 'Student') {
      user = await Student.findOne({ email: username });
    }

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Login failed' });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
