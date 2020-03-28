
// registers sub-documents in the Redux Store (e.g. state.users, state.posts)
import app from './components/App/AppReducer';
import account from './components/User/AccountReducer';
import users from './components/User/UserReducer';
import products from './components/Product/ProductReducer';
import prices from './components/Product/PriceReducer';

import alerts from './components/Utility/Alert/alertReducer';
import modal from './components/Utility/Modal/modalReducer';

/*
** return list of Reducers which will be combined 
** via 'combineReducers'
*/
let reducers = {
  app,
  users,
  account,
  alerts, 
  products, 
  prices, 
  modal, 
};

export default reducers;
