
export const FETCH_PRICES_REQUEST = 'FETCH_PRICES_REQUEST';
export const FETCH_PRICES_SUCCESS = 'FETCH_PRICES_SUCCESS';
export const FETCH_PRICES_ERROR = 'FETCH_PRICES_ERROR';

/* PRICE HISTORIES */

export function fetchPricesRequest(productId) {
  return {
    type: FETCH_PRICES_REQUEST,
    productId, 
  }
}

export function fetchPricesSuccess(prices, id) {
  return {
    type: FETCH_PRICES_SUCCESS,
    payload: {
      prices,
      id, 
    }
  }
}

export function fetchPricesError(errors) {
  return {
    type: FETCH_PRICES_ERROR,
    errors, 
  }
}
