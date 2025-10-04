## Books_World_Modified - Book Review Platform
A full-stack Book Review Platform built using MongoDB, Express, React, Node.js (MERN).
Users can sign up, log in, add books, and review books with ratings. This project demonstrates authentication, CRUD operations, and frontend-backend integration.

https://img.shields.io/badge/MERN-Stack-brightgreen https://img.shields.io/badge/License-MIT-blue

## 📋 Table of Contents
Features

Tech Stack

Project Structure

Getting Started

Installation

Environment Variables

API Endpoints

Database Schema

Contributing

License

✨ Features
User Authentication with JWT and bcrypt

Book Management: Add/Edit/Delete books (creator only)

Review System: Add/Edit/Delete reviews with ratings

Average Rating: Automatic calculation and display

Pagination: 5 books per page for better navigation

Protected Routes: Secure access for authenticated users

Responsive Design: Works on all devices

🛠 Tech Stack
Backend:
Node.js - Runtime environment

Express.js - Web framework

MongoDB - Database

Mongoose - ODM for MongoDB

JWT - Authentication

bcrypt - Password hashing

CORS - Cross-origin resource sharing

Frontend:
React - UI library

React Router - Client-side routing

Axios - HTTP client

Bootstrap - CSS framework

React Bootstrap - Bootstrap components for React

Database:
MongoDB Atlas - Cloud database

## 📁 Project Structure
text
Books_World_Modified/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── models/
│   │   ├── User.js
│   │   ├── Book.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── books.js
│   │   └── reviews.js
│   └── middleware/
│       └── auth.js
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.js
│       ├── App.js
│       ├── api.js
│       ├── components/
│       │   ├── Navbar.js
│       │   └── BookCard.js
│       └── pages/
│           ├── Signup.js
│           ├── Login.js
│           ├── BookList.js
│           ├── BookDetails.js
│           ├── AddEditBook.js
│           └── Profile.js
└── README.md
## 🚀 Getting Started
Prerequisites
Node.js (v14 or higher)

MongoDB Atlas account or local MongoDB installation

npm or yarn

Installation
1. Clone the repository
bash
git clone https://github.com/yourusername/Books_World_Modified.git
cd Books_World_Modified
2. Backend Setup
bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start the development server
npm run dev
The backend server will run on http://localhost:5000

3. Frontend Setup
bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
The frontend will run on http://localhost:3000

⚙ Environment Variables
Backend (.env)
env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/books_world
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
Frontend (.env)
env
REACT_APP_API_URL=http://localhost:5000/api
##📊 Database Schema
User Model
javascript
{
  username: String,
  email: String,
  password: String,
  createdAt: Date
}
Book Model
javascript
{
  title: String,
  author: String,
  description: String,
  genre: String,
  publishedYear: Number,
  createdBy: ObjectId, // Reference to User
  createdAt: Date
}
Review Model
javascript
{
  bookId: ObjectId, // Reference to Book
  userId: ObjectId, // Reference to User
  rating: Number, // 1-5
  comment: String,
  createdAt: Date
}
## 🔌 API Endpoints
Authentication
POST /api/auth/signup - User registration

POST /api/auth/login - User login

GET /api/auth/me - Get current user

Books
GET /api/books - Get all books (with pagination)

GET /api/books/:id - Get single book with reviews

POST /api/books - Create new book (protected)

PUT /api/books/:id - Update book (protected, creator only)

DELETE /api/books/:id - Delete book (protected, creator only)

Reviews
POST /api/reviews - Add review to book (protected)

PUT /api/reviews/:id - Update review (protected, author only)

DELETE /api/reviews/:id - Delete review (protected, author only)

## 🎯 Usage
Sign Up/Login: Create an account or login to existing account

Browse Books: View all books with pagination

Add Books: Click "Add Book" to contribute new books

Review Books: Click on any book to view details and add reviews

Manage Content: Edit or delete your own books and reviews

## 🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request


