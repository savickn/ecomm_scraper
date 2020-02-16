
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const PriceHistorySchema = new Schema({
  date: Date,
  colors: [{
    colorName: String,
    originalPrice: String, // represents the original price
    currentPrice: String, // represents the price at the time of scraping
    sizes: [String], 
  }], 
});

export default mongoose.model('PriceHistory', PriceHistorySchema);
