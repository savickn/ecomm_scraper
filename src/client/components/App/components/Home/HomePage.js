import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';


import styles from './HomePage.scss';

//import { getAccountStatus, getCurrentUser } from '../../../User/AccountReducer';

class HomePage extends React.Component {
  
  render() {
    return (
      <div>
        <div className={styles.red}>
          Welcome to TheSocialSpot. <span className='background_blue'>Please 'log in' above to get started. </span>
        </div>
        <Link to='/products'>Products</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    //authStatus: getAccountStatus(state),
    //currentUser: getCurrentUser(state),
  };
}

/*
HomePage.propTypes = {
  authStatus: PropTypes.string.isRequired,
};*/

HomePage.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(HomePage);
