/* eslint-disable no-unused-vars */
import React from 'react';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import Viz from './components/Viz';
import Intro from './components/Intro';
import Navigation from './components/Navigation';
/* eslint-enable no-unused-vars */

function App (props) {
  return <div>
    {selectChildContainer(props)}
    <Navigation />
  </div>;
}

const selectChildContainer = props => {
  console.log(props);
  const location = props.state.navigationReducer.location;

  switch (location.name) {
    case 'root':
      return <Intro/>;
    case 'intro':
      return <Intro/>;
    case 'viz':
      return <Viz
        id={location.options.id}
        version={location.options.version}/>;
    default:
      return 'Not Found';
  }
};

const mapStateToProps = (state) => {
  return {state: state};
};

const mapDispatchToProps = (dispatch) => {
  return {dispatch: dispatch};
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
