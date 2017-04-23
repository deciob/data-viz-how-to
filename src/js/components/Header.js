/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
import { createStore } from 'redux';
import { connect } from 'react-redux';
/* eslint-enable no-unused-vars */

const Header = ({ id, version }) => (
  <section className="header">
    <h1>{id}</h1>
    <h3>{version}</h3>
  </section>
);

Header.propTypes = {
  header:
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      version: PropTypes.string.isRequired,
    }),
};

const mapStateToProps = (state) => {
  const location = state.navigationReducer.location;
  return {
    id: location.options.dataset,
    version: location.options.version,
  };
};

const HeaderContainer = connect(
  mapStateToProps,
)(Header);

export default HeaderContainer;
