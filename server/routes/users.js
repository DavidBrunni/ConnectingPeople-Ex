const express = require('express');
const { requireAuth } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// GET /api/users/me – inloggad användares profil
router.get('/me', requireAuth, (req, res) => {
  res.json(req.user);
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
