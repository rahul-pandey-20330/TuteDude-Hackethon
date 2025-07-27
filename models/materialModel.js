const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  quantityUsed: {
    type: Number,
    required: true
  },
  quantityLeft: {
    type: Number,
    required: true
  },
  purchaseDate: {
    type: Date,
    required: true
  },
  cost: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Material', materialSchema);
