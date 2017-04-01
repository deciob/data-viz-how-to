import { combineReducers } from 'redux';
import {
  NAVIGATION_COMPLETE,
  SET_HEADER,
  REQUEST_DATA,
  RECEIVE_DATA,
} from './actions';

// The reducer to manage navigation-related state
function navigationReducer (state = {
  location: null,
}, action) {
  switch (action.type) {
    case NAVIGATION_COMPLETE:
      return {
        location: action.location,
      };

    default:
      return state;
  }
}

function appReducer (state = {
  isFetching: false,
  data: [],
}, action) {
  switch (action.type) {
    case SET_HEADER:
      return { ...state, header: action.header };

    case REQUEST_DATA:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case RECEIVE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
      });

    default:
      return state;
  }
}

const reducer = combineReducers({
  navigationReducer,
  appReducer,
});

export default reducer;
