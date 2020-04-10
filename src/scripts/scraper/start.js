
const mongoose = require('mongoose');
const Winston = require('winston');
const redis = require('redis');

const redisClient = redis.createClient();

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
  .then(async (db) => {
    logger.log('info', 'Connected to mongoDB!');
    
    try {
      //await scraperTests.testAll();
      await scrapers.scrapeAll();
      
      //await scrapers.scrapePromos();
      //await promoScraper.scrapeAllPromos();
    } catch(error) {
      console.error('catch block error --> ', error);
      throw error;
    }

    process.exit(); // obv not ideal !!!
    //await db.disconnect();
    //mongoose.connection.close(); // throws error 'Topology was destroyed'

  }).catch((error) => {
    logger.log('error', 'Please make sure Mongodb is installed and running!');
    throw error;
  });



/*setInterval(() => {
  logger.log('info', 'Logging \n');
}, 5000);*/


module.exports = {
  redisClient, 
}



