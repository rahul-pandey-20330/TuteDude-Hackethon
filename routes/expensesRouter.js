const express = require('express');
const router = express.Router();
const Expense = require('../models/expenseModel');
const isLoggedIn = require('../middlewares/isLoggedIn');

// Handle POST - Add Expense
router.post('/add', isLoggedIn, async (req, res) => {
  try {
    const { title, amount, date, notes } = req.body;

    const expense = new Expense({
      userId: req.user._id,
      title,
      amount,
      date,
      notes
    });

    await expense.save();
    res.redirect('/dashboard');
  } catch (err) {
    console.error("Error adding expense:", err);
    res.redirect('/dashboard');
  }
});

module.exports = router;
