const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer '))
    return res.status(401).json({ message: 'Not authorized, token missing' });

  try {
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) throw new Error();

    next();
  } catch {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};