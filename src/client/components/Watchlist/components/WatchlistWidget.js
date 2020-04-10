
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createWatchRequest } from '../WatchlistActions';
import { getCurrentUser } from '../../User/AccountReducer';

// allows user to add/remove Product from Watchlist
class WatchlistWidget extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      productId: '',
      targetPrice: '', 
    }

    this.priceRef = React.createRef();
  }


  // add a Product to the Watchlist
  createWatch = (e) => {
    let targetPrice = this.priceRef.current.value;
    let userId = this.props.currentUser._id;
    let productId = this.props.product._id;

    if(!targetPrice || !userId || !productId) {
      console.log('Invalid args for creating Watch');
      return;
    }

    const data = {
      targetPrice,
      userId,
      productId, 
    }

    console.log('data --> ', data);

    this.props.dispatch(createWatchRequest(data));
  };

  /* Render Logic */

  render() {
    if(!this.props.currentUser) {
      return (<div>You must log in to track products!</div>)
    }

    return (
      <React.Fragment>
        <div>
          <label>Target Price:</label>
          <input type="text" ref={this.priceRef} />
        </div>
        <button onClick={this.createWatch}>Track!</button>
      </React.Fragment>
    )
  }
}

WatchlistWidget.propTypes = {
  product: PropTypes.object.isRequired, 
}

function mapStateToProps(state) {
  return {
    currentUser: getCurrentUser(state), 
  }
}

export default connect(mapStateToProps)(WatchlistWidget);
