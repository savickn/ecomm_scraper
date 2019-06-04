
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  price: String,
  colors: [{
    color: String,
    sizes: [String], 
  }], 
  category: String,
  date: Date, 
}); 

module.exports = mongoose.model('Product', ProductSchema);
