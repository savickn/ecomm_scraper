
const mongoose = require('mongoose');
const Product = require('./models/product');



mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/fashionscraper_dev', (error) => {
  if(error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  };
  console.log('Connected to mongoDB!');
})

/*Product.create({name: 'first', price: '10'}, () => {
  console.log('Product created!');
});*/






