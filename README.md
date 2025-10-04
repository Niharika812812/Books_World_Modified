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
```
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

```bash
Copy code

---

## Getting Started

### Backend
```bash
cd backend
npm install
```bash
```bash
cp .env.example .env
```bash

```bash
# Update .env with your MongoDB URI and JWT secret
npm run dev
```bash
Frontend
```bash
Copy code
cd frontend
npm install
npm start
```bash
# Visit http://localhost:3000
Backend Code Examples

{ bookId, userId, rating, reviewText }
