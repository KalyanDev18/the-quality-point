const Product = require('../models/Product');

// 1. Saare products fetch karne ke liye (Customer Website ke liye)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Products fetch karne mein error aayi', error });
  }
};

// 2. Naya product add karne ke liye (Admin Panel ke liye)
const createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    
    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Product add nahi ho paya', error });
  }
};

module.exports = { getProducts, createProduct };