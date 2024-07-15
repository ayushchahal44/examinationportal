const express = require("express");
const connectDB = require("./db");
const student = require('./student_model');

connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to backend server! This is the root route.");
});

app.post("/add-student", async (req, res) => {
  const { name, roll, fee } = req.body;
  try {
    await student.create({ name, roll, fee });
    res.send("Data added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding data");
  }
});

app.get('/all-student', async (req, res) => {
  try {
    const studentDetails = await student.find();
    console.log(studentDetails);
    res.json(studentDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

app.put("/update-student/:id", async (req, res) => {
  const id = req.params.id;
  const { name, roll, fee } = req.body;
  try {
    await student.updateOne({ _id: id }, { name, roll, fee });
    res.send("Data updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating data");
  }
});

app.patch("/update-student-partially/:id", async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    await student.updateOne({ _id: id }, { name });
    res.send("Data updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating data");
  }
});

app.delete("/delete-student/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await student.deleteOne({ _id: id });
    res.send("Data deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting data");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("http://localhost:3000");
});
