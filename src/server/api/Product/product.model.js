
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/* 
Categories:
* Shirt
* Dress Shirt
* Polo
* Jacket
* Henley
* Sweater
* Chino
* Pant
* Jean
* Blazer
* Suit Jacket
* Coat
* Parka 
*/

export const ProductSchema = new Schema({
  url: String, 
  name: String,
  color: String, // name of color
  fullPrice: String, // regular price
  currentPrice: String, // current price (e.g. can be the same as fullPrice or can be a discounted price)
  outOfStock: {
    type: Boolean, // is True if product is Out Of Stock
    default: false,
  },
  pid: String, // in pid format, e.g. ???
  pcid: String, // category, in pcid format, e.g. 5319
  brand: String, // e.g. BR/GAP
  keywords: [String], // almost anything --> e.g. wool/turtleneck/skinny/slim/etc
  imageSrc: String, // src string for product image (e.g. shirt)
  colorSrc: String, // src string for color thumbnail 
  sizes: [String], 
  history: [{ // --> tracks price changes
    type: Schema.Types.ObjectId,
    ref: 'Price', 
  }], 

  // keywords include:
  // category: String, --> e.g. Sweater/Blazer
  // variety: String, --> crewneck/turtleneck
  // materials: String, --> e.g. Denim, Corduroy, 

  // extra features
  onSale: Boolean, // used to determine if Promotion applies
  // something for .00 products

}, {
  timestamps: true,
}); 

ProductSchema.virtual('isOnSale').get(() => {
  return this.currentPrice < this.originalPrice;
});

ProductSchema.virtual('currentDiscount').get(() => {
  return 1 - this.currentPrice / this.currentPrice;
})

//ProductSchema.set({'toJSON': true});

export default mongoose.model('Product', ProductSchema);








  /* ALTERNATIVE
  colors: [{
    color: String, 
    sizes: [String], 
    history: [{
      date: Date, 
      salePrice: String, // sale price (pre site-wide promotions)
    }], 

    OR 

    history: [{
      type: Schema.Types.ObjectId,
      ref: 'PriceHistory', 
    }], 
  }], */

  /* OLD
  priceHistory: [{
    date: Date,
    colors: [{
      colorName: String,
      originalPrice: String, // represents the original price
      currentPrice: String, // represents the price at the time of scraping
      sizes: [String], 
    }], 
  }], */