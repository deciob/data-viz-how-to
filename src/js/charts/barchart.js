export default function (init, config, data) {
  const margin = config.margin || {top: 20, right: 30, bottom: 30, left: 220};
  const leftPadding = 5;
  const width = config.width - margin.left - margin.right;
  const height = config.height - margin.top - margin.bottom;
  const yFormat = config.yFormat || '';

  const delay = function (d, i) {
    return i * config.delayBaseline;
  };

  const xAccessor = config.xAccessor || function (d) {
    return d.x;
  };

  const yAccessor = config.yAccessor || function (d) {
    return d.y;
  };

  const xScale = d3.scaleLinear()
      .range([0, width])
      .domain([0, 1]);

  const yScale = d3.scaleBand()
      .rangeRound([0, height], 0.1)
      .padding(0.1);

  const initSvg = function () {
    d3.select('.chart').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  };

  const drawXAxis = function (el) {
    el.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(${leftPadding},${height})`)
        .call(d3.axisBottom(xScale).tickFormat(yFormat));
  };

  const drawYAxis = function (el, data, t) {
    let axis = el.select('.axis--y');
    if (axis.empty()) {
      axis = el.append('g')
        .attr('class', 'axis axis--y');
    }

    axis.transition(t)
        .call(d3.axisLeft(yScale))
      .selectAll('g')
        .delay(delay);
  };

  const drawBars = function (el, data, t) {
    let barsG = el.select('.bars-g');
    if (barsG.empty()) {
      barsG = el.append('g')
        .attr('class', 'bars-g');
    }

    const bars = barsG
      .selectAll('.bar')
      .data(data, yAccessor);
    bars.exit()
      .remove();
    bars.enter()
      .append('rect')
        .attr('class', d => d.geoCode === 'WLD' ? 'bar wld' : 'bar')
        .attr('x', leftPadding)
      .merge(bars).transition(t)
        .attr('y', d => yScale(yAccessor(d)))
        .attr('width', d => xScale(xAccessor(d)))
        .attr('height', yScale.bandwidth())
        .delay(delay);
  };

  if (init) {
    initSvg();
    drawXAxis();
  }

  drawYAxis();
  drawBars();
}
