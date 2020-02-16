
import { takeLatest, call, put, fork } from "redux-saga/effects";
import { push } from 'connected-react-router';

import axios from '../../util/axiosCaller';
import { getDifferenceInDays } from '../../util/DateUtil';

import {
  SEARCH_PRODUCTS_REQUEST,
  searchProductsSuccess, 
  searchProductsError, 
} from './ProductActions';


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

function fetchProducts(search={}, pagination={}) {
  return axios.get('api/products/', {
    params: {
      search,
      pagination, 
    }, 
  })
  .then((res) => res.data)
  .catch((err) => { throw err; })
}

/* 
** SEARCH PRODUCTS 
*/

export function* fetchProductsWatcher() {
  yield takeLatest(SEARCH_PRODUCTS_REQUEST, fetchProductsHandler);
}

export function* fetchProductsHandler(action) {
  try {
    //const { freshSearch, freshPagination } = checkLocalStorage(action.payload.search, action.payload.pagination);
    const res = yield call(fetchProducts, action.payload.search, action.payload.pagination);
    console.log('fetchProducts res --> ', res);
    yield put(searchProductsSuccess(res.products, res.count));
  } catch(error) {
    console.log('fetchProducts error --> ', error);
    yield put(searchProductsError(error));
  }
}

/*
** Export Watchers
*/

export default [
  fork(fetchProductsWatcher),
];
