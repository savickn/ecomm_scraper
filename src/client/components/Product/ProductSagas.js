
import { takeLatest, call, put, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import axios from '../../util/axiosCaller';
import { getDifferenceInDays } from '../../util/DateUtil';

import {
  SEARCH_PRODUCTS_REQUEST, FETCH_PRODUCT_REQUEST, 
  searchProductsSuccess, fetchProductSuccess, 
  searchProductsError, fetchProductError, 
} from './ProductActions'; 

import {
  FETCH_PRICES_REQUEST, 
  fetchPricesSuccess, 
  fetchPricesError, 
} from './PriceActions'; 


/* 
** localStorage/indexedDB logic
*/

/*
 product: {
  search: {fields}
  pages: {
    '12-1': {
      products: [],
      date
    }, 
    '12-2': {
      etc
    },
    etc
  }
 }
*/

// pagination (save each visited page)... reset all if new search
function checkLocalStorage(search, pagination) {
  const productData = JSON.parse(localStorage.getItem('product'));
  const pageString = `${pagination.pageSize}-${pagination.currentPage}`;
  
  // check if 'search' query is fresh
  const freshSearch = JSON.stringify(productData.search) === JSON.stringify(search);
  
  // check if pagination is fresh
  const page = productData.search.pages[pageString];
  const timeDiff = getDifferenceInDays(page.date.getTime(), Date.now().getTime())
  const freshPagination = page && (timeDiff < 1); 

  return {
    freshSearch, 
    freshPagination, 
  };
}


/*
** API Requests
*/

// get Products based on search criteria
function searchProducts(search={}, pagination={}) {
  return axios.get('api/products/', {
    params: {
      search,
      pagination, 
    }, 
  })
  .then((res) => res.data)
  .catch((err) => { throw err; })
}

// get PriceHistory for a specific Product... NOT WORKING/FINISHED
function fetchPrices(productId) {
  return axios.get()
    .then((res) => res.data)
    .catch((err) => { throw err; })
}

// get all data for specific Product
function fetchProduct(productId) {
  return axios.get(`/api/products/${productId}`)
    .then((res) => res.data)
    .catch((err) => { throw err; })
}

/* 
** SEARCH PRODUCTS 
*/

export function* searchProductsWatcher() {
  yield takeLatest(SEARCH_PRODUCTS_REQUEST, searchProductsHandler);
}

export function* searchProductsHandler(action) {
  try {
    //const { freshSearch, freshPagination } = checkLocalStorage(action.payload.search, action.payload.pagination);
    const res = yield call(searchProducts, action.payload.search, action.payload.pagination);
    console.log('fetchProducts res --> ', res);
    yield put(searchProductsSuccess(res.products, res.count));
  } catch(error) {
    console.log('fetchProducts error --> ', error);
    yield put(searchProductsError(error));
  }
}

/*
** GET PRODUCT
*/

export function* fetchProductWatcher() {
  yield takeLatest(FETCH_PRODUCT_REQUEST, fetchProductHandler);
}

export function* fetchProductHandler(action) {
  try {
    const res = yield call(fetchProduct, action.productId);
    console.log('fetchProduct res --> ', res);
    yield put(fetchProductSuccess(res.product));
  } catch(error) {
    console.log('fetchProduct error --> ', error);
    yield put(fetchProductError(error));
  }
}


/*
** GET PRICE HISTORY
*/

export function* fetchPricesWatcher() {
  yield takeLatest(FETCH_PRICES_REQUEST, fetchPricesHandler);
}

export function* fetchPricesHandler(action) {
  try {
    const res = yield call(fetchPrices, action.productId);
    console.log('fetchPrices res --> ', res);
    yield put(fetchPricesSuccess(res.prices, action.productId));
  } catch(error) {
    console.log('fetchPrices error --> ', error);
    yield put(fetchPricesError(error));
  }
}

/*
** Export Watchers
*/

export default [
  fork(searchProductsWatcher),
  fork(fetchProductWatcher), 
  //fork(fetchPricesWatcher),
];
