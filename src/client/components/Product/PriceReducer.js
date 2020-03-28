
import {
  FETCH_PRICES_REQUEST,
  FETCH_PRICES_SUCCESS, 
  FETCH_PRICES_ERROR, 
} from './PriceActions';


const initialState = {
  status: 'IDLE', 
  productId: null,
  data: [],
  errors: null,
};

const PriceReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_PRICES_REQUEST:
      return Object.assign({}, state, {
        status: 'BUSY',
        errors: null, 
      });
    case FETCH_PRICES_SUCCESS:
      return Object.assign({}, state, {
        status: 'IDLE',
        productId: action.payload.id,
        prices: action.payload.prices,  
      });
    case FETCH_PRICES_ERROR:
      return Object.assign({}, state, {
        status: 'IDLE',
        errors: action.errors,
      });
    default: 
      return state;
  }
}

export const getPrices = (state) => state.prices.data; 

export default PriceReducer;
