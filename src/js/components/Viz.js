/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
import Header from './Header';
import Chart from './Chart';
import Narrative from './Narrative';
/* eslint-enable no-unused-vars */

function Viz () {
  return <div className="viz grid">
    <Header/>
    <section className="body grid">
      <Chart/>
      <Narrative/>
    </section>
  </div>;
}

export default Viz;
