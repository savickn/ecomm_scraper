
import AccountSagas from './components/User/AccountSagas';
import UserSagas from './components/User/UserSagas';
import ProductSagas from './components/Product/ProductSagas';

import AlertSagas from './components/Utility/Alert/alertSagas';

import { all } from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([
    ...AccountSagas,
    ...UserSagas, 
    ...AlertSagas,
    ...ProductSagas, 
  ])
}

