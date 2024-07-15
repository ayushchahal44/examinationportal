const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  roll: {
    type: Number,
    required: true,
    unique: true
  },
  fee: {
    type: Number
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
