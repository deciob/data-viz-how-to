/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
import Header from './Header';
import Chart from './Chart';
import Narrative from './Narrative';
/* eslint-enable no-unused-vars */

function Viz ({id, version}) {
  const headerContent = {
    title: id,
    tagline: version,
  };
  return <div className="viz">
    <Header header={headerContent}/>
    <section className="body">
      <Chart id={id} version={version}/>
      <Narrative id={id} version={version}/>
    </section>
  </div>;
}

Viz.propTypes = {
  id: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
};

export default Viz;
