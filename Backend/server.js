const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/Aganitha")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ DB Connection Error:", err));


// Book model
const Book = mongoose.model("Book", new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  cover: String
}));

// Route to get all books
app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

// Route: Get all books or search by title
app.get("/api/books/search", async (req, res) => {
  try {
    const query = req.query.q;
    const books = await Book.find({ title: { $regex: query, $options: "i" } });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
