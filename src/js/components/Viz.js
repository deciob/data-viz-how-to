/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
/* eslint-enable no-unused-vars */
import { connect } from 'react-redux';
import Header from './Header';
import Navigation from './Navigation';

const Viz = ({ state }) => (
  <div>
    <Header header={state.header}></Header>
    <Navigation></Navigation>
  </div>
);

// Viz.propTypes = {
//   title: PropTypes.string.isRequired,
//   tagline: PropTypes.string.isRequired,
// };
function test (state) {
  console.log(state);
  return state;
}

const VizContainer = connect(
  test
)(Viz);

export default VizContainer;
