import configuration from './configuration';
import Routes from './Routes';

const NAVIGATION_COMPLETE = 'NAVIGATION_COMPLETE';

// The action to be called when the browser navigates
function navigationComplete () {
  return {
    type: NAVIGATION_COMPLETE,
    location: Routes.lookup(window.location.hash.substr(1)),
  };
}

const SET_HEADER = 'SET_HEADER';

function setHeader (header) {
  return {
    type: SET_HEADER,
    header,
  };
}

const REQUEST_DATA = 'REQUEST_DATA';

function requestData (params) {
  return {
    type: REQUEST_DATA,
    params,
  };
}

const RECEIVE_DATA = 'RECEIVE_DATA';

function receiveData (params, text) {
  return {
    type: RECEIVE_DATA,
    params,
    data: text,
    receivedAt: Date.now(),
  };
}

// thunk action creator!
function fetchData (params) {
  return dispatch => {
    dispatch(requestData(params));

    const url = configuration.urls[params.id];

    return window.fetch(url)
      .then(response => response.text())
      .then(text => dispatch(receiveData(params, text))
    );

    // In a real world app, you also want to
    // catch any error in the network call.
  };
}

export {
  SET_HEADER,
  setHeader,
  NAVIGATION_COMPLETE,
  navigationComplete,
  REQUEST_DATA,
  requestData,
  RECEIVE_DATA,
  receiveData,
  fetchData,
};
