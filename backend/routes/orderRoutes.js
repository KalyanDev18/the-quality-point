const express = require('express');
const router = express.Router();

// Yahan humne saare controllers ek hi baar mein import kar liye hain
const { 
  createOrder, 
  getOrders, 
  updateOrderStatus, 
  trackOrder, 
  getUserOrders 
} = require('../controllers/orderController');

// Saare Routes
router.post('/', createOrder);
router.get('/', getOrders);
router.put('/:id/status', updateOrderStatus);
router.get('/track/:trackId', trackOrder);
router.get('/user/:phone', getUserOrders); // Naya User Orders wala route

module.exports = router;