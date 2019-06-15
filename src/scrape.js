
const puppeteer = require('puppeteer');
const path = require('path');
const util = require('util');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function autoScroll(document, window) {
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
    }, 400);
  });
};

const scrapeAll = async () => { }

const scrapeBR = async () => { }
const scrapeGAP = async () => { }
const scrapeON = async () => { }
const scrapeJC = async () => { }

const scrapeHomePage = async () => {
  
}

const scrapeSaleList = async () => {
  const salePageString = 'https://bananarepublic.gapcanada.ca/browse/category.do?cid=1014757';
  
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  page.on('console', msg => console.log(msg.text()));
  await page.goto(salePageString, {waitUntil: 'networkidle2'});
  //await sleep(2000);

  const result = await page.evaluate(async () => {
    let anchors = []; // collect product links
    var hasNextPage; // track pagination

    do {
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

  await browser.close();
}

const scrapeProductPage = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // used to capture 'console.log' events within 'evaluate'
  page.on('console', msg => {
    console.log(msg.text());
    /*for (let i = 0; i < msg.args().length; i++) {
      console.log(msg.args()[i]);
    }*/
  });
  //await page.goto('https://www.gapcanada.ca/browse/product.do?cid=1104127&pcid=5156&vid=1&pid=440994023');
  await page.goto('https://bananarepublic.gapcanada.ca/browse/product.do?cid=1077638&pcid=35878&vid=1&pid=266636123');
  
  /*const t = await page.$('h1.product-title');
  const p = await page.$('h5.product-price');
  const ps = await page.$('span.product-price--highlight');
  console.log('title --> ', t.toString());*/

  console.log('evaluating');
  const result = await page.evaluate(() => {
    console.log('evaluated');
    const title = document.querySelectorAll('h1.product-title')[0].textContent.trim();
    const price = document.querySelectorAll('h5.product-price')[0].textContent.trim();

    const priceString = document.querySelector('span.product-price--highlight').textContent.trim()
    console.log('\n priceString --> ', priceString);
    const isDiscounted = priceString.length > 0;
    console.log('\n isDiscounted --> ', isDiscounted);

    // represents all colors on the page
    let colors = [];

    // represents each section of colors (e.g. where each has its own specific price)
    const colorRadioContainers = [...document.querySelectorAll('div.swatch-price-group')];
    //console.log('radio containers --> ', JSON.stringify(colorRadioContainers));
    
    /*for(let c of colorRadioContainers) {
      console.log('container --> ', c);
      //console.log('container asElement --> ', c.asElement());
      console.log('container attrs --> ', JSON.stringify(c.attributes));

      const cJson = await c.jsonValue(); 
      console.log('container json --> ', cJson); 

      const cProps = await c.getProperties();
      console.log('container properties --> ', cProps);
    }; */
    
    for(let container of colorRadioContainers) {
      // represents price of that specific color
      const currentPrice = isDiscounted ? container.querySelector('div.product-price__highlight').textContent.trim() : price;
      console.log('\n currentPrice --> ', currentPrice);

      // represents each 'color' radio button in the current container
      const colorRadios = [...container.querySelectorAll('input.swatch__radio')];
      //console.log('color radios --> ', JSON.stringify(colorRadios));
      
      // represents colors from the current container
      let interColors = [];
      for(let cr of colorRadios) {
        const colorName = cr.getAttribute('value');
        cr.click(); // selects color

        let sizes = [];

        // add check for unavailable sizes
        const waistSection = document.getElementById('waist');
        //console.log('waistSection --> ', waistSection);

        /*console.log('waistSection attrs --> ', JSON.stringify(waistSection.attributes));
        const wsJson = await waistSection.jsonValue();
        console.log('waistSection json --> ', wsJson);
        const wsProperties = await waistSection.getProperties();
        console.log('waistSection properties --> ', wsProperties);*/

        const waistRadios = [...waistSection.querySelectorAll('input.swatches--radio')];
        //console.log('waistRadios --> ', waistRadios);

        for(let wr of waistRadios) {
          const waistSize = wr.getAttribute('value');
          wr.click();

          const lengthSection = document.getElementById('length');
          const lengthRadios = [...lengthSection.querySelectorAll('input.swatches--radio')]
          for(let lr of lengthRadios) {
            //console.log('lengthRadio --> ', lr);
            const parent = lr.parentElement;
            //console.log('parent --> ', parent);
            
            // check for 'svg.outofstock'
            const oos = parent.querySelector('svg.swatch--outOfStockIndicator');
            //console.log('oos svg --> ', oos);
            
            if(oos) {
              continue;
            };

            const lengthSize = lr.getAttribute('value');
            const size = waistSize + ' x ' + lengthSize;
            console.log('size --> ', size);
            sizes.push(size);
          };
        };
  
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
  })
  console.log('result --> ', result);

  /*const c = result.colors[4];
  console.log('\n \n ', c.colorName);
  c.sizes.forEach((size) => {
    console.log(size);
  });*/

  await browser.close();
}

scrapeSaleList();
//scrapeProductPage();

module.exports = {
  scrapeProductPage,
  scrapeHomePage,
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


  /* Sale List Logic */

  /*const p = await page.$('div.product-card');
  console.log('product --> ', p);
  console.log('product json --> ', await p.jsonValue());
  console.log('product string --> ', p.toString());
  console.log('product props --> ', await p.getProperties());*/