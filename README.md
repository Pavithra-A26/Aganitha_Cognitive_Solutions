# Aganitha_Cognitive_Solutions

📚 Book Finder Web App

A Full Stack Book Finder Application built using React (frontend) and Express.js (backend) that fetches real-time book data from the Open Library API.
Users can view popular books by default and search for books by title.

And i also included local db implementation if you want that uncomment the comments.

🚀 Features

🔍 Search Functionality — Search for books by title using the Open Library API.

🖼️ Dynamic Covers — Displays real book covers fetched from Open Library.

⚡ Full Stack Integration — Backend built with Express.js and frontend with React.js.

🌐 CORS Enabled — API communication between frontend and backend.

🏗️ Tech Stack

Frontend:

React.js -> Axios (for API calls), HTML, CSS, JavaScript

Backend -> Node.js, Express.js, Axios (to call Open Library API)

External API -> https://openlibrary.org/search.json?title=%7BbookTitle

⚙️ Installation & Setup

1.Clone the Repository
2.Setup backend
  cd backend
  npm install
  node server.js
3.Setup frontend
  cd ../frontend
  npm install
  npm start

✨ Future Enhancements

⭐ Add “Favorite Books” or “Wishlist” feature

📖 Add pagination for large search results

🗂️ Connect to MongoDB to store search history or saved books

🎨 Improve UI using Tailwind CSS or Material UI
