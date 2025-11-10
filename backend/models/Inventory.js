const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  supplier: { type: String },
  location: { type: String },
  lastRestocked: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', inventorySchema);