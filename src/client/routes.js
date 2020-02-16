
import React from 'react';
import { Route, Switch } from 'react-router-dom';

//import ProtectedRoute from './components/ProtectedRoute/protectedRoute';

import HomePage from './components/App/components/Home/HomePage';
import ProductCollectionPage from './components/Product/components/ProductCollectionPage';
//import LoginPage from './components/User/pages/UserLoginPage/UserLoginPage';
//import SignUpPage from './components/User/pages/UserCreatePage/UserCreatePage';
//import ProfilePage from './components/User/pages/UserProfilePage/UserProfilePage';


export default (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/products" component={ProductCollectionPage} />
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

