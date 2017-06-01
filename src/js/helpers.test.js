import helpers from './helpers';

test('getMinMax', () => {
  const input = [
    {year: 1950, population: 5.2},
    {year: 1950, population: 5.3},
    {year: 1955, population: 5.1},
    {year: 1960, population: 5.0},
  ];

  const transformFunc = function (d) {
    return d.year;
  };

  expect(
    helpers.getMinMax(input, transformFunc)).toEqual({min: 1950, max: 1960}
  );
});
