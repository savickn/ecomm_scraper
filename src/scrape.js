
const puppeteer = require('puppeteer');
const path = require('path');
const util = require('util');

const { createProduct, updateProduct } = require('./models/Product/product.controller');


const test = async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  page.on('console', msg => console.log(msg.text()));

  const testBRShirt = 'https://bananarepublic.gapcanada.ca/browse/product.do?cid=1125294&pcid=1014757&vid=1&pid=427632003';
  const testBRBlazer = 'https://bananarepublic.gapcanada.ca/browse/product.do?cid=1014860&pcid=1014757&vid=1&pid=382921013';
  const testBRShorts = 'https://bananarepublic.gapcanada.ca/browse/product.do?cid=1091405&pcid=1014757&vid=1&pid=266619073';
  const testBRPants = 'https://bananarepublic.gapcanada.ca/browse/product.do?cid=1091405&pcid=1014757&vid=1&pid=876745283';

  //await scrapeProductPage(page, testBRShirt); // working on BR
  await scrapeProductPage(page, testBRBlazer); // 
  //await scrapeProductPage(page, testBRShorts); // mostly working on BR (except full price products)
  //await scrapeProductPage(page, testBRPants);

  await browser.close();
};

const scrapeAll = async () => { }

const scrapeBR = async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  page.on('console', msg => {
    console.log(msg.text());
    /*for (let i = 0; i < msg.args().length; i++) {
      console.log(msg.args()[i]);
    }*/
  });

  // scrape current promotions from home page


  // scrape links from sale page
  const links = await scrapeSaleList(page);

  // scrape price/colors/sizes from product pages
  for(let link of links) {
    // add 'sleep' between iterations
    let productData = await scrapeProductPage(page, url)
    // create Product entry in MongoDB for scraped product
  }
}
const scrapeGAP = async () => { }
const scrapeON = async () => { }
const scrapeJC = async () => { }


const scrapeSaleList = async (page) => {
  const salePageString = 'https://bananarepublic.gapcanada.ca/browse/category.do?cid=1014757'; 
  await page.goto(salePageString, {waitUntil: 'networkidle2'});

  const result = await page.evaluate(async () => {
    let anchors = []; // collect product links
    var hasNextPage; // track pagination

    do {
      // maybe add 'sleep' between iterations to avoid getting rate-limited

      // pagination logic
      const nextPage = document.querySelector("a.basic-pagination--button[title='next']");
      console.log('nextpage --> ', nextPage.className);
      for(let c of nextPage.classList) {
        console.log('class --> ', c);
      }
      hasNextPage = !nextPage.classList.contains('pagination-inactive');
      console.log('hasNextPage --> ', hasNextPage);

      // autoScrollPage logic
      await new Promise((resolve, reject) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
    
          if(totalHeight >= scrollHeight){
            clearInterval(timer);
            resolve();
          }
        }, 20);
      });

      // scraping logic
      const products = [...document.querySelectorAll('div.product-card')];
      console.log('# of products --> ', products.length);
      for(let p of products) {
        const anchor = p.querySelector('a');
        if(anchor) {
          console.log('product link --> ', anchor.href);
          anchors.push(anchor.href);
        }
      }

      //move to next page
      if(hasNextPage) {
        nextPage.click();
      }
    } while(hasNextPage);

    return anchors;
  });
  //console.log('result --> ', result);
  console.log('arr length --> ', result.length);
  return result; 
}

const scrapeProductPage = async (page, url) => {
  await page.goto(url);

  const result = await page.evaluate(() => {
    //try {
      // represents the product's name
      const title = document.querySelectorAll('h1.product-title')[0].textContent.trim();
      // represents the product's default price (usually full price unless all varieties are discounted)
      const stringPrice = document.querySelectorAll('h5.product-price')[0].textContent.trim();
      console.log('stringPrice --> ', stringPrice);
      const regex = /\d+\.\d+/;
      const numericPrice = Number.parseFloat(stringPrice.match(regex)[0]);
      console.log('numericPrice --> ', numericPrice);
      
      /*const priceString = document.querySelector('span.product-price--highlight').textContent.trim()
      console.log('\n priceString --> ', priceString);
      const isDiscounted = priceString.length > 0;
      console.log('\n isDiscounted --> ', isDiscounted);*/

      // represents all colors on the page
      let colors = [];

      // represents each section of colors (e.g. where each has its own specific price)
      const colorRadioContainers = [...document.querySelectorAll('div.swatch-price-group')];

      for(let container of colorRadioContainers) {
        // represents the element containing the discounted price
        const discountElement = container.querySelector('div.product-price__highlight');
        const discountedPrice = discountElement ? discountElement.textContent.trim() : null; 
        // represents price of that specific color
        const currentPrice = isDiscounted ? discountedPrice : price;
        console.log('\n currentPrice --> ', currentPrice);

        // represents each 'color' radio button in the current container
        const colorRadios = [...container.querySelectorAll('input.swatch__radio')];

        // represents colors from the current container
        let interColors = [];
        for(let cr of colorRadios) {
          const colorName = cr.getAttribute('value');
          cr.click(); // selects color

          // stores sizes for a particular color
          let sizes = [];

          // represents possible sections
          const chestSection = document.getElementById('chest');
          const waistSection = document.getElementById('waist');
          const sizeSection = document.getElementById('size');

          console.log('waist --> ', waistSection);
          console.log('chest --> ', chestSection);
          console.log('size --> ', sizeSection);

          if(sizeSection) {
            console.log('size branch');
            // represents size buttons (e.g. S/M/L)
            const sizeRadios = [...sizeSection.querySelectorAll('input.swatches--radio')];
            for(let sr of sizeRadios) {
              const size = sr.getAttribute('value');
              const parent = sr.parentElement;  
              const oos = parent.querySelector('svg.swatch--outOfStockIndicator');
                
              if(oos) {
                continue;
              };

              console.log('size --> ', size);
              sizes.push(size);
            };

          } else if(waistSection) {
            console.log('waist branch');
            // represents waist size buttons
            const waistRadios = [...waistSection.querySelectorAll('input.swatches--radio')];
            for(let wr of waistRadios) {
              const waistSize = wr.getAttribute('value');
              wr.click();

              // represents length size buttons
              const lengthSection = document.getElementById('length');
              const lengthRadios = [...lengthSection.querySelectorAll('input.swatches--radio')]
              for(let lr of lengthRadios) {
                // represents parent of radio button (used to select sibling)
                const parent = lr.parentElement;
                // check for 'svg.outofstock'
                const oos = parent.querySelector('svg.swatch--outOfStockIndicator');
                
                if(oos) {
                  continue;
                };

                const lengthSize = lr.getAttribute('value');
                const size = waistSize + ' x ' + lengthSize;
                console.log('size --> ', size);
                sizes.push(size);
              };
            };

          } else if(chestSection) {
            console.log('chest branch');
            // represents chest size buttons
            const chestRadios = [...chestSection.querySelectorAll('input.swatches--radio')];
            for(let cr of chestRadios) {
              const chestSize = cr.getAttribute('value');
              cr.click();

              // represents length size buttons
              const lengthSection = document.getElementById('length');
              const lengthRadios = [...lengthSection.querySelectorAll('input.swatches--radio')]
              for(let lr of lengthRadios) {
                const parent = lr.parentElement;
                const oos = parent.querySelector('svg.swatch--outOfStockIndicator');
                
                if(oos) {
                  continue;
                };

                const lengthSize = lr.getAttribute('value');
                const size = waistSize + ' x ' + lengthSize;
                console.log('size --> ', size);
                sizes.push(size);
              };
            };

          } else {
            console.info('Unknown Product! Unable to parse!');
          }
    
          interColors.push({
            colorName,
            colorPrice: currentPrice, 
            sizes,
          });
        };

        // merges colors from current container with the page-wide color collection
        colors = [...colors, ...interColors];
      };

      return {
        title,
        price,
        colors,  
      }; 
    /*} catch(err) {
      console.error(err);
      return err;
    }*/
  });
  console.log('result --> ', result);
  return result;
}

test();
//scrapeBR();
//scrapeSaleList();
//scrapeProductPage();

module.exports = {
  scrapeProductPage,
  //scrapeHomePage,
  scrapeSaleList, 
}


/* Product Page Logic */

//await page.screenshot({path: path.resolve('output', 'example.png')});
//await page.pdf({path: path.resolve('output', 'hn.pdf'), format: 'A4'});

/*const images = [...document.querySelectorAll('img.swatches--image')];
const imageNames = images.map((img) => {
  return img.getAttribute('alt');
})*/

  //const colorRadios = [...document.querySelectorAll('input.swatch__radio')];
  
  // should contain entries for each color and subcategories for price/sizes
  /*const colors = colorRadios.map((cr) => {
    const colorName = cr.getAttribute('value');
    cr.click();

    const sizeRadios = [...document.querySelectorAll('input.swatches--radio')]
    const sizes = sizeRadios.map((sr) => {
      return sr.getAttribute('value');  //sr.textContent.trim();
    })

    return {
      colorName,
      // colorPrice, 
      sizes, 
    };
  });*/

  /*const sizeRadios = [...document.querySelectorAll('input.swatches--radio')]
  const sizes = sizeRadios.map((sr) => {
    return sr.getAttribute('value');  //sr.textContent.trim();
  });*/

    /*const t = await page.$('h1.product-title');
  const p = await page.$('h5.product-price');
  const ps = await page.$('span.product-price--highlight');
  console.log('title --> ', t.toString());*/


  /*console.log('waistSection attrs --> ', JSON.stringify(waistSection.attributes));
        const wsJson = await waistSection.jsonValue();
        console.log('waistSection json --> ', wsJson);
        const wsProperties = await waistSection.getProperties();
        console.log('waistSection properties --> ', wsProperties);*/

  /*for(let c of colorRadioContainers) {
      console.log('container --> ', c);
      //console.log('container asElement --> ', c.asElement());
      console.log('container attrs --> ', JSON.stringify(c.attributes));

      const cJson = await c.jsonValue(); 
      console.log('container json --> ', cJson); 

      const cProps = await c.getProperties();
      console.log('container properties --> ', cProps);
    }; */

  /*const c = result.colors[4];
    console.log('\n \n ', c.colorName);
    c.sizes.forEach((size) => {
      console.log(size);
    });*/

  /* Sale List Logic */

  /*const p = await page.$('div.product-card');
  console.log('product --> ', p);
  console.log('product json --> ', await p.jsonValue());
  console.log('product string --> ', p.toString());
  console.log('product props --> ', await p.getProperties());*/