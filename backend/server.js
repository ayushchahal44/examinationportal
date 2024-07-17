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
  subjectName: { type: String, required: true },
  numQuestions: { type: Number, required: true },
  questions: { type: [String], required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  examDate: { type: Date, required: true },
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
app.post('/api/register/student',verifyToken, async (req, res) => {
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
app.post('/api/register/teacher',verifyToken, async (req, res) => {
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
app.post('/api/createExam',verifyToken, async (req, res) => {
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
app.post('/api/createPractical', async (req, res) => {
  const { subjectName, numQuestions, questions, startTime, endTime, examDate } = req.body;

  try {
    // Create a new Practical instance
    const newPractical = new Practical({
      subjectName,
      numQuestions,
      questions,
      startTime,
      endTime,
      examDate,
    });

    // Save to MongoDB
    const savedPractical = await newPractical.save();

    res.status(201).json(savedPractical);
  } catch (error) {
    console.error('Error creating practical:', error);
    res.status(500).json({ error: 'Failed to create practical' });
  }
});

// Route to get all practicals
app.get('/api/practicals', async (req, res) => {
  try {
    const practicals = await Practical.find();
    res.status(200).json(practicals);
  } catch (error) {
    console.error('Error fetching practicals:', error);
    res.status(500).json({ error: 'Failed to fetch practicals' });
  }
});

// Route to get all exams (for students to view)
app.get('/api/exams', async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json(exams);
  } catch (error) {
    console.error('Error fetching exams:', error);
    res.status(500).json({ error: 'Failed to fetch exams' });
  }
});


// Route to get an exam by ID
app.get('/api/exams/:examId',verifyToken,async (req, res) => {
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

app.get('/api/user/email', verifyToken, (req, res) => {
  const userEmail = req.user.email;
  res.status(200).json({ email: userEmail });
});


// Example route handling exam submission
app.post('/api/exams/:examId/submit', async (req, res) => {
  const { examId } = req.params;
  const { answers } = req.body;

  try {
    // Assuming `examId` is used to find and update the exam document in MongoDB
    const exam = await Exam.findById(examId);

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    // Update exam document with student answers
    exam.studentAnswers = answers;

    // Save updated exam document
    await exam.save();

    res.status(200).json({ message: 'Exam submitted successfully' });
  } catch (error) {
    console.error('Error submitting exam:', error);
    res.status(500).json({ error: 'Failed to submit exam. Please try again later.' });
  }
});




// Route to update an exam
app.put('/api/exams/:id', async (req, res) => {
  try {
    const examId = req.params.id;
    const updatedData = req.body;
    const updatedExam = await Exam.findByIdAndUpdate(examId, updatedData, { new: true, runValidators: true });
    if (!updatedExam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.status(200).json(updatedExam);
  } catch (error) {
    console.error('Error updating exam:', error);
    res.status(500).json({ error: 'Failed to update exam' });
  }
});

// Route to update a practical
app.put('/api/practicals/:id', async (req, res) => {
  try {
    const practicalId = req.params.id;
    const updatedData = req.body;
    const updatedPractical = await Practical.findByIdAndUpdate(practicalId, updatedData, { new: true, runValidators: true });
    if (!updatedPractical) {
      return res.status(404).json({ error: 'Practical not found' });
    }
    res.status(200).json(updatedPractical);
  } catch (error) {
    console.error('Error updating practical:', error);
    res.status(500).json({ error: 'Failed to update practical' });
  }
});


// Route to submit exam answers
// Route to get an exam by ID (with authentication)
app.get('/api/exams/:examId', verifyToken, async (req, res) => {
  try {
    const { examId } = req.params;
    const userEmail = req.user.email; // Get student's email from decoded JWT

    // Find the student based on the email fetched from decoded JWT
    const student = await Student.findOne({ email: userEmail });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Fetch the exam only if the student is authorized to access it
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    // Optionally, you can check if the student is enrolled in the exam or any other access logic here

    res.status(200).json(exam);
  } catch (error) {
    console.error('Error fetching exam:', error);
    res.status(500).json({ error: 'Failed to fetch exam' });
  }
});


app.get('/api/practical/:practicalId', verifyToken, async (req, res) => {
  try {
    const { practicalId } = req.params;
    const userEmail = req.user.email; // Get student's email from decoded JWT

    // Find the student based on the email fetched from decoded JWT
    const student = await Student.findOne({ email: userEmail });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Fetch the practical including questions/tasks
    const practical = await Practical.findById(practicalId).populate('questions'); // Assuming 'questions' is the field name in the Practical schema

    if (!practical) {
      return res.status(404).json({ error: 'Practical not found' });
    }

    // Optionally, you can check if the student is authorized to access this practical here

    res.status(200).json(practical);
  } catch (error) {
    console.error('Error fetching practical:', error);
    res.status(500).json({ error: 'Failed to fetch practical' });
  }
});





// Route to handle password change
app.post('/api/change-password', verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userEmail = req.user.email;

    // Find the user based on the email fetched from decoded JWT
    const user = await Student.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify if the current password matches
    if (user.password !== currentPassword) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Failed to change password' });
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


