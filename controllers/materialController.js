const Material = require('../models/materialModel');

exports.createMaterial = async (req, res) => {
  try {
    const { userId, itemName, quantityUsed, quantityLeft } = req.body;
    const material = new Material({ userId, itemName, quantityUsed, quantityLeft });
    await material.save();
    res.status(201).json(material);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMaterials = async (req, res) => {
  try {
    const materials = await Material.find().populate('userId');
    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
