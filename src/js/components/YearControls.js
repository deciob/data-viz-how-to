/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import React from 'react';
import {
  playMode,
  updateCurrentYear,
} from '../actions';
/* eslint-enable no-unused-vars */

const YearControls = ({currentYear, playMode, onStartAnimationClick}) => (
  <div className="year-controls">
    <button disabled={playMode} onClick={() => onStartAnimationClick(currentYear)}>
      Start Animation
    </button>
    <button disabled={!playMode} onClick={() => onStartAnimationClick()}>
      Stop Animation
    </button>
    <button disabled={playMode}>Reset</button>
  </div>
);

const mapStateToProps = (state) => {
  return {
    currentYear: state.appReducer.currentYear,
    playMode: state.appReducer.playMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStartAnimationClick: (year) => {
      dispatch(updateCurrentYear(year + 5));
      dispatch(playMode());
    },
  };
};

const YearControlsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(YearControls);

export default YearControlsContainer;
