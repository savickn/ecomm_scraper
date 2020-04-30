
import { Factory } from 'rosie'; 

const WatchFactory = new Factory()
  .sequence('id')
  .attr('userId')
  .attr('productId')
  .attr('shouldEmail', true)
  .attr('targetPrice', 50)

export default WatchFactory;
