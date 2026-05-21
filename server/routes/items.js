const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().populate('createdBy', 'username');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const item = new Item({
      title: req.body.title,
      description: req.body.description,
      year: req.body.year,
      rating: req.body.rating,
      createdBy: req.session.userId
    });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.session.userId },
      { title: req.body.title, description: req.body.description },
      { new: true }
    );
    if (!item) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const item = await Item.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.session.userId
    });
    if (!item) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;