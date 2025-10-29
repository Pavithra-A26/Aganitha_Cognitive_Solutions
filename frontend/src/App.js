
import './App.css';
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   fetchBooks();
  // }, []);

  // const fetchBooks = async () => {
  //   const res = await axios.get("http://localhost:5000/api/books");
  //   setBooks(res.data);
  // };

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   if (!search) {
  //     fetchBooks();
  //     return;
  //   }
  //   const res = await axios.get(`http://localhost:5000/api/books/search?q=${search}`);
  //   setBooks(res.data);
  // };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const query = search.trim() || "all";
      const res = await axios.get(`https://openlibrary.org/search.json?title=${query}`);

      // ✅ Extract and format the data
      const docs = res.data.docs.slice(0, 12);
      const books = docs.map(book => ({
        title: book.title,
        author: book.author_name ? book.author_name[0] : "Unknown",
        year: book.first_publish_year || "N/A",
        cover: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : "https://via.placeholder.com/200x250?text=No+Cover"
      }));

      setBooks(books);
    } catch (err) {
      console.error(err);
      setBooks([]);
    }
  };

  return (
    <>
      {/* <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>📚 Book Finder</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search book by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", width: "250px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "8px 15px" }}>Search</button>
      </form>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px"
      }}>
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} style={{
              border: "1px solid #ddd",
              padding: "15px",
              width: "200px",
              borderRadius: "10px"
            }}>
              <img
                src={book.cover}
                alt={book.title}
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
              />
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
              <p>({book.year})</p>
            </div>
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div> */}


    <div className="app-container">
      <h1>📚 Book Finder</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search book by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <div className="book-list">
        {books.length > 0 ? (
          books.map((book, index) => (
            <div key={index} className="book-card">
              <img src={book.cover} alt={book.title} className="book-cover" />
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
              <p>({book.year || "N/A"})</p>
            </div>
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
    </>
  );
}

export default App;
