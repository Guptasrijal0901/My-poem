const express = require('express');
const router = express.Router();
const Poem = require('../models/Poem');

// GET all poems
router.get('/', async (req, res) => {
  try {
    const poems = await Poem.find().sort({ createdAt: -1 });
    res.json(poems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new poem
router.post('/', async (req, res) => {
  const poem = new Poem({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  });

  try {
    const newPoem = await poem.save();
    res.status(201).json(newPoem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
