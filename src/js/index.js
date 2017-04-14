import '../../node_modules/normalize.css/normalize.css';
import '../css/styles.css';

/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducer';
import App from './App';
import {SET_HEADER, navigationComplete, fetchData} from './actions';
/* eslint-enable no-unused-vars */

const loggerMiddleware = createLogger();

const store = createStore(
  reducer,
  compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware, // neat middleware that logs actions
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ),
);

store.dispatch(fetchData({dataset: 'a'}));
// .then(() =>
//   console.log('xxx', store.getState())
// );

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
