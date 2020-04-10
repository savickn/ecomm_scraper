
import React from 'react';
import { Route, Switch } from 'react-router-dom';

//import ProtectedRoute from './components/ProtectedRoute/protectedRoute';

import HomePage from './components/App/components/Home/HomePage';
import ProductCollectionPage from './components/Product/components/ProductCollectionPage';
import ProductPage from './components/Product/components/ProductPage';
import LoginPage from './components/User/pages/UserLoginPage/UserLoginPage';
import SignUpPage from './components/User/pages/UserCreatePage/UserCreatePage';

import ProfilePage from './components/User/pages/UserProfilePage/UserProfilePage';
import WatchlistPage from './components/Watchlist/components/WatchlistPage';

export default (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/products" component={ProductCollectionPage} />
    <Route path="/products/:pid" component={ProductPage} />

    <Route path="/users/new" component={SignUpPage} />
    <Route path="/users/login" component={LoginPage} />
    <Route path="/users/profile" component={ProfilePage} />
    <Route path="/users/watchlist" component={WatchlistPage} />
  </Switch>
)

/*
<Route path="/users/login" component={LoginPage} />
<Route path="/users/new" component={SignUpPage} />
<ProtectedRoute path="/users/:userId" component={ProfilePage} />
*/

/*
<ProtectedRoute path="/modalwizard" component={ModalWizardPage} role='admin' />
<ProtectedRoute path="/stylesTest" component={StylesTest} role='admin' />
*/

