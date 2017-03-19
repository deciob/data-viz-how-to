/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
/* eslint-enable no-unused-vars */

const Header = ({ header }) => (
  <section className="header">
    <h1>{header.title}</h1>
    <h3>{header.tagline}</h3>
  </section>
);

Header.propTypes = {
  header:
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      tagline: PropTypes.string.isRequired,
    }),
};

export default Header;
