import { combineReducers } from 'redux';
import {
  NAVIGATION_COMPLETE,
  SET_HEADER,
  REQUEST_DATA,
  RECEIVE_DATA,
} from './actions';
import helpers from './helpers';

const dataFormatter = function (d) {
  return {
    year: +d.year,
    country: d.country,
    urbanAgglomeration: d.urbanAgglomeration,
    population: +d.population,
  };
};

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
  currentYear: 1950,
  data: {},
  isFetching: false,
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
        data: Object.assign(
          {},
          state.data,
          {[helpers.snakeToCamel(action.params.dataset)]:
            d3.csvParse(action.data, dataFormatter)}
        ),
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
