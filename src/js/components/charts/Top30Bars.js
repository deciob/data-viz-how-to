/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import barchart from '../../charts/barchart';
import helpers from '../../helpers';
import YearControls from '../YearControls';
import { top30StartEndYearSelector } from '../../selectors';
// import { updateCurrentYear } from '../../actions';
import d3Dispatch from './events';
/* eslint-enable no-unused-vars */

class Top30Bars extends React.Component {
  prepareArgs () {
    const element = ReactDOM.findDOMNode(this);
    const allData = this.props.data[this.props.id] || [];
    // const props = this.props;
    // const onTransitionEnd = props.onTransitionEnd;
    let config = {
      width: element.clientWidth,
      height: element.clientHeight,
      xAccessor: d => d.population,
      yAccessor: d => d.urbanAgglomeration,
      delayBaseline: 400,
      dispatch: d3Dispatch,
    };

    if (this.props.currentYear) {
      if (this.props.currentYear === this.props.firstLastYears.first) {
        config = { ...config, delay: 0 };
      }
      let data = allData
        .filter(d => d.year === this.props.currentYear)
        .sort((a, b) => b.population - a.population);
      return [config, data];
    }
    return [];
  }

  // componentDidMount () {
  //   if (this.props.currentYear) {
  //     console.log("componentDidMount");
  //     let args = this.prepareArgs(true);
  //     barchart.apply(null, { ...args, delay: 500 });
  //   }
  // }

  componentDidUpdate () {
    if (this.props.currentYear === this.props.firstLastYears.first ||
    this.props.playMode) {
      let args = this.prepareArgs();
      barchart.apply(null, args);
    }
  }

  componentWillUnmount () {
    const element = ReactDOM.findDOMNode(this);
    d3.select(element).select('svg').remove();
  }

  render () {
    return <div>
      <div className="current-year">
        <h4>{this.props.currentYear}
          <span> ({this.props.firstLastYears.first} - {this.props.firstLastYears.last})</span>
        </h4>
      </div>
      <div className="chart"></div>
      <YearControls/>
    </div>;
  }
}

Top30Bars.propTypes = {
  id: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  currentYear: PropTypes.number.isRequired,
  playMode: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const location = state.navigationReducer.location;
  return {
    data: state.appReducer.data,
    currentYear: state.appReducer.currentYear,
    id: helpers.snakeToCamel(location.options.dataset),
    version: location.options.version,
    firstLastYears: top30StartEndYearSelector(state),
    playMode: state.appReducer.playMode,
  };
};

const ChartContainer = connect(
  mapStateToProps,
)(Top30Bars);

export default ChartContainer;
