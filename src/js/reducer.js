import { combineReducers } from 'redux';
import {
  NAVIGATION_COMPLETE,
  SET_HEADER,
  UPDATE_CURRENT_YEAR,
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
  allYears: [],
  currentYear: 0,
  data: {},
  isFetching: false,
}, action) {
  switch (action.type) {
    case SET_HEADER:
      return { ...state, header: action.header };

    case UPDATE_CURRENT_YEAR:
      return { ...state, currentYear: action.currentYear };

    case REQUEST_DATA:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case RECEIVE_DATA:
      const d = d3.csvParse(action.data, dataFormatter);
      // TODO
      // const dYearsSet = new Set();
      // firstLast = d.reduce((acc, val) => {
      //
      // }, []);
      return Object.assign({}, state, {
        isFetching: false,
        data: Object.assign(
          {},
          state.data,
          {[helpers.snakeToCamel(action.params.dataset)]: d}
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
