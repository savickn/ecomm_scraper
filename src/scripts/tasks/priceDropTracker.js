

import redis_client from '../redis';
import Watch from '../../server/api/Watch/watch.model';
import { priceDropEmailer } from './email';


// import Price from '../../server/api/PriceHistory/price.model';
// import Product from '../../server/api/Product/product.model';

// export const test = async () => {
//   try {
//     const 


//   } catch(err) {
//     console.error('test err --> ', err);
//   }
// }


// compare 'priceChecks' from Redis cache to watchlists and send email if necessary
export const checkWatchlists = () => {

  while(redis_client.llen('priceChecks') > 0) {
    const p = redis_client.lpop('priceChecks');

    Watch.find({ productId: p.productId, targetPrice: { $gte: p.price }})
      .populate('productId', 'url')
      .populate('userId', 'email name')
      .then(watches => {
        console.log('checkWatches --> ', watches);
        for(let w of watches) {
          if(w.shouldEmail) {

            // queue email task
            priceDropEmailer({
              userName: w.userId.name, 
              email: w.userId.email, 
              //productUrl
              vendorUrl: w.productId.url,
              targetPrice: w.targetPrice,
              currentPrice: p.price,  
            });
            //return new Promise(priceDropEmail)
          }
        }
      })
      .catch(err => {
        console.error(err);
      })
  }
}