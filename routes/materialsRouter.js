const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const Material = require('../models/materialModel');

// Route to render material form or add multiple
router.post('/add-multiple', isLoggedIn, async (req, res) => {
  try {
    const { itemName, quantityUsed, quantityLeft, purchaseDate, cost } = req.body;

    for (let i = 0; i < itemName.length; i++) {
      await Material.create({
        userId: req.user._id,
        itemName: itemName[i],
        quantityUsed: quantityUsed[i],
        quantityLeft: quantityLeft[i],
        purchaseDate: purchaseDate[i],
        cost: cost[i]
      });
    }

    res.redirect('/dashboard');
  } catch (err) {
    console.warn("Error adding materials:", err);
    res.status(500).send("Error adding materials");
  }
});

module.exports = router;
