const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ✅ Register User
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, contact, location, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).send('User already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      contact,
      location,
      role,
      password: hashedPassword,
      profileImage: req.file ? `/uploads/${req.file.filename}` : null
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, 'shhh', { expiresIn: '1d' });
    res.cookie('token', token);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send('Registration Error: ' + err.message);
  }
};

// ✅ Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Incorrect password");

    const token = jwt.sign({ userId: user._id }, "shhh", { expiresIn: '1d' });
    res.cookie("token", token);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send("Login Error: " + err.message);
  }
};
