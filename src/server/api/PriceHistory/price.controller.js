
const PriceHistory = require('./price.model');


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
  if(!data.colorPrice || !data.colorName || !data.productId) {
    console.error('savePrice ---> Invalid arguments!');
    return;
  }

  // only save price if changed
  PriceHistory.findOne({ productId: data.productId })
    .sort({ date: -1 })
    .exec().then((price) => {
      console.log('pricehistory fineOne price --> ', price);
      if(!price || price.colorPrice != data.colorPrice) {
        PriceHistory.create(data, (err, price) => {
          if(err) console.error('savePrice create err --> ', err);
          console.log('Added price --> ', price);
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

