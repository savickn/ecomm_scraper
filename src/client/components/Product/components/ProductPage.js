
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';

import { getProduct } from '../ProductReducer';
import { fetchProductRequest } from '../ProductActions';

import styles from './ProductPage.scss';


// used to filter color-specific data to display on ProductPage
function getActiveColor(product, color) {
  const activeColor = product.colors.filter(c => c.colorName === color)[0];
  console.log('getActiveColor --> ', activeColor);
  return activeColor;
}


// represents a router endpoint providing a detailed description of a single Product
class ProductPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //activeProduct --> which color to show image/sizes/graph for
      activeColor: {}, 
      data: {
        datasets: [{
          data: [10, 20, 30]
        }],
        labels: ['Jan 2020', 'Feb 2020', 'March 2020']
      },
    };
  }

  // make API calls
  componentDidMount() {
    console.log('productPage props --> ', this.props);
    console.log('productPage context --> ', this.context);
    this.props.dispatch(fetchProductRequest(this.props.match.params.pid));
  }

  /* Event Handlers */

  // select which product to draw graph
  selectColor = (e) => {
    console.log('selectColor --> ', e);
    const color = e.target.textContent;
    const activeColor = getActiveColor(this.props.product, color);
    this.setState({activeColor});
  }

  /* Render Logic */

  render() {
    const { product } = this.props;
    const { activeColor } = this.state;

    return (
      <React.Fragment>
        <div className='upper-section'>
          <div className='img-sidebar'>

          </div>

          <div className='price-size-color-info'>
            <div> Price: {activeColor.colorPrice} </div>
            <div className='colors'> 
              {product && product.colors.map((color) => {
                return (
                  <div onClick={this.selectColor}>{color.colorName}</div>
                )
              })}
            </div>
          </div>
        </div>

        <div className='graph-section'>
          <Line data={this.state.data} />
        </div>

        <div className='create-alerts-section'>

        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, dispatch) => {
  return {
    product: getProduct(state), 
    dispatch, 
  }
}

export default connect(mapStateToProps)(ProductPage);
