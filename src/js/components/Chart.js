/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
/* eslint-enable no-unused-vars */

class Chart extends React.Component {
  // constructor (props) {
  //   super(props);
  //   this.state = {date: new Date()};
  // }

  componentDidMount () {
    var element = ReactDOM.findDOMNode(this);
    console.log(element);
  }

  render () {
    return <div className="chart">
      My chart will go here!!!!
      {this.props.id}
    </div>;
  }
}

Chart.propTypes = {
  id: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
};

export default Chart;
