
const puppeteer = require('puppeteer');
const path = require('path');

const scrapeHomePage = async () => {
  
}

const scrapeSaleList = async () => {

}

const scrapeProductPage = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //await page.goto('https://www.gapcanada.ca/browse/product.do?cid=1104127&pcid=5156&vid=1&pid=440994023');
  await page.goto('https://bananarepublic.gapcanada.ca/browse/product.do?cid=1117283&pcid=35878&vid=2&pid=266636113');

  console.log('evaluating');
  const result = await page.evaluate(() => {
    console.log('evaluated');
    const title = document.querySelectorAll('h1.product-title')[0].textContent.trim();
    const price = document.querySelectorAll('h5.product-price')[0].textContent.trim();

    const priceString = document.querySelector('span.product-price--highlight').textContent.trim()
    console.log('priceString --> ', priceString);
    const isDiscounted = priceString.length > 0;

    // represents each section of colors (e.g. where each has its own specific price)
    const colorRadioContainers = [];

    const colorRadios = [...document.querySelectorAll('input.swatch__radio')];
    
    // should contain entries for each color and subcategories for price/sizes
    const colors = colorRadios.map((cr) => {
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
    });

    return {
      title,
      price,
      colors,  
    }; 
  })
  console.log('result --> ', result);

  const c = result.colors[4];
  console.log('\n \n ', c.colorName);
  c.sizes.forEach((size) => {
    console.log(size);
  });

  await browser.close();
}

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
