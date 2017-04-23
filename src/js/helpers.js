export default {
  pack: function (data, key) {
    return d3.nest().key(d => d[key]).map(data).values();
  },
};
