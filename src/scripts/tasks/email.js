import _ from 'lodash';
import path from 'path';

import nodemailer from 'nodemailer';
import { EmailTemplate } from 'email-templates-v2';

import config from  '../../server/config/environment/index';
import env from '../../server/config/local.env';

import * as root from '../scraper/start';

// create an email to notify User of a price drop for a watchlist Product
export const priceDropEmailer = (data /*resolve, reject*/) => {

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
      user: config.secrets.serverEmail,
      pass: config.secrets.emailPassword
    }
  });

  const templateDir = path.join(__dirname, '..', '..', 'server', 'templates', 'price-drop');
  const resetEmail = new EmailTemplate(templateDir);

  const templateData = { 
    ...data, 
    // userName --> 
    // productUrl --> e.g. graph page
    // vendorUrl --> e.g. GAP page
    // currentPrice --> 
    // targetPrice --> 
  };

  resetEmail.render(templateData, function (err, result) {
    console.log('reset email render', result);
    if(err) return reject(err);
    var mailOptions = {
      from: config.secrets.serverEmail,
      to: env.RECEIVER_EMAIL,
      //to: req.user.email,
      subject: 'A product in your watchlist is on sale!',
      text: result.text,
      html: result.html
    };

    transporter.sendMail(mailOptions, function(error, info){
      if(error) return reject(error);
      return resolve(info);
    });
  });
}

// check Watches
// can add DB entry when price drops (to schedule a check for that product)

export const checkWatchlists = (req, res) => {
  const priceDrops = root.redisClient.lrange('priceChecks', 0, -1); // gets entire list of { productId, newPrice } pairs from DB

  // while(root.redisClient.lpop())

  for(let p of priceDrops) {
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









