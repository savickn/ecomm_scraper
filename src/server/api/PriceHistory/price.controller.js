
const PriceHistory = require('./price.model');
const root = require('../../../scripts/scraper/start');

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

            if(newPrice.price < prevPrice.price) {
              // add to Redis queue
              const check = { productId: newPrice.productId, price: newPrice.price };
              root.redisClient.rpush('priceChecks', JSON.stringify(check));
            }
          })
          .catch(err => { 
            console.error('savePrice create err --> ', err) 
          })
      }
    }).catch((err) => {
      console.error('savePrice findOne err --> ', err);
    })

  /*PriceHistory.create(data, (err, price) => {
    if(err) console.error('savePrice err --> ', err);
    console.log('savePrice success --> ', price);
  })*/
}

module.exports = {
  savePrice, 
  getHistory, 
};

