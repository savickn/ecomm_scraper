
import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

/*
** styles/assets
*/
import noPic from '../../../assets/no_image.png';
import styles from './ProductElement.scss';

class ProductElement extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    //console.log('productElement --> ', this.props.product);
    //console.log('productElement styles --> ', styles);

    const product = this.props.product;
    const { url, imageSrc, name, } = this.props.product.assets[0]; 
    const img = /*imageSrc ||*/ noPic;

    return product ? (
      <div className={styles.productFlexItem}>
        <img src={img} width='200' height='200' />
        <Link to={`products/${product._id}`}>{name}</Link>
        <a href={url}> Buy Now! </a>
      </div>
    ) : <div></div>;
  }
}

//<div>{product.originalPrice} <span>{product.currentPrice}</span></div>

ProductElement.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    assets: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string.isRequired, 
      currentPrice: PropTypes.string.isRequired, 
    })),    
  }).isRequired, 
}

export default ProductElement;
