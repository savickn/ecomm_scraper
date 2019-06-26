
const mongoose = require('mongoose');

const ProductController = require('../models/Product/product.controller');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/fashionscraper_dev', (error) => {
  if(error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  };
  console.log('Connected to mongoDB!');
})

const sampleData = {
  url: '',
  name: '',
  currentPrice: '', 
  originalPrice: '', 

};



