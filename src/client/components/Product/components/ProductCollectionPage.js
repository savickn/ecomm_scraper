
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/*
** Components
*/

import ProductElement from './ProductElement';
import SearchBar from '../../Utility/SearchBar/SearchBar';
import Pagination from '../../Utility/Pagination/Pagination';

/*
** Reducers
*/

import { getProducts, getErrors, getStatus, getCount } from '../ProductReducer';

/*
** Actions
*/

import { searchProductsRequest } from '../ProductActions';

/*
** used to show list of Products
*/
class ProductCollectionPage extends React.Component {

  sortingMap = {
    'Relevance': {},
    'Price (Low to High)': {},
    'Price (High to Low)': {},
    'Most Reduced': {},
    'Recently Reduced': {}, 
  }

  filters = [
    {
      name: 'Brand',
      type: 'checkbox',
      options: ['GAP', 'BR', 'ON', 'Jcrew', "Lands' End"]
    }, 
    {
      name: 'Category',
      type: 'checkbox',
      options: ['Sweater', 'Blazer', 'Jeans', 'Outerwear', ]
    }, 


    /*'Category',
    'Size',
    'Price',
    'All-Time-Low',
    '12-Week-Low'*/
  ]

  constructor(props) {
    super(props);
    this.state = {
      search: {}, // for custom products search
      pagination: {
        currentPage: 1,
        pageSize: 12, 
      }, 
    };
  }

  componentDidMount() {
    this.searchProducts(); // get products from DB
  }

  // send AJAX request to populate products
  searchProducts() {
    this.props.dispatch(searchProductsRequest(this.state.search, this.state.pagination));
  }



                                  /* Search Bar */

  // text-only search
  simpleSearch = (text) => {
    console.log('simpleSearch --> ', text);
    const searchObj = Object.assign({}, this.state.search, { name: text });
    const stateObj = Object.assign({}, this.state, {search: searchObj});
    this.setState(stateObj, () => {
      this.searchProducts();
    })
  }

  // custom search with more options
  advancedSearch = (query) => {
    console.log('advancedSearch --> ', query);
    this.setState({search: query}, () => {
      this.searchProducts();
    });
  }


                                  /* Pagination */

  // change pagination state then send AJAX request to repopulate products
  handlePaginationChange = (paginationState) => {
    this.setState({pagination: paginationState}, () => {
      this.searchProducts();
    });
  }

                                  /* UI METHODS */
  
  render() {


    return (
      <React.Fragment>
        <SearchBar id='productSearch' searchFunc={this.advancedSearch} filterMap={this.filters} sortingMap={this.sortingMap} />
        <div className='flex-grid'>
          {this.props.products.map((product) => {
            return <ProductElement product={product} key={product._id} />
          })}
        </div>
        <Pagination currentPage={this.state.pagination.currentPage} pageSize={this.state.pagination.pageSize} 
          collectionSize={this.props.count} changePagination={this.handlePaginationChange} />
      </React.Fragment>
    )
  }
}

ProductCollectionPage.propTypes = {
  /*products: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  })).isRequired, */
  dispatch: PropTypes.func.isRequired, 
}

const mapStateToProps = (state) => {
  return {
    status: getStatus(state), 
    products: getProducts(state), 
    errors: getErrors(state), 
    count: getCount(state), 
  };
}

export default connect(mapStateToProps)(ProductCollectionPage);


/* advSearch

name
minPrice
maxPrice
brand
category
size
color

all-time-low
10-week-low
recently-reduced

*/
