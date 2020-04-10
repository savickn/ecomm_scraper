
import {
  FETCH_WATCHLIST_SUCCESS, 
} from './WatchlistActions';

const initialState = {
  data: [],
}

const WatchlistReducer = (state=initialState, action) => {
  switch(action.type) {
    case FETCH_WATCHLIST_SUCCESS:
      return {
        data: action.watchlist, 
      }
    default:
      return state;
  }
}

export const getWatchlist = (state) => state.watchlists.data;

export default WatchlistReducer;
