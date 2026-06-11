const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  price: { 
    type: Number, 
    required: true 
  },
  stockStatus: { 
    type: Boolean, 
    default: true 
  },
  imageUrl: { 
    type: String 
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);