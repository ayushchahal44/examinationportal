const mongoose = require('mongoose');

function connectDB() {
  mongoose.connect('mongodb://localhost:27017/flames', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to DB');
    })
    .catch((err) => {
      console.log('Error connecting to DB', err);
    });
}

module.exports = connectDB;
