
const mongoose = require('mongoose');
const Winston = require('winston');

const logger = Winston.createLogger({
  level: 'info',
  format: Winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new Winston.transports.File({ filename: 'error.log', level: 'error' }),
    new Winston.transports.File({ filename: 'combined.log' })
  ]
});

const scrapers = require('./scrape');
const scraperTests = require('./tests');
const promoScraper = require('./logic/promotions');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/fashionscraper_dev')
  .then(async () => {
    logger.log('info', 'Connected to mongoDB!');
    
    try {
      await scraperTests.testAll();
      
      //await scrapers.scrapeAll();
      //await scrapers.scrapePromos();
      //await promoScraper.scrapeAllPromos();
      //mongoose.connection.close(); // throws error 'Topology was destroyed'
    } catch(error) {
      console.error('catch block error --> ', error);
      throw error;
    }
  }).catch((error) => {
    logger.log('error', 'Please make sure Mongodb is installed and running!');
    throw error;
  });


//(await scrapers.scrapeAll())();

/*setInterval(() => {
  logger.log('info', 'Logging \n');
}, 5000);*/


/*Product.create({name: 'first', price: '10'}, () => {
  console.log('Product created!');
});*/






