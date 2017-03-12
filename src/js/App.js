/* eslint-disable no-unused-vars */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import {createStore} from 'redux';
// import reducer from './reducer';
import Viz from './components/Viz';
import Intro from './components/Intro';
/* eslint-enable no-unused-vars */

// const store = createStore(reducer);

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Intro</Link></li>
        <li><Link to="/viz">Viz</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Intro}/>
      <Route path="/viz" component={Viz}/>
    </div>
  </Router>
);

export default App;
