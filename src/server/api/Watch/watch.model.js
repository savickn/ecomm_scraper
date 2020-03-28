
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const WatchSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  shouldEmail: {
    type: Boolean,
    default: true,
  }, 
  targetPrice: {
    type: Number,
    required: true,
  }, 
});

// update 'watchlist' field of 'userId' when watch is created
WatchSchema.pre('save', (next) => {
  mongoose.model('User').findByIdAndUpdate(this.userId, { $push: { watches: this._id }})
    .then((user) => {
      console.log('watch pre-save success --> ', user);
      return next();
    }).catch((err) => {
      return next(err);
    })
});

// update 'watchlist' field of 'userId' when watch is deleted
WatchSchema.pre('remove', (next) => {
  mongoose.model('User').findByIdAndUpdate(this.userId, { $pull: { watches: this._id }})
    .then((user) => {
      console.log('watch pre-remove success --> ', user);
      return next();
    }).catch((err) => {
      return next(err);
    })
});


export default mongoose.model('Watch', WatchSchema);


