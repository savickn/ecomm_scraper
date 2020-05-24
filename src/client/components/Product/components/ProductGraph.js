
import React from 'react';
import PropTypes from 'prop-types';
import { Line, Bar, } from 'react-chartjs-2';


const msPerMinute = 1000 * 60;
const msPerHour = msPerMinute * 60;
const msPerDay = msPerHour * 24;
const msPerYear = msPerDay * 365;


// used to calculate timeframe
function getTimeframe(max, min) {
  //const max = Math.max(...dates.map(d => d.getTime()));
  //const min = Math.min(...dates.map(d => d.getTime()));
  const rangePerDay = (max - min) / msPerDay;
  console.log('getTimeframe range --> ', rangePerDay);

  if(rangePerDay >= 1080) {
    return 'year';
  } else if(rangePerDay >= 360) {
    return 'quarter';
  } else if(rangePerDay >= 90) {
    return 'month';
  } else if(rangePerDay >= 21) {
    return 'week';
  } else {
    return 'day';
  }
}


// used to manage graph data
class ProductGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphOptions: {
        elements: {
          line: {
              tension: 0
          }
        },
        legend: {
          display: false, 
        },
        scales: {
          xAxes: [{
            type: 'time', // use time as the unit on the X-axis
            time: {
                unit: 'month'
            },
            gridLines: {
              display: false, // hide gridlines
            }, 
          }],
          yAxes: [{
            gridLines: {
              display:false
            }, 
          }]
        }
      },
 
      data: { },
    };
  }

  // set initial graph (for testing purposes)
  componentDidMount() {
    const data = {
      datasets: [{
        data: [60, 70, 45, 60, 70, 60, 80, 30, 55, 85, 82, 75]
      }],
      labels: [
        new Date('December 17, 2019'), new Date('December 21, 2019'), new Date('December 29, 2019'), 
        new Date('January 2, 2020'), new Date('January 6, 2020'), new Date('January 8, 2020'),
        new Date('January 11, 2020'), new Date('January 12, 2020'), new Date('January 19, 2020'), 
        new Date('February 5, 2020'), new Date('February 9, 2020'), new Date('March 15, 2020'),
      ]
      //labels: ['Jan 2020', '', 'Feb 2020', '', 'March 2020', '', 'April 2020', '', 'May 2020', '', 'June 2020', ''],
    };

  const prices = data.datasets[0].data.map((p, idx) => { 
    return {price: p, date: data.labels[idx]}; 
  });

  this.createDataset(prices);
  }

  // call 'createDataset' if 'props.product' is changed
  componentDidUpdate(prevProps, prevState) {
    if(this.props.product && prevProps.product !== this.props.product) {
      this.createDataset(this.props.product.history);
    }
  }


  // determine Tick size/range for Y-axis
  setYTicks = (prices) => {
    console.log('setYTicks prices --> ', prices);

    const max = Math.max(...prices);
    const min = Math.min(...prices);
    
    const minmaxDiff = max - min;
    let variance = 0.2 * minmaxDiff;

    if(variance < 10) {
      variance = 10;
    }

    const yMin = Math.abs(min - variance);
    const yMax = max + variance;

    return {
      max: yMax,
      min: yMin, 
    };
  }

  // determine Tick size/range for X-axis 
  setXTicks = (times) => {
    console.log('setXTicks times --> ', times);

    const max = Math.max(...times);
    const min = Math.min(...times);

    return getTimeframe(max, min);
  } 

  // used to create dataset for Graph.js from Product
  // WORKING 
  createDataset = (prices) => {
    const data = [];
    const labels = [];

    let prevPrice; // used to set line during changes

    for(let p of prices) {
      const time = new Date(p.date).getTime();

      // set endpoint of previous Price
      if(prevPrice) {
        data.push(prevPrice);
        labels.push(time - 1);
        prevPrice = p.price; // track previous data point
      } else {
        prevPrice = p.price;
      }

      data.push(p.price);
      labels.push(time);
    };

    // add point for today
    data.push(prevPrice);
    labels.push(new Date().getTime());

    let dataset = {
      datasets: [{
        data, 
      }],
      labels, 
    };
    console.log('createDataset --> ', dataset);

    const xTicks = this.setXTicks(labels);
    const yTicks = this.setYTicks(data);

    console.log('yScale --> ', xTicks);

    const graphOptions = this.state.graphOptions;
    graphOptions.scales.yAxes[0].ticks = yTicks;
    graphOptions.scales.xAxes[0].time.unit = xTicks;

    this.setState({
      graphOptions, 
      data: dataset, 
    });
  }


  render() {
    return (
      <React.Fragment>
        <Line data={this.state.data} options={this.state.graphOptions} />
      </React.Fragment>
    )
  }

}

ProductGraph.propTypes = {
  product: PropTypes.object.isRequired, 
}

export default ProductGraph;



// // used to analyze dataset and update 'this.state' accordingly
// analyzeDataset = () => {
//   const data = this.state.data.datasets[0].data;
//   const labels = this.state.data.labels;

//   const min = Math.min(...data);
//   const max = Math.max(...data);
//   const timeframe = getTimeframe(labels);

//   const minmaxDiff = max - min;
//   const variance = 0.2 * minmaxDiff;

//   this.setState({
//     options: {
//       timeframe,
//       min: Math.abs(min - variance), 
//       max: max + variance, 
//     }
//   })
// }



// 
            /*ticks: {
              callback: (value, index, values) => {
                console.log('ticks values --> ', values);

                const d = new Date(value);
                

                // assumes there is a value for every single day

                // Yearly --> only show January 1st of each year
                /*if(d.getDate() === 1 && d.getMonth() === 0) {
                  return d.toDateString();
                }*/

                // Monthly --> only show January 1st of each year
                /*if(d.getDate() === 1) {
                  return d.toDateString();
                }*/
              /*}
            }*/