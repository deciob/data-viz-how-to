/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
import Header from './Header';
import Top30Bars from './charts/Top30Bars';
import Narrative from './Narrative';
/* eslint-enable no-unused-vars */

function Viz (props) {
  let chart;
  if (props.options.id === 'viz1' && props.options.version === 'a') {
    console.log('hello!');
    chart = <Top30Bars/>;
  } else {
    chart = <div>Nothing!</div>;
  }
  return <div className="viz grid">
    <Header/>
    <section className="body grid">
      {chart}
      <Narrative/>
    </section>
  </div>;
}

export default Viz;
