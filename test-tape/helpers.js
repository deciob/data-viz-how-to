'use strict';

var helpers = {
  pack: function (data, key) {
    return d3.nest().key(d => d[key]).map(data).values();
  },
};

module.exports = helpers;
