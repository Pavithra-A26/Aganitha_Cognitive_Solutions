const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
// mongoose.connect("mongodb://127.0.0.1:27017/Aganitha")
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch(err => console.log("❌ DB Connection Error:", err));


// Book model
// const Book = mongoose.model("Book", new mongoose.Schema({
//   title: String,
//   author: String,
//   year: Number,
//   cover: String
// }));

// Route to get all books
// app.get("/api/books", async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.json(books);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching books" });
//   }
// });

// Route: Get all books or search by title
// app.get("/api/books/search", async (req, res) => {
//   try {
//     const query = req.query.q;
//     const books = await Book.find({ title: { $regex: query, $options: "i" } });
//     res.json(books);
//   } catch (error) {
//     res.status(500).json({ message: "Search failed" });
//   }
// });


// Route to search books using Open Library API
app.get("/api/books", async (req, res) => {
  try {
    const query = req.query.q || "all";
    const response = await axios.get(`https://openlibrary.org/search.json?title=${query}`);
    const docs = response.data.docs.slice(0, 12); // limit to 12 results

    // Clean up the data we send to frontend
    const books = docs.map(book => ({
      title: book.title,
      author: book.author_name ? book.author_name[0] : "Unknown",
      year: book.first_publish_year || "N/A",
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : "https://via.placeholder.com/200x250?text=No+Cover"
    }));

    res.json(books);
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    res.status(500).json({ message: "Failed to fetch books" });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
