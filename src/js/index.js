import '../../node_modules/normalize.css/normalize.css';
import '../css/styles.css';

/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import App from './App';
/* eslint-enable no-unused-vars */

const store = createStore(reducer);

store.dispatch({
  type: 'SET_HEADER',
  state: {
    header: {
      title: 'Hello!',
      tagline: 'All is fine!',
    },
  },
});

console.log('after store creation');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
