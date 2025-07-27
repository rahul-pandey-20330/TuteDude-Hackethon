const Expense = require('../models/expense');

exports.createExpense = async (req, res) => {
  try {
    const { userId, amount, description } = req.body;
    const expense = new Expense({ userId, amount, description });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate('userId');
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
