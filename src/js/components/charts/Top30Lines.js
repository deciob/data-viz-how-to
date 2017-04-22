/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import linechart from '../../charts/linechart';
/* eslint-enable no-unused-vars */

class Top30Lines extends React.Component {

  prepareArgs () {
    const element = ReactDOM.findDOMNode(this);
    const allData = (this.props.data[this.props.id] || []);
    const config = {
      width: element.clientWidth,
      height: element.clientHeight,
      xAccessor: d => d.year,
      yAccessor: d => d.population,
    };
    return [config, allData];
  }

  componentDidMount () {
    let args = this.prepareArgs(true);
    linechart.apply(null, args);
  }

  componentDidUpdate () {
    let args = this.prepareArgs();
    linechart.apply(null, args);
  }

  componentWillUnmount () {
    const element = ReactDOM.findDOMNode(this);
    d3.select(element).select('svg').remove();
  }

  render () {
    return <div className="chart"></div>;
  }
}

Top30Lines.propTypes = {
  id: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const location = state.navigationReducer.location;
  return {
    data: state.appReducer.data,
    id: location.options.id,
    version: location.options.version,
  };
};

const ChartContainer = connect(
  mapStateToProps,
)(Top30Lines);

export default ChartContainer;
