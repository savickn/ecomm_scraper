
export const SEARCH_PRODUCTS_REQUEST = 'SEARCH_PRODUCTS_REQUEST';
export const SEARCH_PRODUCTS_SUCCESS = 'SEARCH_PRODUCTS_SUCCESS';
export const SEARCH_PRODUCTS_ERROR = 'SEARCH_PRODUCTS_ERROR';

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



