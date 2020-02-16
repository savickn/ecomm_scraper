
const puppeteer = require('puppeteer');
const path = require('path');
const util = require('util');

const br = require('./logic/br');
const gap = require('./logic/gap');
const jcrew = require('./logic/jcrew');

const helpers = require('./logic/helpers');
const ProductController = require('../server/api/Product/product.controller');


const testAll = async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  await testBR(page);
  //await testGAP(page);
}

const testBR = async (page) => {
  const links = [
    'https://bananarepublic.gapcanada.ca/browse/product.do?cid=1113632&pcid=32643&vid=1&pid=488743003', // blazer (e.g. 40R/36S)
    'https://bananarepublic.gapcanada.ca/browse/product.do?cid=1113632&pcid=32643&vid=1&pid=512819003', // pants (e.g. 32x34)
    'https://bananarepublic.gapcanada.ca/browse/product.do?cid=1113632&pcid=32643&vid=1&pid=512819003', // shirts (e.g. S/M/L)
    // 'https://bananarepublic.gapcanada.ca/browse/product.do?cid=1146838&pcid=32643&vid=1&pid=488697003', // dress shirts (e.g. 15x36)
    // 'https://bananarepublic.gapcanada.ca/browse/product.do?cid=1146838&pcid=32643&vid=1&pid=488697003', // shoes (e.g. 9/12/etc)
    'https://bananarepublic.gapcanada.ca/browse/product.do?cid=1146838&pcid=32643&vid=1&pid=488697003', // oos product
    'https://bananarepublic.gapcanada.ca/browse/product.do?cid=1146838&pcid=32643&vid=1&pid=488697003', // non-existent link
  ];

  // scrape links from sale page
  const links = await br.scrapeBananaSale(page, 'BR');
  
  // scrape product data from links
  await scrapeProduct(page, links, br.scrapeBananaProduct);
}





module.exports = {
  testAll, 
};


