
import AccountSagas from './components/User/AccountSagas';
import UserSagas from './components/User/UserSagas';
import AlertSagas from './components/Alert/alertSagas';
import ProductSagas from './components/Product/ProductSagas';

import { all } from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([
    ...AccountSagas,
    ...UserSagas, 
    ...AlertSagas,
    ...ProductSagas, 
  ])
}

