export default function (config, data) {
  const margin = config.margin || {top: 20, right: 30, bottom: 30, left: 220};
  const leftPadding = 5;
  const width = config.width - margin.left - margin.right;
  const height = config.height - margin.top - margin.bottom;
  const xFormat = config.xFormat || d3.format('');
  let svg;

  const delay = function (d, i) {
    return config.delay !== undefined ? config.delay : i * config.delayBaseline;
  };

  const duration = config.delay === 0 ? 0 : 600;

  const xAccessor = config.xAccessor || (d => d.x);
  const yAccessor = config.yAccessor || (d => d.y);
  const xMax = d3.max(data, xAccessor) || 0;
  const yDomain = data.map(yAccessor);

  const xScale = d3.scaleLinear()
      .range([0, width])
      .domain([0, xMax]);

  const yScale = d3.scaleBand()
      .rangeRound([0, height], 0.1)
      .domain(yDomain)
      .padding(0.1);

  const transition = d3.transition()
      .duration(duration)
      .delay(delay)
      .on('end', () => {
        config.dispatch.call('transitionBarsEnd');
      });

  const initSvg = function () {
    let chart = d3.select('.chart');
    let svg = chart.select('svg');
    if (svg.empty()) {
      return chart.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    }
    return svg;
  };

  const drawXAxis = function (el) {
    let axis = el.select('.axis--x');
    if (axis.empty()) {
      axis = el.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(${leftPadding},${height})`);
    }

    axis.transition(transition)
        .call(d3.axisBottom(xScale).tickFormat(xFormat))
      .selectAll('g');
  };

  const drawYAxis = function (el) {
    let axis = el.select('.axis--y');
    if (axis.empty()) {
      axis = el.append('g')
        .attr('class', 'axis axis--y');
    }

    axis.transition(transition)
        .call(d3.axisLeft(yScale))
      .selectAll('g');
  };

  const drawBars = function (el, data) {
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
        .attr('class', 'bar')
        .attr('x', leftPadding)
      .merge(bars)
        .transition(transition)
        .attr('y', d => yScale(yAccessor(d)))
        .attr('width', d => {
          return xScale(xAccessor(d));
        })
        .attr('height', yScale.bandwidth());
  };

  svg = initSvg();
  drawXAxis(svg);
  drawYAxis(svg);
  drawBars(svg, data);
}
