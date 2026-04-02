const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/Order');
const multer = require('multer');
const path = require('path');

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// In-memory mock data for when DB is disconnected
let mockOrders = [];

// Helper to check if DB is connected
const isDbConnected = () => mongoose.connection.readyState === 1;

// Create Order (Multipart with Multiple Files)
router.post('/', upload.array('files'), async (req, res) => {
  const { customerName, phoneNumber, copies, colorMode, pageSize, totalPrice } = req.body;
  
  const fileUrl = req.files ? req.files.map(file => `http://localhost:5000/uploads/${file.filename}`) : [];
  const fileName = req.files ? req.files.map(file => file.originalname) : [];

  const orderData = {
    customerName,
    phoneNumber,
    copies: parseInt(copies),
    colorMode,
    pageSize,
    totalPrice: parseFloat(totalPrice),
    fileUrl,
    fileName,
    status: 'Pending',
    createdAt: new Date()
  };

  if (!isDbConnected()) {
    const newOrder = { ...orderData, _id: 'mock_' + Date.now() };
    mockOrders.unshift(newOrder);
    return res.status(201).json(newOrder);
  }

  try {
    const order = new Order(orderData);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get All Orders (Admin)
router.get('/', async (req, res) => {
  if (!isDbConnected()) {
    return res.json(mockOrders);
  }
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Order Status
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  if (!isDbConnected()) {
    const index = mockOrders.findIndex(o => o._id === id);
    if (index !== -1) {
      mockOrders[index].status = req.body.status;
      return res.json(mockOrders[index]);
    }
    return res.status(404).json({ message: 'Mock order not found' });
  }
  try {
    const order = await Order.findByIdAndUpdate(id, { status: req.body.status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Individual Order
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!isDbConnected()) {
    const index = mockOrders.findIndex(o => o._id === id);
    if (index !== -1) {
      const deleted = mockOrders.splice(index, 1);
      return res.json({ message: 'Order deleted', order: deleted[0] });
    }
    return res.status(404).json({ message: 'Mock order not found' });
  }
  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Clear All Completed Orders
router.delete('/bulk/completed', async (req, res) => {
  if (!isDbConnected()) {
    const originalCount = mockOrders.length;
    mockOrders = mockOrders.filter(o => o.status !== 'Completed');
    return res.json({ message: `Cleared ${originalCount - mockOrders.length} completed orders` });
  }
  try {
    const result = await Order.deleteMany({ status: 'Completed' });
    res.json({ message: `Cleared ${result.deletedCount} completed orders` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
