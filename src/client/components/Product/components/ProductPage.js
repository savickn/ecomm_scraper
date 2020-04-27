
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import WatchlistWidget from '../../Watchlist/components/WatchlistWidget';
import ProductGraph from './ProductGraph';

import { getProduct } from '../ProductReducer';
import { fetchProductRequest } from '../ProductActions';

import styles from './ProductPage.scss';

import noPic from '../../../assets/no_image.png';


// used to filter color-specific data to display on ProductPage
function getActiveProduct(products, color) {
  const activeProduct = products.filter(p => p.color === color)[0];
  console.log('getActiveProduct --> ', activeProduct);
  return activeProduct;
}

// represents a router endpoint providing a detailed description of a single Product
class ProductPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeProduct: {}, 
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
      this.setState({activeProduct: this.props.products[0]})
    }
  }


  /* Event Handlers */

  // select which product to draw graph
  selectColor = (e) => {
    //console.log('selectColor --> ', e);
    const color = e.target.textContent;
    const activeProduct = getActiveProduct(this.props.products, color);
    this.setState({activeProduct});
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
            <a href={activeProduct.url}> Buy Now! </a>
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
          <ProductGraph product={activeProduct} />
        </div>

        <div className='create-alerts-section'>
          <WatchlistWidget product={activeProduct} />
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
