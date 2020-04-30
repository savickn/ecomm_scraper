
// used to run server-side tasks (e.g. scraping, db maintainence, emailing)

const mongoose = require('mongoose');
const Winston = require('winston');

const scrapers = require('./scraper/scrape');
const scraperTests = require('./scraper/tests');
const promoScraper = require('./scraper/logic/promotions');

import { checkWatchlists } from './tasks/priceDropTracker';
import { priceDropEmailer } from './tasks/sendEmailNotification';


const logger = Winston.createLogger({
  level: 'info',
  format: Winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new Winston.transports.File({ filename: 'error.log', level: 'error' }),
    new Winston.transports.File({ filename: 'combined.log' })
  ]
});

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/fashionscraper_dev')
  .then(async (db) => {
    logger.log('info', 'Connected to mongoDB!');
    console.log('Connected to MongoDB!');
    
    try {

      console.log('cli args --> ', process.argv);

      const r = await priceDropEmailer({
        userName: user.name,
        vendorUrl: product.url, 
      });
      console.log(r);

      //await scraperTests.testAll();
      //await scrapers.scrapeAll();

      //await test();
      //checkWatchlists();

      // should either schedule the 'checkPriceDrops' script or call it directly
      
      //await scrapers.scrapePromos();
      //await promoScraper.scrapeAllPromos();
    } catch(error) {
      console.error('catch block error --> ', error);
      throw error;
    }

    //process.exit(); // obv not ideal !!!
    //await db.disconnect();
    //mongoose.connection.close(); // throws error 'Topology was destroyed'

  }).catch((error) => {
    logger.log('error', 'Please make sure Mongodb is installed and running!');
    throw error;
  });

