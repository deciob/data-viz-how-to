export default function (config, data, flatData) {
  const margin = config.margin || {top: 20, right: 30, bottom: 30, left: 40};
  const width = config.width - margin.left - margin.right;
  const height = config.height - margin.top - margin.bottom;
  const xFormat = config.xFormat || d3.format('');
  let svg;

  const xAccessor = config.xAccessor || (d => d.x);
  const yAccessor = config.yAccessor || (d => d.y);
  const xMax = d3.max(flatData, xAccessor) || 0;
  const xMin = d3.min(flatData, xAccessor) || 0;
  const yMax = d3.max(flatData, yAccessor) || 0;

  const xScale = d3.scaleLinear()
      .domain([xMin, xMax])
      .range([0, width]);

  const yScale = d3.scaleLinear()
      .domain([0, yMax])
      .range([height, 0]);

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

  const drawXAxis = function (el, t) {
    let axis = el.select('.axis--x');
    if (axis.empty()) {
      axis = el.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0,${height + 7})`);
    }

    axis.transition(t)
        .call(d3.axisBottom(xScale).tickFormat(xFormat));
  };

  const drawYAxis = function (el, t) {
    let axis = el.select('.axis--y');
    if (axis.empty()) {
      axis = el.append('g')
        .attr('class', 'axis axis--y')
        .attr('transform', 'translate(-3, 0)');
    }

    axis.transition(t)
        .call(d3.axisLeft(yScale));
  };

  const line = d3.line()
      .x(d => xScale(config.xAccessor(d)))
      .y(d => yScale(config.yAccessor(d)));

  const drawLines = function (el, data) {
    let linesG = el.select('.lines-g');
    if (linesG.empty()) {
      linesG = el.append('g')
        .attr('class', 'lines-g');
    }

    const lines = linesG
      .selectAll('.line')
      .data(data);
    lines.exit()
      .remove();
    lines.enter()
      .append('path')
        .attr('d', line);
  };

  svg = initSvg();
  drawXAxis(svg, 50);
  drawYAxis(svg, 50);
  drawLines(svg, data);
}
