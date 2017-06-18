import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducer';

// const loggerMiddleware = createLogger();

export default createStore(
  reducer,
  compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      //loggerMiddleware, // neat middleware that logs actions
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ),
);
