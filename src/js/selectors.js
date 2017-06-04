import { createSelector } from 'reselect';
import helpers from './helpers';

const data = state => state.appReducer.data;

export const top30StartEndYearSelector = createSelector(
  data,
  items => {
    console.log(items);
    const minMaxYears = helpers
      .getMinMax(items.top30UrbanAgglomerations, d => d.year);
    return {first: minMaxYears.min, last: minMaxYears.max};
  }
);
