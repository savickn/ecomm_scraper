
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  originalPrice: String,
  salePrice: String,
  colors: [{
    color: String,
    sizes: [String], 
  }], 
  category: String, // in pcid format, e.g. 5319
  date: Date, 
}); 

module.exports = mongoose.model('Product', ProductSchema);
