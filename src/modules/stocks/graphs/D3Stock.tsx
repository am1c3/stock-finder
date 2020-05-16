import React, { useEffect } from 'react';
import styled from 'styled-components'
import * as d3 from 'd3'
import { StockInfo } from '../types/StockInfo';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';
const Wrapper = styled.svg`
  background-color:white;
  text {
    font-size:14px;
  }
  .grid line {
    stroke: rgba(0,0,0,0.1);
    stroke-opacity: 0.7;
    shape-rendering: crispEdges;
  }
  
  .grid path {
    stroke-width: 0;
  }
  .yAxis path,  .xAxis path{
      display:none;
  }
  .yAxis g line, .xAxis g line{
    display:none;
  }
  .xAxis g text, .yAxis g text {
    color:rgba(0,0,0,0.6);
    font-family: ${fonts.primary};
  }
  .rise {
    fill: #B0DB91;

  }
  .fall {
   
    fill:  #EF9797;
  }
  
  
`
interface Props {
  stockInfo: StockInfo
  mean: number;
  showAverage: boolean;
}

const D3Stock: React.FunctionComponent<Props> = (props) => {
  const { stockInfo, mean, showAverage } = props
  let margin = { top: 10, right: 30, bottom: 30, left: 60 },
    svgWidth = 800,
    svgHeight = 400,
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;
  const clearChart = () => {
    d3.select('#d3chart').selectAll('*').remove()
  }
  const addXAxis = (svg, data) => {
    let xAxis = d3.scaleTime()
      .domain(d3.extent(data, function (d) { return d.date; }))
      .range([30, width - 30]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "xAxis")
      .call(d3.axisBottom(xAxis))
    return xAxis
  }
  const addYAxis = (svg, data) => {
    let yAxis = d3.scaleLinear()
      .domain([d3.min(data, function (d) { return +d.low }) - 150, d3.max(data, function (d) { return +d.high; }) + 50])
      .range([height, 0]);
    svg.append("g")
    .attr("class", "yAxis")
      .call(d3.axisLeft(yAxis).ticks(5));
    return yAxis
  }
  const createSvg = () => {
    return d3.select("#d3chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left  + "," + margin.top + ")");
  }
  const appendAverageLine = (svg, data, xAxis, yAxis) => {
    if (showAverage && data[0]) {
      svg.append("path")
        .datum([
          {
            date: data[0].date,
            open: mean
          },
          {
            date: data && data[data.length - 1].date,
            open: mean

          }
        ])
        .attr("fill", "none")
        .attr("stroke", 'red')
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function (d) { return xAxis(d.date) })
          .y(function (d) { return yAxis(d.open) })
        )
    }
  }
  const createToolTip = () => {
    return d3.select("#d3charttooltip")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
  }
  const createMainLine = (svg, data, xAxis, yAxis) => {
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", colors.primary)
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return xAxis(d.date) })
        .y(function (d) { return yAxis(d.open) })
      )
  }
  const createIndividualPoints = (svg, data, xAxis, yAxis, Tooltip) => {
    var mouseover = function (d) {
      Tooltip
        .style("opacity", 1)
    }
    var mousemove = function (d) {
      Tooltip
        .html('<div style="display:flex;flex-direction:column;min-width:200px"><div style="flex:1">Date: ' + d.date.toDateString() + '</div><div style="flex:1;">Open: ' + d.open + '</div></div>')
        .style('color', colors.primary)
        .style("left", (d3.event.pageX + 20) + "px")
        .style("top", (d3.event.pageY) + "px")
    }
    var mouseleave = function (d) {
      Tooltip
        .style("opacity", 0)
    }
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .style('cursor', 'pointer')
      .attr("class", "myCircle")
      .attr("cx", function (d) { return xAxis(d.date) })
      .attr("cy", function (d) { return yAxis(d.open) })
      .attr("r", 4)
      .attr("stroke-width", 1.5)
      .attr('stroke', colors.primary)
      .attr("fill", "white")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
  }
  const addGridLines = (svg, xAxis,yAxis) => {
    console.log(height,width, 'sd')
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(
        d3.axisBottom(xAxis)
        .ticks(5)
        .tickSize(-height)
        .tickFormat("")
      )

    // add the Y gridlines
    svg.append("g")
    .attr("class", "grid")
      .call(
        d3.axisLeft(yAxis)
          .ticks(5)
          .tickSize(-width)
          .tickFormat("")
        )
  }
  const createCandlesticks = (svg, data, xAxis, yAxis) => {
    svg
    .append('g')
    .selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr('width', '7px')
    .attr("y", function(d) {return yAxis(d3.max([d.open, d.close]));})
    .attr("x", function (d) { return xAxis(d.date) })
    .attr("height", function(d) { 
      return Math.abs(yAxis(d.open) - yAxis(d.close))})
    .classed("rise", function(d) { return (d.open < d.close); })
    .classed("fall", function(d) { return (d.open > d.close); })
    .attr('width', '5px')
    svg.append('g')
    .selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr('width', '1px')
    .attr("y", function(d) { return yAxis(d.high); })
    .attr("x", function (d) { return xAxis(d.date) + 2 })
      .attr("height", function(d) { return Math.abs(yAxis(d.high) - yAxis(d.low)) })
      .classed("rise", function(d) { return (d.close>d.open); })
      .classed("fall", function(d) { return (d.open>d.close); })
  }
  const renderChart = () => {
    const data = stockInfo.values.map((item, index) => ({
      high: +item.high,
      low: +item.low,
      close: +item.close,
      open: +item.open,
      date: new Date(item.date)
    }))
    clearChart()
    let svg = createSvg()
    const xAxis = addXAxis(svg, data)
    const yAxis = addYAxis(svg, data)
    addGridLines(svg,xAxis,yAxis)
    appendAverageLine(svg, data, xAxis, yAxis)
    // let Tooltip = createToolTip()
    // createMainLine(svg, data, xAxis, yAxis)
    // createIndividualPoints(svg, data, xAxis, yAxis, Tooltip)
    createCandlesticks(svg,data, xAxis,yAxis)
  }
  useEffect(() => {
    renderChart()
  }, [showAverage, stockInfo])

  return (
    <>
      <div id="d3charttooltip" style={{ position: 'absolute' }}  />
      <Wrapper id="d3chart" style={{ height: svgHeight, width: svgWidth }} />
    </>
  );
}
export default D3Stock