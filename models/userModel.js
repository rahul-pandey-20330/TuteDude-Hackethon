const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String },
  location: { type: String },
  password: { type: String },
  role: { type: String, enum: ['vendor', 'admin'], default: 'vendor' },
  profileImage: { type: String },  
});

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
