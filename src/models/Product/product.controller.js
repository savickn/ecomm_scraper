
const Product = require('./product.model');

const createProduct = (data) => {
  if(!data.url || !data.name || !data.currentPrice || !data.originalPrice) {
    console.error('Invalid arguments!');
    return;
  }

  Product.create(date, (err, product) => {
    if(err) console.error('Unable to create Product --> ', err);
    console.log('product --> ', product);
  });
};


module.exports = {
  createProduct,
  //updateProduct, 
};
