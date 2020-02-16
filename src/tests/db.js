
const mongoose = require('mongoose');

const ProductController = require('../models/Product/product.controller');
const helpers = require('../scrapers/helpers');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/fashionscraper_dev', (error) => {
  if(error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  };
  console.log('Connected to mongoDB!');
})

const sampleData = {
  url: 'sdfsdfsdf',
  name: 'Shoes',
  currentPrice: '199', 
  originalPrice: '250', 
  date: Date.now(), 
};

(async () => {
  const product = await ProductController.createProduct(sampleData);
  console.log('done');
  await helpers.sleep(5000);
  console.log('product --> ', product);
})()