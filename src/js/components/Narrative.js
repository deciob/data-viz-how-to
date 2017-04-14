/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
/* eslint-enable no-unused-vars */

function Narrative ({id, version}) {
  return <div className="narrative">
    My narrative will go here! And here and here and here...
  </div>;
}

Narrative.propTypes = {
  id: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
};

export default Narrative;
