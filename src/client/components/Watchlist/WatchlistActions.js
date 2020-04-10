
export const FETCH_WATCHLIST_REQUEST = 'FETCH_WATCHLIST_REQUEST';
export const FETCH_WATCHLIST_SUCCESS = 'FETCH_WATCHLIST_SUCCESS';
export const FETCH_WATCHLIST_ERROR = 'FETCH_WATCHLIST_ERROR';

export const CREATE_WATCH_REQUEST = 'CREATE_WATCH_REQUEST';
export const CREATE_WATCH_SUCCESS = 'CREATE_WATCH_SUCCESS';
export const CREATE_WATCH_ERROR = 'CREATE_WATCH_ERROR';

export const DELETE_WATCH_REQUEST = 'DELETE_WATCH_REQUEST';
export const DELETE_WATCH_SUCCESS = 'DELETE_WATCH_SUCCESS';
export const DELETE_WATCH_ERROR = 'DELETE_WATCH_ERROR';


/* Create Watches */

export const createWatchRequest = (data) => {
  return {
    type: CREATE_WATCH_REQUEST,
    data
  }
}

export const createWatchSuccess = (watch) => {
  return {
    type: CREATE_WATCH_SUCCESS,
    watch, 
  }
}

/* Delete Watches */

export const deleteWatchRequest = (id) => {
  return {
    type: DELETE_WATCH_REQUEST,
    id
  }
}

export const deleteWatchSuccess = () => {
  return {
    type: DELETE_WATCH_SUCCESS, 
  }
}

/* Fetch Watchlist */

export const fetchWatchlistRequest = (userId) => {
  return {
    type: FETCH_WATCHLIST_REQUEST,
    userId, 
  }
}

export const fetchWatchlistSuccess = (watchlist) => {
  return {
    type: FETCH_WATCHLIST_SUCCESS,
    watchlist, 
  }
}






