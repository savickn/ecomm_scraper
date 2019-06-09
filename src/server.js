
const mongoose = require('mongoose');
const Product = require('./models/product');

const scrapers = require('./scrape');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/fashionscraper_dev', (error) => {
  if(error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  };
  console.log('Connected to mongoDB!');
})


await scrapers.scrapeProductPage();


/*Product.create({name: 'first', price: '10'}, () => {
  console.log('Product created!');
});*/






