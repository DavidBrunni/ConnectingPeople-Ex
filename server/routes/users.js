const express = require('express');
const mongoose = require('mongoose');
const { requireAuth } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// GET /api/users/me – inloggad användares profil
router.get('/me', requireAuth, (req, res) => {
  res.json(req.user);
});

// GET /api/users/:id – publik profil (namn, bio, intressen – ingen e-post)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }
    const user = await User.findById(id).select('name bio interests').lean();
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to load profile' });
  }
});

// PATCH /api/users/me – uppdatera profil (namn, bio, intressen)
router.patch('/me', requireAuth, async (req, res) => {
  try {
    const { name, bio, interests } = req.body;
    const updates = {};
    if (name !== undefined) updates.name = String(name).trim();
    if (bio !== undefined) updates.bio = String(bio);
    if (Array.isArray(interests)) updates.interests = interests.map((i) => String(i)).filter(Boolean);
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Update failed' });
  }
});

module.exports = router;
