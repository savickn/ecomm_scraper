
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
  shouldEmail: { // should be in User preferences instead ???
    type: Boolean,
    default: true,
  }, 
  targetPrice: {
    type: Number,
    required: true,
  }, 
});

// update 'watchlist' field of 'userId' when watch is created
WatchSchema.pre('save', function(next) {
  mongoose.model('User').findByIdAndUpdate(this.userId, { $push: { watchlist: this._id }})
    .then((user) => {
      console.log('watch pre-save success --> ', user);
      return next();
    }).catch((err) => {
      return next(err);
    })
});

// update 'watchlist' field of 'userId' when watch is deleted
WatchSchema.pre('remove', function(next) {
  mongoose.model('User').findByIdAndUpdate(this.userId, { $pull: { watchlist: this._id }})
    .then((user) => {
      console.log('watch pre-remove success --> ', user);
      return next();
    }).catch((err) => {
      return next(err);
    })
});


export default mongoose.model('Watch', WatchSchema);


