const jwt = require('jsonwebtoken');
const Keys = require('../config/Keys');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'Authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, Keys.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = authenticate;
