/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
/* eslint-enable no-unused-vars */

function Viz ({id, version}) {
  const headerContent = {
    title: id,
    tagline: version
  }
  return <div>
    <Header header={headerContent}></Header>
  </div>
}

const mapStateToProps = state => ({
  header: state.header,
});

// see: https://spapas.github.io/2016/03/02/react-redux-tutorial/
// const mapDispatchToProps = dispatch => bindActionCreators({
//     loadBooks, loadAuthors
// }, dispatch)

const VizContainer = connect(
  mapStateToProps
)(Viz);

export default VizContainer;
