
const puppeteer = require('puppeteer');
const path = require('path');
const util = require('util');

const scrapeHomePage = async () => {
  
}

const scrapeSaleList = async () => {

}

const scrapeProductPage = async () => {
  //console.log(util);



  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // used to capture 'console.log' events within 'evaluate'
  page.on('console', consoleObj => console.log(consoleObj.text()));
  //await page.goto('https://www.gapcanada.ca/browse/product.do?cid=1104127&pcid=5156&vid=1&pid=440994023');
  await page.goto('https://bananarepublic.gapcanada.ca/browse/product.do?cid=1077638&pcid=35878&vid=1&pid=266636123');

  console.log('evaluating');
  const result = await page.evaluate((util) => {
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
    //console.log('\n radio containers --> ', JSON.stringify(colorRadioContainers));
    colorRadioContainers.forEach((container) => {
      // represents price of that specific color
      const currentPrice = isDiscounted ? container.querySelector('div.product-price__highlight').textContent.trim() : price;
      console.log('\n currentPrice --> ', currentPrice);

      // represents each 'color' radio button in the current container
      const colorRadios = [...container.querySelectorAll('input.swatch__radio')];
      //console.log('\n color radios --> ', JSON.stringify(colorRadios));

      // represents colors from the current container
      let interColors = colorRadios.map((cr) => {
        const colorName = cr.getAttribute('value');
        cr.click(); // selects color

        let sizes = [];

        // add check for unavailable sizes
        const waistSection = document.getElementById('waist');
        console.log('waistSection --> ', waistSection);
        const waistRadios = [...waistSection.querySelectorAll('swatches--radio')];
        console.log('waistRadios --> ', waistRadios);

        waistRadios.forEach((wr) => {
          const waistSize = wr.getAttribute('value');
          wr.click();

          const lengthSection = document.getElementById('length');
          //console.log('lengthSection --> ', lengthSection.asElement());
          const lengthRadios = [...lengthSection.querySelectorAll('swatches--radio')].filter((lr) => {
            // check for 'svg.outofstock'
            const siblingSpan = lr.nextSibling();
            console.log('sibling classname --> ', siblingSpan.className);
            console.log('sibling classlist --> ', siblingSpan.classList);
            
            if(siblingSpan.classList.contains('swatches--unavailable')) {
              return;
            }

            const lengthSize = lr.getAttribute('value');
            const size = waistSize + ' x ' + lengthSize;
            sizes.push(size);
          });
          //console.log('lengthRadios --> ', lengthRadios);
        });
        
        /*const sizeRadios = [...document.querySelectorAll('input.swatches--radio')]
        const sizes = sizeRadios.map((sr) => {
          return sr.getAttribute('value');  //sr.textContent.trim();
        });*/
  
        return {
          colorName,
          colorPrice: currentPrice, 
          sizes, 
        };
      });

      // merges colors from current container with the page-wide color collection
      colors = [...colors, ...interColors];
    });

    return {
      title,
      price,
      colors,  
    }; 
  }, util)
  console.log('result --> ', result);

  const c = result.colors[4];
  console.log('\n \n ', c.colorName);
  c.sizes.forEach((size) => {
    console.log(size);
  });

  await browser.close();
}

scrapeProductPage();

module.exports = {
  scrapeProductPage,
  scrapeHomePage,
  scrapeSaleList, 
}


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