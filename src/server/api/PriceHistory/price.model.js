
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const PriceSchema = new Schema({
  date: Date,
  price: String,
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },  
});

PriceSchema.pre('save', function(next) {
  mongoose.model('Product').findByIdAndUpdate(this.productId, { $push: { 'history': this._id } }, { new: true })
    .then((product) => {
      //console.log('price pre-save success --> ', product);
      next();
    }).catch((err) => {
      console.log('price pre-save err --> ', err);
      next(err);
    })  
})

export default mongoose.model('Price', PriceSchema);
