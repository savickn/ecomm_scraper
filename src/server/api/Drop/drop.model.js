
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// represents a PriceDrop... should prob store in Redis instead
const DropSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
  }, 
  newPrice: {
    type: Number,
    required: true, 
  }
})


export default mongoose.model('Drop', DropSchema);
