const express = require('express');
const mongoose = require('mongoose');
const { requireAuth } = require('../middleware/auth');
const Message = require('../models/Message');
const User = require('../models/User');

const router = express.Router();

// GET /api/messages – om ?with=userId: meddelanden med den användaren; annars: lista konversationer
router.get('/', requireAuth, async (req, res) => {
  const withUserId = req.query.with;
  if (withUserId) {
    return getMessagesWithUser(req, res, withUserId);
  }
  return listConversations(req, res);
});

async function getMessagesWithUser(req, res, withUserId) {
  try {
    const me = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(withUserId)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }
    const messages = await Message.find({
      $or: [
        { sender: me, receiver: withUserId },
        { sender: withUserId, receiver: me },
      ],
    })
      .sort({ createdAt: 1 })
      .populate('sender', 'name')
      .populate('receiver', 'name')
      .lean();
    return res.json(messages);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to load messages' });
  }
}

async function listConversations(req, res) {
  try {
    const me = req.user._id;
    const messages = await Message.find({
      $or: [{ sender: me }, { receiver: me }],
    })
      .sort({ createdAt: -1 })
      .populate('sender', 'name')
      .populate('receiver', 'name')
      .lean();

    const partnerIds = new Set();
    const lastByPartner = {};
    for (const m of messages) {
      const other = m.sender._id.toString() === me.toString() ? m.receiver : m.sender;
      const id = other._id.toString();
      if (!partnerIds.has(id)) {
        partnerIds.add(id);
        lastByPartner[id] = { user: other, lastMessage: m, lastAt: m.createdAt };
      }
    }

    const list = Object.entries(lastByPartner).map(([id, { user, lastMessage, lastAt }]) => ({
      partnerId: id,
      partnerName: user.name,
      lastBody: lastMessage.body,
      lastAt,
      lastFromMe: lastMessage.sender._id.toString() === me.toString(),
    }));
    list.sort((a, b) => new Date(b.lastAt) - new Date(a.lastAt));
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to load conversations' });
  }
}

// GET /api/messages/unread-count – antal olästa meddelanden
router.get('/unread-count', requireAuth, async (req, res) => {
  try {
    const count = await Message.countDocuments({
      receiver: req.user._id,
      readAt: null,
    });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to get unread count' });
  }
});

// POST /api/messages/mark-read – markera meddelanden i en konversation som lästa
router.post('/mark-read', requireAuth, async (req, res) => {
  try {
    const { with: withUserId } = req.body;
    if (!withUserId || !mongoose.Types.ObjectId.isValid(withUserId)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }
    await Message.updateMany(
      { receiver: req.user._id, sender: withUserId, readAt: null },
      { $set: { readAt: new Date() } }
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to mark as read' });
  }
});

// POST /api/messages – skicka meddelande (to, body)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { to, body } = req.body;
    if (!to || !body?.trim()) {
      return res.status(400).json({ error: 'Recipient and message body are required' });
    }
    if (!mongoose.Types.ObjectId.isValid(to)) {
      return res.status(400).json({ error: 'Invalid recipient id' });
    }
    const receiver = await User.findById(to).select('_id').lean();
    if (!receiver) return res.status(404).json({ error: 'User not found' });
    if (to === req.user._id.toString()) {
      return res.status(400).json({ error: 'Cannot send message to yourself' });
    }
    const message = await Message.create({
      sender: req.user._id,
      receiver: to,
      body: body.trim(),
    });
    const populated = await Message.findById(message._id)
      .populate('sender', 'name')
      .populate('receiver', 'name')
      .lean();
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to send message' });
  }
});

module.exports = router;
