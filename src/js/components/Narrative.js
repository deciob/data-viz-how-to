/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
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

const mapStateToProps = (state) => {
  const location = state.navigationReducer.location;
  return {
    id: location.options.dataset,
    version: location.options.version,
  };
};

const NarrativeContainer = connect(
  mapStateToProps,
)(Narrative);

export default NarrativeContainer;
