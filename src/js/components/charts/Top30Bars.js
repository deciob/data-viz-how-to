/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import barchart from '../../charts/barchart';
/* eslint-enable no-unused-vars */

class Top30Bars extends React.Component {

  prepareArgs () {
    const element = ReactDOM.findDOMNode(this);
    const allData = this.props.data[this.props.id] || [];
    const config = {
      width: element.clientWidth,
      height: element.clientHeight,
      xAccessor: d => d.population,
      yAccessor: d => d.urbanAgglomeration,
      delayBaseline: 40,
    };
    if (this.props.currentYear) {
      let data = allData
        .filter(d => d.year === this.props.currentYear)
        .sort((a, b) => b.population - a.population);
      return [config, data];
    }
    return [];
  }

  componentDidMount () {
    if (this.props.currentYear) {
      let args = this.prepareArgs(true);
      barchart.apply(null, args);
    }
  }

  componentDidUpdate () {
    if (this.props.currentYear) {
      let args = this.prepareArgs();
      barchart.apply(null, args);
    }
  }

  componentWillUnmount () {
    console.log('unmounting!!!');
    const element = ReactDOM.findDOMNode(this);
    d3.select(element).select('svg').remove();
  }

  render () {
    return <div className="chart"></div>;
  }
}

Top30Bars.propTypes = {
  id: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const location = state.navigationReducer.location;
  return {
    data: state.appReducer.data,
    currentYear: state.appReducer.currentYear,
    id: location.options.id,
    version: location.options.version,
  };
};

const ChartContainer = connect(
  mapStateToProps,
)(Top30Bars);

export default ChartContainer;
