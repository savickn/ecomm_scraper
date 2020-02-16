
import {  SEARCH_PRODUCTS_REQUEST,
          SEARCH_PRODUCTS_SUCCESS,
          SEARCH_PRODUCTS_ERROR } from './ProductActions';


const initialState = {
  status: 'IDLE',
  errors: null,
  data: [], 
  count: 0, 
};

const state = {
  status: 'IDLE',
  errors: {}, 
  data: {
    /* e.g. page1: {
      time: some_date,
      products: []
    },
    // only update data if 'pageSize' is updated or 'time' expires
    // check if this functionality should be moved to 'localStorage/indexedDB/etc'
    */ 
  }, 
  count: 0,
};


const ProductReducer = (state = initialState, action) => {
  switch(action.type) {
    case SEARCH_PRODUCTS_REQUEST:
      return {
        status: 'LOADING',
        data: [], 
        errors: state.errors, 
      }
    case SEARCH_PRODUCTS_SUCCESS:
      return {
        status: 'IDLE',
        errors: null,
        data: action.payload.products, 
        count: action.payload.count, 
      }
    case SEARCH_PRODUCTS_ERROR:
      return {
        status: 'ERROR',
        data: [], 
        errors: action.errors, 
      }
    default:
      return state;
  }
}

export const getStatus = (state) => state.products.status;
export const getProducts = (state) => state.products.data;
export const getErrors = (state) => state.products.errors;

export const getCount = (state) => state.products.count;

export default ProductReducer;

