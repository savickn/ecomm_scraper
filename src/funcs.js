
const Product = require('./models/product');

const createProduct = (data) => {
  return Product.create(data);
}

module.exports = {
  createProduct, 
};
