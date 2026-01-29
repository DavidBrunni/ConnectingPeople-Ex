const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Kräver att request har en giltig JWT i Authorization: Bearer <token>.
 * Sätter req.user till användarobjektet (utan password).
 */
async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-change-in-production');
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return res.status(401).json({ error: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { requireAuth };
