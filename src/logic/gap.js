


const scrapeGapSale = async (page) => {
  const salePageString = 'https://www.gapcanada.ca/browse/category.do?cid=1065870&mlink=homepage,,flyout_men_Men_s_Sale&departmentRedirect=true#pageId=0&department=75'; 
  await page.goto(salePageString, {waitUntil: 'networkidle2'});

  const result = await page.evaluate(async () => {
    let anchors = []; // collect product links
    let hasNextPage; // track pagination

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


module.exports = {
  scrapeGapSale, 
}