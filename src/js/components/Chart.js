/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
/* eslint-enable no-unused-vars */

function Chart ({id, version}) {
  return <div className="chart">
    My chart will go here!
  </div>;
}

Chart.propTypes = {
  id: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
};

export default Chart;
