import '../../node_modules/normalize.css/normalize.css';
import '../css/styles.css';

/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './Store';

import App from './App';
import {SET_HEADER, navigationComplete, fetchData} from './actions';
/* eslint-enable no-unused-vars */

store.dispatch(fetchData({dataset: 'top-30-urban-agglomerations'}));
// .then(() =>
//   console.log('xxx', store.getState())
// );

store.subscribe(function () {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root')
  );
});

// Dispatch navigation events when the URL's hash changes, and when the
// application loads
function onHashChange () {
  store.dispatch(navigationComplete());
}
window.addEventListener('hashchange', onHashChange, false);
onHashChange();
