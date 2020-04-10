
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';

import WatchlistWidget from '../../Watchlist/components/WatchlistWidget';

import { getProduct } from '../ProductReducer';
import { fetchProductRequest } from '../ProductActions';

import styles from './ProductPage.scss';

import noPic from '../../../assets/no_image.png';
//import { isEmpty } from '../../../util/utilFuncs';


const minutes = 1000 * 60;
const hours = minutes * 60;
const days = hours * 24;
const years = days * 365;


// used to filter color-specific data to display on ProductPage
function getActiveProduct(products, color) {
  const activeProduct = products.filter(p => p.color === color)[0];
  console.log('getActiveProduct --> ', activeProduct);
  return activeProduct;
}

// used to calculate timeframe
function getTimeframe(dates) {
  const max = Math.max(...dates.map(d => d.getTime()));
  const min = Math.min(...dates.map(d => d.getTime()));
  const range = max - min;

  switch(range) {
    case range / years >= 3:
      return 'Yearly';
    case range / years >= 1:
      return 'Quarterly';
    case range / days >= 60:
      return 'Monthly';
    case range / days >= 14:
      return 'Weekly';
    default: 
      return 'Daily';
  }
}

// getMonthlyLabels
// getYearlyLabels


// represents a router endpoint providing a detailed description of a single Product
class ProductPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeProduct: {}, 

      options: {
        timeframe: '', // --> can be daily, monthly, quarterly, yearly.... depending on how much data is available
          // >3 years... use yearly
          // 1-3 years... use quarterly
          // >2 months... use monthly
          // >2 weeks... use weekly
          // <2 weeks... use daily
        max: '', // --> aka all-time-high, highest value in dataset
        min: '', // --> aka all-time low, lowest value in dataset
      },

      graphOptions: {
        legend: {
          display: false, 
        },
        scales: {
          xAxes: [{
              gridLines: {
                  display:false
              }, 
              ticks: {
                callback: (value, index, values) => {
                  console.log('ticks values --> ', values);
                  

                }
              }
          }],
          yAxes: [{
              gridLines: {
                  display:false
              }, 
              ticks: {
                max: 100,
                min: 0,
              }
          }]
        }
      },

      //data: {}, 
      data: {
        datasets: [{
          data: [60, 70, 45, 60, 70, 60]
        }],
        labels: [
          new Date('December 17, 2019'), new Date('December 21, 2019'), new Date('December 29, 2019'), 
          new Date('January 2, 2020'), new Date('January 19, 2020'), new Date('February 5, 2020'),
        ]
        //labels: ['Jan 2020', '', 'Feb 2020', '', 'March 2020', '', 'April 2020', '', 'May 2020', '', 'June 2020', ''],
      },
    };
  }

  // make API calls
  componentDidMount() {
    this.props.dispatch(fetchProductRequest(this.props.match.params.pid));
  }

  // set initial activeProduct
  componentDidUpdate(prevProps, prevState) {
    // working, but hide to work with Graph
    if(!prevState.activeProduct.currentPrice && this.props.products.length > 0) {
      /*this.setState({activeProduct: this.props.products[0]}, () => {
        this.createDataset();
      })*/
    }
  }

  // used to analyze dataset and update 'this.state' accordingly
  analyzeDataset = () => {
    const data = this.state.data.datasets[0].data;
    const labels = this.state.data.labels;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const timeframe = getTimeframe(labels);

    const minmaxDiff = max - min;
    const variance = 0.2 * minmaxDiff;

    this.setState({
      options: {
        timeframe,
        min: Math.abs(min - variance), 
        max: max + variance, 
      }
    })
  }

  // determine Tick size/range for Y-axis
  setYTicks = () => {

  }

  // determine Tick size/range for X-axis 
  setXTicks = () => {

  } 

  // used to create dataset for Graph.js from Product
  createDataset = () => {
    const prices = this.state.activeProduct.history;

    const data = [];
    const labels = [];

    let prevPrice; // used to set line during changes

    for(let p of prices) {
      const time = new Date(p.date).getTime();

      // set endpoint of previous Price
      if(prevPrice) {
        data.push(prevPrice);
        labels.push("")
      }

      data.push(p.price);
      labels.push(time);
    };

    let dataset = {
      datasets: [{
        data, 
      }],
      labels, 
    };
    console.log('createDataset --> ', dataset);

    this.setState({
      data: dataset, 
    });
  }

  /* Event Handlers */

  // select which product to draw graph
  selectColor = (e) => {
    //console.log('selectColor --> ', e);
    const color = e.target.textContent;
    const activeProduct = getActiveProduct(this.props.products, color);
    this.setState({activeProduct}, () => {
      this.createDataset();
    });
  }

  /* Render logic */

  render() {
    const { products } = this.props;
    const { activeProduct } = this.state; // will always be at least {}

    return (
      <React.Fragment>
        <div className={styles.infoContainer}>
          <div className={styles.imageSidebar}>
            <img src={noPic} width="150" height="150" />
            <div> Price: {activeProduct.currentPrice} </div>
          </div>

          <div className={styles.info}>
            <div className='colors'> 
              {products && products.map((p) => {
                return (
                  <div onClick={this.selectColor}>{p.color}</div>
                )
              })}
            </div>
            <div className='sizes'>
              {activeProduct.sizes && activeProduct.sizes.map((size) => {
                return (
                  <div>{size}</div>
                )
              })}
            </div>
          </div>
        </div>

        <div className='graph-section'>
          <Line data={this.state.data} options={this.state.graphOptions} />
        </div>

        <div className='create-alerts-section'>
          <WatchlistWidget product={this.state.activeProduct} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, dispatch) => {
  return {
    products: getProduct(state), // will always return at least []
    dispatch, 
  }
}

export default connect(mapStateToProps)(ProductPage);
