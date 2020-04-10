
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchWatchlistRequest, deleteWatchRequest, } from '../WatchlistActions';

import { getWatchlist } from '../WatchlistReducer';
import { getCurrentUser } from '../../User/AccountReducer';

// displays a User's Watchlist
class WatchlistPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if(this.props.currentUser) {
      this.props.dispatch(fetchWatchlistRequest(this.props.currentUser._id));
    }
  }

  /* Event handlers */

  // remove a Product from the Watchlist
  removeProduct = (e) => {
    
  }
  
  /* Render logic */

  render() {
    const { watchlist } = this.props;
    console.log(watchlist);

    return (
      <div className="watchlistContainer">
        {watchlist && watchlist.map((w) => {
          const { url, name, currentPrice, color, imageSrc, } = w.productId;
          return (
            <div className="watch">
              Product: {name}
              Color: {color}
              Current Price: {currentPrice}
              Target Price: {w.targetPrice}
              <a href={url}> Buy Now! </a>
            </div>
          );
        })}
      </div>
    )
  }
}

WatchlistPage.propTypes = {

}

function mapStateToProps(state) {
  return {
    currentUser: getCurrentUser(state), 
    watchlist: getWatchlist(state), 
  }
}

export default connect(mapStateToProps)(WatchlistPage);
