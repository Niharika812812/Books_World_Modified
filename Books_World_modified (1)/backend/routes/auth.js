const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if(!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
    let user = await User.findOne({ email });
    if(user) return res.status(400).json({ message: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashed });
    await user.save();
    res.json({ message: 'User created' });
  } catch(err){ res.status(500).json({ message: err.message }); }
});

router.post('/login', async (req,res)=>{
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: 'Invalid credentials' });
    const matched = await bcrypt.compare(password, user.password);
    if(!matched) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET || 'secret123', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch(err){ res.status(500).json({ message: err.message }); }
});

module.exports = router;
