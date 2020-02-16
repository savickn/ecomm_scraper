
// registers sub-documents in the Redux Store (e.g. state.users, state.posts)
import app from './components/App/AppReducer';
import account from './components/User/AccountReducer';
import users from './components/User/UserReducer';
import products from './components/Product/ProductReducer';

import alerts from './components/Alert/alertReducer';
import modal from './components/Modal/modalReducer';

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
  modal, 
};

export default reducers;
