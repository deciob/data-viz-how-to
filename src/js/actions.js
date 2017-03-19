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

export {SET_HEADER, setHeader, NAVIGATION_COMPLETE, navigationComplete};
