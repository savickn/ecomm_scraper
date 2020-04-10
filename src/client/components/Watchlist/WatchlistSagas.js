
import { put, call, takeLatest, fork, } from 'redux-saga/effects';

import axios from '../../util/axiosCaller';

import {
  CREATE_WATCH_REQUEST, DELETE_WATCH_REQUEST, FETCH_WATCHLIST_REQUEST, 
  createWatchSuccess, deleteWatchSuccess, fetchWatchlistSuccess, 
} from './WatchlistActions';

/* API requests */

function fetchWatchlist(userId) {
  return axios.get('/api/watches/', {
    params: {
      userId, 
    }
  })
    .then(res => res.data)
    .catch(err => { throw err; })
}

function addToWatchlistAjax(data) {
  return axios.post('/api/watches/', data)
    .then(res => res.data)
    .catch(err => { throw err; })
}

function removeFromWatchlistAjax(id) {
  return axios.delete(`/api/watches/${id}`)
    .then(res => res.data)
    .catch(err => { throw err; })
}

/* add to Watchlist */

export function* addToWatchlistWatcher() {
  yield takeLatest(CREATE_WATCH_REQUEST, addToWatchlistHandler);
}

function* addToWatchlistHandler(action) {
  try {
    const res = yield call(addToWatchlistAjax, action.data);
    console.log('addToWatchlist res --> ', res);
    yield put(createWatchSuccess());
  } catch(err) {
    console.log('addToWatchlist err --> ', err);
  }
}


/* remove from Watchlist */

export function* removeFromWatchlistWatcher() {
  yield takeLatest(DELETE_WATCH_REQUEST, removeFromWatchlistHandler);
}

function* removeFromWatchlistHandler(action) {
  try {
    const res = yield call(removeFromWatchlistAjax, action.id);
    console.log('removeFromWatchlist res --> ', res);
    yield put(deleteWatchSuccess());
  } catch(err) {
    console.log('removeFromWatchlist err --> ', err);
  }
}

/* get Watchlist */

function* fetchWatchlistWatcher() {
  yield takeLatest(FETCH_WATCHLIST_REQUEST, fetchWatchlistHandler);
}

function* fetchWatchlistHandler(action) {
  try {
    const res = yield call(fetchWatchlist, action.userId);
    console.log('fetchWatchlist res --> ', res);
    yield put(fetchWatchlistSuccess(res.watchlist));
  } catch(err) {
    console.error('fetchWatchlist err --> ', err);
  }
}

/* exports */

export default [
  fork(addToWatchlistWatcher),
  fork(removeFromWatchlistWatcher),
  fork(fetchWatchlistWatcher),  
]
