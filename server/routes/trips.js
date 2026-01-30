const express = require('express');
const { requireAuth } = require('../middleware/auth');
const Trip = require('../models/Trip');

const router = express.Router();

// GET /api/trips – sök på destination och datum (valfria query-parametrar)
router.get('/', async (req, res) => {
  try {
    const { destination, dateFrom, dateTo } = req.query;
    const query = {};

    if (destination?.trim()) {
      query.destination = new RegExp(destination.trim(), 'i');
    }
    if (dateFrom && dateTo) {
      query.$and = [
        { dateFrom: { $lte: new Date(dateTo) } },
        { dateTo: { $gte: new Date(dateFrom) } },
      ];
    } else if (dateFrom) {
      query.dateTo = { $gte: new Date(dateFrom) };
    } else if (dateTo) {
      query.dateFrom = { $lte: new Date(dateTo) };
    }

    const trips = await Trip.find(query)
      .populate('createdBy', 'name email')
      .sort({ dateFrom: 1 })
      .lean();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Search failed' });
  }
});

// POST /api/trips – skapa resa (inloggad användare)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { destination, dateFrom, dateTo, description } = req.body;
    if (!destination?.trim() || !dateFrom || !dateTo) {
      return res.status(400).json({ error: 'Destination and dates are required' });
    }
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    if (from > to) {
      return res.status(400).json({ error: 'End date must be after start date' });
    }
    const trip = await Trip.create({
      destination: destination.trim(),
      dateFrom: from,
      dateTo: to,
      description: description?.trim() || '',
      createdBy: req.user._id,
    });
    const populated = await Trip.findById(trip._id).populate('createdBy', 'name email').lean();
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Create trip failed' });
  }
});

module.exports = router;
