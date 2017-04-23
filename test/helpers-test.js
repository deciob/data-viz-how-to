var test = require('tape');
var helpers = require('./helpers.js');

test('pack test', function (t) {
  var data = [
    {year: 2010, population: 10, name: 'a'},
    {year: 2011, population: 20, name: 'a'},
    {year: 2010, population: 10, name: 'b'},
    {year: 2011, population: 30, name: 'b'},
  ];

  var key = 'name';

  var expected = [
    [{year: 2010, population: 10, name: 'a'}, {year: 2011, population: 20, name: 'a'}],
    [{year: 2010, population: 10, name: 'b'}, {year: 2011, population: 30, name: 'b'}],
  ];

  t.plan(1);

  t.equal(helpers.pack(data, key), expected);
});
