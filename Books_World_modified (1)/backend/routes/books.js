const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Review = require('../models/Review');
const auth = require('../middleware/auth');

// Create book (protected)
router.post('/', auth, async (req,res)=>{
  try{
    const b = new Book({ ...req.body, addedBy: req.user.id });
    await b.save();
    res.json(b);
  }catch(err){ res.status(500).json({ message: err.message }); }
});

// Edit book (only creator)
router.put('/:id', auth, async (req,res)=>{
  try{
    const book = await Book.findById(req.params.id);
    if(!book) return res.status(404).json({ message: 'Not found' });
    if(book.addedBy?.toString() !== req.user.id) return res.status(403).json({ message: 'Not allowed' });
    Object.assign(book, req.body);
    await book.save();
    res.json(book);
  }catch(err){ res.status(500).json({ message: err.message }); }
});

// Delete book (only creator)
router.delete('/:id', auth, async (req,res)=>{
  try{
    const book = await Book.findById(req.params.id);
    if(!book) return res.status(404).json({ message: 'Not found' });
    if(book.addedBy?.toString() !== req.user.id) return res.status(403).json({ message: 'Not allowed' });
    await book.remove();
    // remove related reviews
    await Review.deleteMany({ bookId: book._id });
    res.json({ message: 'Deleted' });
  }catch(err){ res.status(500).json({ message: err.message }); }
});

// Get books list with pagination (5 per page)
router.get('/', async (req,res)=>{
  try{
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page-1)*limit;
    const total = await Book.countDocuments();
    const books = await Book.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
    // attach average rating
    const withRatings = await Promise.all(books.map(async (bk)=>{
      const agg = await Review.aggregate([
        { $match: { bookId: bk._id } },
        { $group: { _id: '$bookId', avg: { $avg: '$rating' }, count: { $sum: 1 } } }
      ]);
      bk.avgRating = agg[0]?.avg ? Number(agg[0].avg.toFixed(2)) : null;
      bk.reviewsCount = agg[0]?.count || 0;
      return bk;
    }));
    res.json({ books: withRatings, page, totalPages: Math.ceil(total/limit), total });
  }catch(err){ res.status(500).json({ message: err.message }); }
});

// Get details including reviews and avg rating
router.get('/:id', async (req,res)=>{
  try{
    const book = await Book.findById(req.params.id).lean();
    if(!book) return res.status(404).json({ message: 'Not found' });
    const reviews = await Review.find({ bookId: book._id }).populate('userId','name').sort({ createdAt:-1 }).lean();
    const agg = await Review.aggregate([
      { $match: { bookId: book._id } },
      { $group: { _id: '$bookId', avg: { $avg: '$rating' }, count: { $sum: 1 } } }
    ]);
    book.reviews = reviews;
    book.avgRating = agg[0]?.avg ? Number(agg[0].avg.toFixed(2)) : null;
    book.reviewsCount = agg[0]?.count || 0;
    res.json(book);
  }catch(err){ res.status(500).json({ message: err.message }); }
});

module.exports = router;
