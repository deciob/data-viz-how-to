import { combineReducers } from 'redux';
import {
  NAVIGATION_COMPLETE,
  SET_HEADER,
  UPDATE_CURRENT_YEAR,
  PLAY_MODE,
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
  allYears: [], // candidate for reselect
  currentYear: 0,
  playMode: false,
  data: {},
  isFetching: false,
}, action) {
  switch (action.type) {
    case SET_HEADER:
      return { ...state, header: action.header };

    case UPDATE_CURRENT_YEAR:
      return { ...state, currentYear: action.currentYear };

    case PLAY_MODE:
      return { ...state, playMode: !state.playMode };

    case REQUEST_DATA:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case RECEIVE_DATA:
      const d = d3.csvParse(action.data, dataFormatter);
      const minMaxYears = helpers.getMinMax(d, d => d.year);
      return Object.assign({}, state, {
        currentYear: minMaxYears.min,
        data: Object.assign(
          {},
          state.data,
          {[helpers.snakeToCamel(action.params.dataset)]: d}
        ),
        isFetching: false,
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
