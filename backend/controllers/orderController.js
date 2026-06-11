const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { customerInfo, orderItems, totalAmount, paymentMode } = req.body;
    
    // 4-digit ka random Delivery OTP generate karo
    const deliveryOtp = Math.floor(1000 + Math.random() * 9000).toString();

    const newOrder = new Order({ 
      customerInfo, 
      orderItems, 
      totalAmount, 
      paymentMode,
      deliveryOtp // Isko database mein save kar lo
    });
    
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Order place karne mein error aayi', error });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Orders fetch nahi ho paye', error });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, otp } = req.body; 

    // Agar status Delivered kiya ja raha hai, toh pehle OTP check karo
    if (status === 'Delivered') {
      const order = await Order.findById(id);
      if (order.deliveryOtp !== otp) {
        return res.status(400).json({ message: '❌ Galat OTP! Customer se sahi OTP lijiye.' });
      }
    }

    // YAHAN WARNING FIX KI HAI: { new: true } ki jagah { returnDocument: 'after' } lagaya hai
    const updatedOrder = await Order.findByIdAndUpdate(
      id, 
      { status: status }, 
      { returnDocument: 'after' } 
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Status update fail ho gaya', error });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { phone } = req.params;
    const orders = await Order.find({ 'customerInfo.phone': phone }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'User ke orders fetch nahi ho paye', error });
  }
};

const trackOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.trackId);
    if (!order) return res.status(404).json({ message: 'Order nahi mila' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Track order fail', error });
  }
};

module.exports = { createOrder, getOrders, updateOrderStatus, getUserOrders, trackOrder };