const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerInfo: {
    name: String,
    phone: String,
    address: String
  },
  orderItems: Array,
  totalAmount: Number,
  paymentMode: String,
  status: { type: String, default: 'Pending' },
  deliveryOtp: { type: String }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);