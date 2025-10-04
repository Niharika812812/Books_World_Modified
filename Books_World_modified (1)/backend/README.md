# Backend - Books World (modified)

## Setup
1. Copy `.env.example` to `.env` and fill `MONGODB_URI` and `JWT_SECRET`.
2. `npm install`
3. `npm run dev` (requires nodemon) or `npm start`

## API Endpoints (summary)
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/books?page=1
- POST /api/books (protected)
- GET /api/books/:id
- PUT /api/books/:id (protected, owner)
- DELETE /api/books/:id (protected, owner)
- POST /api/reviews/:bookId (protected) - create/update user's review
- DELETE /api/reviews/:id (protected, owner)
