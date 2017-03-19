import { combineReducers } from 'redux';
import { NAVIGATION_COMPLETE, SET_HEADER } from './actions';

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

function appReducer (state = {}, action) {
  switch (action.type) {
    case SET_HEADER:
      return { ...state, header: action.header };

    default:
      return state;
  }
}

const reducer = combineReducers({
  navigationReducer,
  appReducer,
});

export default reducer;
