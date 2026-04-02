const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  fileUrl: { type: [String], required: true },
  fileName: { type: [String], required: true },
  copies: { type: Number, default: 1 },
  colorMode: { type: String, enum: ['BW', 'Color'], default: 'BW' },
  pageSize: { type: String, enum: ['A0', 'A1', 'A2', 'A3', 'A4'], default: 'A4' },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Printing', 'Completed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
