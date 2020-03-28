
export const SEARCH_PRODUCTS_REQUEST = 'SEARCH_PRODUCTS_REQUEST';
export const SEARCH_PRODUCTS_SUCCESS = 'SEARCH_PRODUCTS_SUCCESS';
export const SEARCH_PRODUCTS_ERROR = 'SEARCH_PRODUCTS_ERROR';

export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_ERROR = 'FETCH_PRODUCT_ERROR';

/* PRODUCT COLLECTION */

export function searchProductsRequest(searchArgs, pageArgs) {
  return {
    type: SEARCH_PRODUCTS_REQUEST,
    payload: {
      search: searchArgs,
      pagination: pageArgs, 
    }
  }
}

export function searchProductsSuccess(products, count) {
  return {
    type: SEARCH_PRODUCTS_SUCCESS,
    payload: {
      products, 
      count,
    } 
  }
}

export function searchProductsError(error) {
  return {
    type: SEARCH_PRODUCTS_ERROR,
    error, 
  }
}

/* INDIVIDUAL PRODUCTS */

export function fetchProductRequest(productId) {
  return {
    type: FETCH_PRODUCT_REQUEST,
    productId, 
  }
}

export function fetchProductSuccess(product) {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    product, 
  }
}

export function fetchProductError(error) {
  return {
    type: FETCH_PRODUCT_ERROR,
    error, 
  }
}





