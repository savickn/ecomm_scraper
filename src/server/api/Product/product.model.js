
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  url: String, 
  name: String,
  pid: String, // in pid format, e.g. ???
  pcid: String, // category, in pcid format, e.g. 5319
  priceHistory: [{
    date: Date,
    colors: [{
      colorName: String,
      originalPrice: String, // represents the original price
      currentPrice: String, // represents the price at the time of scraping
      sizes: [String], 
    }], 
  }], 

  // extra info
  site: String, // e.g. BR/GAP
  category: String, // e.g. Blazer/Jeans/Shorts
  // color: String, // if separating colors from product

  // extra features
  onSale: Boolean, // used to determine if Promotion applies
  // something for .00 products

}); 

ProductSchema.virtual('isOnSale').get(() => {
  return this.currentPrice < this.originalPrice;
});

ProductSchema.virtual('currentDiscount').get(() => {
  return 1 - this.currentPrice / this.currentPrice;
})

//ProductSchema.set({'toJSON': true});

module.exports = mongoose.model('Product', ProductSchema);
