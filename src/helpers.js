

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const autoScroll = async (document, window) => {
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

const stringToNumber = (string) => {
  
}


module.exports = {
  sleep,
  autoScroll, 
};