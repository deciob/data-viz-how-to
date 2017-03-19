/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Link,
} from 'react-router-dom';
/* eslint-enable no-unused-vars */

const Navigation = () => (
  <section className="navigation">
    <ul>
      <li><Link to="/">Intro</Link></li>
      <li><Link to="/viz">Viz</Link></li>
    </ul>
  </section>
);

export default Navigation;
