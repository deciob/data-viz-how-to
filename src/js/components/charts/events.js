import store from '../../Store';
import { updateCurrentYear } from '../../actions';
import { top30StartEndYearSelector } from '../../selectors';

const d3Dispatch = d3.dispatch('transitionBarsEnd');

d3Dispatch.on('transitionBarsEnd', function () {
  const state = store.getState();
  const firstLastYears = top30StartEndYearSelector(state);
  const currentYear = state.appReducer.currentYear;
  if (currentYear < firstLastYears.last) {
    store.dispatch(updateCurrentYear(currentYear + 5));
  }
});

export default d3Dispatch;
