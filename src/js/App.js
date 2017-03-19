/* eslint-disable no-unused-vars */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { createStore } from 'redux';
import Viz from './components/Viz';
import Intro from './components/Intro';
import Navigation from './components/Navigation';
/* eslint-enable no-unused-vars */

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Intro}/>
      <Route path="/viz" component={Viz}/>
      <hr/>
      <Navigation/>
    </div>
  </Router>
);

export default App;
