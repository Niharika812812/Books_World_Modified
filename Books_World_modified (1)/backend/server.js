require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const reviewRoutes = require('./routes/reviews');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/books_world', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(()=> {
  console.log('MongoDB connected');
  app.listen(PORT, ()=> console.log('Server running on port', PORT));
}).catch(err => {
  console.error('MongoDB connection error:', err.message);
});
