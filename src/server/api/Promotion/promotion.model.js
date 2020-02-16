
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const types = [
  'All',
  'Sale',
  'Regular', 
];


// 'Prices as marked' --> ignore
// 'Online Only', 'In Store Only'
// '40% Off Everything'
// 'With Code: BONUS'

const PromotionSchema = new Schema({
  type: String, // e.g. sale/clearance/regular price/X-only 
  discount: Number, // e.g. 40%
  site: String, // e.g. GAP/BR
  date: Date, // current date
  expiry: Date, 

  text: String, // represents the sale text (e.g. 30% off everything with code 'discount')
  details: String, // more sale details

  exceptions: [String],
  exclusions: [String], // e.g. leather products 
  stackable: Boolean, 
});

module.exports = mongoose.model('Promotion', PromotionSchema);
