export default {
  pack: function (data, key) {
    return d3.nest().key(d => d[key]).map(data).values();
  },

  snakeToCamel: function snakeToCamel (s) {
    return s.replace(/-([a-z0-9])/g, function (g) { return g[1].toUpperCase(); });
  },

  getMinMax: function getMinMax (data, transformFunc) {
    return {min: 0, max: 0};
  },
};
