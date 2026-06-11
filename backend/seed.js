const mongoose = require('mongoose');
require('dotenv').config();

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// Sirf ek baar define kiya hai, English names ke saath
const newProducts = [
  { name: 'Kulhad Sweet Curd', description: 'Homemade goodness, traditional taste.', price: 100, imageUrl: '/products/dahi.jpg' },
  { name: 'Dahi Vada', description: 'Soft and spongy, soaked in sweet curd.', price: 80, imageUrl: '/products/dahibada.jpg' },
  { name: 'Deshi Ghee', description: 'Pure, granulated, traditional cow ghee.', price: 650, imageUrl: '/products/ghee.jpg' },
  { name: 'Mix Pickle', description: 'Spicy, tangy, homemade pickle.', price: 150, imageUrl: '/products/achar.jpg' },
  { name: 'Bhua Badi', description: 'Traditional sun-dried nutritious badi.', price: 120, imageUrl: '/products/badi.jpg' },
  { name: 'Fresh Paneer', description: 'Soft, fresh, and creamy paneer.', price: 90, imageUrl: '/products/paneer.jpg' }
];

const seedDB = async () => {
  try {
    const dbUrl = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce';
    await mongoose.connect(dbUrl);
    
    // Purana database clean karke naya data dalna
    await Product.deleteMany({});
    await Product.insertMany(newProducts);
    
    console.log('🎉 Database updated successfully with English products!');
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

seedDB();