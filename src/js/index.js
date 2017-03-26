import '../../node_modules/normalize.css/normalize.css';
import '../css/styles.css';

/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import App from './App';
import {SET_HEADER, navigationComplete} from './actions';
/* eslint-enable no-unused-vars */

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// store.dispatch({
//   type: SET_HEADER,
//   header: {
//     title: 'Hello!',
//     tagline: 'All is fine!',
//   },
// });

store.subscribe(function () {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root')
  );
});

// store.subscribe(function () {
//   // Don't re-render if we're in the process of navigating to a new page
//   ReactDOM.render(
//     <Application state={store.getState()} dispatch={store.dispatch} />,
//     document.getElementById('root')
//   );
// });

// Dispatch navigation events when the URL's hash changes, and when the
// application loads
function onHashChange () {
  store.dispatch(navigationComplete());
}
window.addEventListener('hashchange', onHashChange, false);
onHashChange();
