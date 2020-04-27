
const PriceHistory = require('./price.model');
const redis_client = require('../../../scripts/redis');

const dayInMilliseconds = 60 * 60 * 24 * 1000;

// used to retreive all price history via 'productId'
const getHistory = (req, res) => {
  PriceHistory.find({productId: req.params.id}, (err, prices) => {
    if(err) return res.status(400).send(err);
    return res.status(200).json({prices});
  });
}

/* 
** create new price entries
*/
const savePrice = (data) => {
  if(!data.price || !data.productId) {
    console.error('savePrice ---> Invalid arguments!');
    return;
  }

  // only save price if changed
  return PriceHistory.findOne({ productId: data.productId })
    .sort({ date: -1 })
    .then((prevPrice) => {
      if(!prevPrice || prevPrice.price != data.price || Date.now() - data.date > 7 * dayInMilliseconds ) {
        return PriceHistory.create(data)
          .then(newPrice => {
            console.log('Added price --> ', newPrice);
            //console.log('\n newPrice --> ', newPrice.price, '\n prevPrice --> ', prevPrice.price);

            if(!prevPrice || newPrice.price < prevPrice.price) {
              const check = { productId: newPrice.productId, price: newPrice.price, }; // add to Redis queue
              console.log('adding to queue --> ', check);
              redis_client.rpush('priceChecks', JSON.stringify(check));
            }
          })
          .catch(err => { 
            console.error('savePrice create err --> ', err) 
          })
      }
    }).catch((err) => {
      console.error('savePrice findOne err --> ', err);
    })
}

module.exports = {
  savePrice, 
  getHistory, 
};

