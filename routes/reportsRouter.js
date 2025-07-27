// routes/reportsRouter.js
const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Expense = require("../models/expenseModel");
const Material = require("../models/materialModel");

router.get("/summary", isLoggedIn, async (req, res) => {
  try {
    const userId = req.user._id;
    const expenses = await Expense.find({ userId });
    const materials = await Material.find({ userId });

    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalMaterialCost = materials.reduce((sum, m) => sum + m.cost, 0);

    const currentMonth = new Date().getMonth();
    const monthlyExpenses = expenses.filter(e => new Date(e.date).getMonth() === currentMonth);

    res.render("reports", {
      user: req.user,
      totalExpense,
      totalMaterialCost,
      monthlyExpenses
    });
  } catch (err) {
    console.error("Report Error:", err);
    res.status(500).send("Error generating report");
  }
});

module.exports = router;
