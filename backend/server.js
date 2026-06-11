const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Env variables load karein
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes Import
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes'); // YEH NAYI LINE ADD KI HAI

// API Endpoints setup
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes); // YEH NAYI LINE ADD KI HAI

// Basic Test Route
app.get('/', (req, res) => {
  res.send('The Quality Point API is running...');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch((err) => console.log('Database Connection Error: ', err));

// Server Start Karein
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});