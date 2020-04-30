

//import redis_client from '../redis';
import Watch from '../../server/api/Watch/watch.model';
import { priceDropEmailer } from './sendEmailNotification';


// compare 'priceChecks' from Redis cache to watchlists and send email if necessary
export const checkWatchlists = async (client) => {
  try { 
    const l = await client.llen('priceChecks');
    console.log(l);

    while(await client.llen('priceChecks') > 0) {
      const p = JSON.parse(await client.lpop('priceChecks'));
      console.log('price --> ', p);
  
      const watches = await Watch.find({ productId: p.productId, targetPrice: { $gte: p.price }})
                                .populate('productId', 'url')
                                .populate('userId', 'email name')
      console.log('watches --> ', watches);
      
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
    }
  } catch(error) {
    console.error('checkWatchlists error --> ', error);
  }
}