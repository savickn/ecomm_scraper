
import { Factory } from 'rosie'; 

const PriceFactory = new Factory()
  .sequence('id')
  .attr('date', new Date('Feb 20, 2020'))
  .attr('price', 65)
  .attr('productId')

export default PriceFactory;

