
const puppeteer = require('puppeteer');

const jcrew = require('./logic/jcrew');
const br = require('./logic/br');
const gap = require('./logic/gap');

// working
const testJcrew = async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  page.on('console', msg => console.log(msg.text()));

  const testJcrewShirt = 'https://www.jcrew.com/ca/p/mens_category/sweaters/pullover/cotton-crewneck-sweater-in-garter-stitch/H6060?bmUID=mJIo.G.&bmLocale=en_CA';
  const testJcrewShoes = 'https://www.jcrew.com/ca/p/mens_category/shoes_sneakers/oxford/oar-stripe-italian-leather-derbys/J8989?sale=true&isFromSale=true&color_name=burnished-sienna';
  const testJcrewPants = 'https://www.jcrew.com/ca/p/mens_category/denim_jeans/straight770/770-straightfit-stretch-jean-in-dark-evening-wash/J5233?sale=true&isFromSale=true&color_name=dark-evening-wash';

  await jcrew.scrapeJcrewSale(page);
  await jcrew.scrapeJcrewProduct(page, testJcrewShirt);
  await jcrew.scrapeJcrewProduct(page, testJcrewShoes); 
  await jcrew.scrapeJcrewProduct(page, testJcrewPants); 

  await browser.close();
};

// working
const testBR = async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  page.on('console', msg => console.log(msg.text()));

  const testBRShirt = 'https://bananarepublic.gapcanada.ca/browse/product.do?cid=1125294&pcid=1014757&vid=1&pid=427632003';
  const testBRBlazer = 'https://bananarepublic.gapcanada.ca/browse/product.do?cid=1014860&pcid=1014757&vid=1&pid=382921013';
  const testBRShorts = 'https://bananarepublic.gapcanada.ca/browse/product.do?cid=1091405&pcid=1014757&vid=1&pid=266619073';
  const testBRPants = 'https://bananarepublic.gapcanada.ca/browse/product.do?cid=1091405&pcid=1014757&vid=1&pid=876745283';

  await br.scrapeBananaSale(page, 'BR');
  await br.scrapeBananaProduct(page, testBRShirt); // working on BR
  await br.scrapeBananaProduct(page, testBRBlazer); // working on BR
  await br.scrapeBananaProduct(page, testBRShorts); // mostly working on BR (except full price products)
  await br.scrapeBananaProduct(page, testBRPants); // working on BR

  await browser.close();
};

// working
const testGap = async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  page.on('console', msg => console.log(msg.text()));

  const testGapShirt = 'https://www.gapcanada.ca/browse/product.do?pid=443681003&rrec=true&mlink=5050,12413545,GAPcategory1_rr_1&clink=12413545';
  const testGapPants = 'https://www.gapcanada.ca/browse/product.do?cid=1063638&pcid=1065870&vid=1&pid=320802083';

  await br.scrapeBananaSale(page, 'GAP');
  await br.scrapeBananaProduct(page, testGapShirt); 
  await br.scrapeBananaProduct(page, testGapPants); 

  await browser.close();
};

//testBR();
//testGap();
//testJcrew();
