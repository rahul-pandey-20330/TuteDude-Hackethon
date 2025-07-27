const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.redirect('/');

    const decoded = jwt.verify(token, 'shhh');
    const user = await User.findById(decoded.userId || decoded.id);
    if (!user) return res.redirect('/');

    req.user = user;
    next();
  } catch (err) {
    return res.redirect('/');
  }
};

module.exports = isLoggedIn;
