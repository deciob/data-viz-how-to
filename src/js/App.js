/* eslint-disable no-unused-vars */
import React from 'react';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import Viz from './components/Viz';
import Intro from './components/Intro';
import Navigation from './components/Navigation';
/* eslint-enable no-unused-vars */

// const App = () => (
//   <div>
//     <Route exact path="/" component={Intro}/>
//     <Route path="/viz" component={Viz}/>
//     <hr/>
//     <Navigation/>
//   </div>
// );

function App ({ location }) {
  console.log(location);
  // const location = props.state.navigationReducer.location;
  //
  // console.log(location);
  //
  // switch (location.name) {
  //   case 'root':
  //     return <Intro/>;
  //   case 'intro':
  //     return <Intro/>;
  //   case 'viz':
  //     return <Viz {...props}
  //     id={location.options.id}
  //     version={location.options.version} />;
  //
  //   default:
  //     return <div>Not Found</div>;
  // }
}

App.propTypes = {
  //state: React.PropTypes.object.isRequired,
  //dispatch: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  location: state.location,
});

const AppContainer = connect(
  mapStateToProps
)(App);

// see: https://spapas.github.io/2016/03/02/react-redux-tutorial/
// const mapDispatchToProps = dispatch => bindActionCreators({
//   loadBooks, loadAuthors
// }, dispatch),

export default AppContainer;
