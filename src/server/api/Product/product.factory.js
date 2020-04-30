
import { Factory } from 'rosie'; 

const ProductFactory = new Factory()
  .sequence('id')
  .attr('url', 'https://bananarepublic.gapcanada.ca/browse/product.do?pid=473206033&cid=1014857&pcid=1014757')
  .attr('name', 'V-Neck Sweater')
  .attr('color', 'Mountain Blue')
  .attr('fullPrice', 100)
  .attr('currentPrice', 50) 
  .attr('outOfStock', false)
  .attr('pid', '473206033')
  .attr('pcid', '1014757')
  .attr('brand', 'BR')
  .attr('sizes', ['M', 'L'])
  //.attr('history', [])

export default ProductFactory;
