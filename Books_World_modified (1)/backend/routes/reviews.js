const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

// Create or update user's review for a book
router.post('/:bookId', auth, async (req,res)=>{
  try{
    const { rating, reviewText } = req.body;
    const book = await Book.findById(req.params.bookId);
    if(!book) return res.status(404).json({ message: 'Book not found' });
    let review = await Review.findOne({ bookId: book._id, userId: req.user.id });
    if(review){
      review.rating = rating; review.reviewText = reviewText;
      await review.save();
      return res.json(review);
    }
    review = new Review({ bookId: book._id, userId: req.user.id, rating, reviewText });
    await review.save();
    res.json(review);
  }catch(err){ res.status(500).json({ message: err.message }); }
});

// Delete review (only owner)
router.delete('/:id', auth, async (req,res)=>{
  try{
    const review = await Review.findById(req.params.id);
    if(!review) return res.status(404).json({ message: 'Not found' });
    if(review.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Not allowed' });
    await review.remove();
    res.json({ message: 'Deleted' });
  }catch(err){ res.status(500).json({ message: err.message }); }
});

module.exports = router;
