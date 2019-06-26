
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  url: String, 
  name: String,
  currentPrice: String, // represents the price at the time of scraping
  originalPrice: String, // represents the regular price
  colors: [{
    color: String,
    sizes: [String], 
  }], 
  category: String, // in pcid format, e.g. 5319
  date: Date, 
}); 

ProductSchema.virtual('isOnSale').get(() => {
  return this.currentPrice < this.originalPrice;
})

//ProductSchema.set({'toJSON': true});

module.exports = mongoose.model('Product', ProductSchema);
