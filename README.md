# Books_World_Modified

# Book Review Platform (MERN Stack)

A full-stack **Book Review Platform** built using **MongoDB, Express, React, Node.js (MERN)**.  
Users can sign up, log in, add books, and review books with ratings. This project demonstrates authentication, CRUD operations, and frontend-backend integration.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Backend Code Examples](#backend-code-examples)
- [Frontend Code Examples](#frontend-code-examples)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)

---

## Features
- User authentication with **JWT** and **bcrypt**
- Book management: Add/Edit/Delete (creator only)
- Review system: Add/Edit/Delete reviews, show average rating
- Pagination (5 books per page)
- Protected routes for authenticated users

---

## Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **Frontend:** React, React Router, Axios, Bootstrap/Tailwind
- **Database:** MongoDB Atlas

---

## Project Structure

Books_World_Modified/
├── backend/
│ ├── server.js
│ ├── package.json
│ ├── .env.example
│ ├── models/
│ │ ├── User.js
│ │ ├── Book.js
│ │ └── Review.js
│ ├── routes/
│ │ ├── auth.js
│ │ ├── books.js
│ │ └── reviews.js
│ └── middleware/
│ └── auth.js
├── frontend/
│ ├── package.json
│ ├── public/
│ └── src/
│ ├── index.js
│ ├── App.js
│ ├── api.js
│ └── pages/
│ ├── Signup.js
│ ├── Login.js
│ ├── BookList.js
│ ├── BookDetails.js
│ └── AddEditBook.js
└── README.md

yaml
Copy code

---

## Getting Started

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB URI and JWT secret
npm run dev
Frontend
bash
Copy code
cd frontend
npm install
npm start
# Visit http://localhost:3000
Backend Code Examples
server.js
javascript
Copy code
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/reviews', require('./routes/reviews'));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
auth.js (Routes Example)
javascript
Copy code
const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed });
  await user.save();
  res.status(201).json({ message: 'User created' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid password' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
Frontend Code Examples
api.js (Axios Setup)
javascript
Copy code
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
Signup.js (React Page)
javascript
Copy code
import React, { useState } from 'react';
import API from '../api';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/signup', form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} placeholder="Name" />
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input type="password" name="password" onChange={handleChange} placeholder="Password" />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
BookList.js (Fetch Books with Pagination)
javascript
Copy code
import React, { useEffect, useState } from 'react';
import API from '../api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    API.get(`/books?page=${page}`).then(res => setBooks(res.data));
  }, [page]);

  return (
    <div>
      {books.map(book => (
        <div key={book._id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      ))}
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default BookList;
API Endpoints
See Backend Code Examples above.
All endpoints are RESTful, secured with JWT where needed.

Database Schema
User Schema

javascript
Copy code
{ name, email, password }
Book Schema

javascript
Copy code
{ title, author, description, genre, year, addedBy }
Review Schema

javascript
Copy code
{ bookId, userId, rating, reviewText }
