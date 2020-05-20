import React, { useEffect } from 'react';
import styled from 'styled-components'
import * as d3 from 'd3'
import { StockValue } from '../types/StockInfo';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';
import scroll from '../../../assets/images/scroll.png'
const Wrapper = styled.svg`
  background-color:white;
  text {
    font-size:14px;
  }
  path, circle {
    vector-effect: non-scaling-stroke;
  }

  .grid g text, .grid g text {
    color:rgba(0,0,0,0.6);
    font-family: ${fonts.primary};
  }
  .tick line {
    stroke:black;
    stroke-opacity:0.1;
    
  }
  .rise {
    fill: #B0DB91;

  }
  .fall {
   
    fill:  #EF9797;
  }
  
  
`
const ScrollIndicator = styled.div`
 
  display:none;
  padding-left:30px;
  border:1px solid #cecece;
  border-radius:5px;
  height:60px;
  opacity:0.5;
  align-items:center;
  width:100%;
  img {
    width:40px;
    height:40px;
  }
  @media only screen and (max-width: 900px) {
    display:flex;
  }
`
interface Props {
  data: StockValue[]
  averageData: StockValue[];
  averageValueLabel: string;
  showAverage: boolean;
  graphType:string;
}

const D3Stock: React.FunctionComponent<Props> = (props) => {
  const { data, averageData, averageValueLabel, showAverage, graphType } = props
  let margin = { top: 10, right: 30, bottom: 30, left: 60 },
    svgWidth = 800,
    svgHeight = 400,
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;
  const clearChart = () => {
    d3.select('#d3chart').selectAll('*').remove()
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
  const appendAverageLine = (svg, data, x, y) => {
    if(!showAverage) {
      return
    }
      svg.append("path")
        .datum(averageData)
        .attr("fill", "none")
        .attr("stroke", 'red')
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function (d) { return x(d.date) })
          .y(function (d) { return y(d[averageValueLabel]) })
        )
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
  const createMainLine = (svg, data, x, y) => {
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", colors.primary)
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.date) })
        .y(function (d) { return y(d.open) })
      )
  }
  const createIndividualPoints = (svg, data, x, y, Tooltip) => {
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
      .attr("cx", function (d) { return x(d.date) })
      .attr("cy", function (d) { return y(d.open) })
      .attr("r", 4)
      .attr("stroke-width", 1.5)
      .attr('stroke', colors.primary)
      .attr("fill", "white")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
  }
  const addXAxis = (svg, data) => {
    let x = d3.scaleTime()
      .domain(d3.extent(data, function (d) { return d.date; }))
      .range([30, width - 30]);
      const xAxis = d3.axisBottom(x)
      .ticks(height/80)
      .tickSize(-height)
    return [x, xAxis]
  }
  const addYAxis = (svg, data) => {
    let y = d3.scaleLinear()
      .domain([d3.min(data, function (d) { return +d.low }) - 150, d3.max(data, function (d) { return +d.high; }) + 50])
      .range([height, 0]);
    const yAxis = d3.axisLeft(y)
    .tickSize(-width)
    return [y, yAxis]
  }
  const addGridLines = (svg, x,y, xAxis,yAxis) => {
    const gX = svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
    // add the Y gridlines
    const gY =  svg.append("g")
    .attr("class", "grid")
      .call(yAxis)
        return [gX,gY]
  }
  const createCandlesticks = (svg, data, x, y) => {
    let candleWidth = ((width / data.length) - 5) / 2 
    let lineWidth = candleWidth/2
    if(candleWidth < 1) {
      candleWidth = 1
      lineWidth = 0.5
    }
    if(candleWidth > 6) {
      candleWidth = 6
      lineWidth = 3
    }

    svg
    .append('g')
    .selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr('width', `${candleWidth}px`)
    .attr("y", function(d) {return y(d3.max([d.open, d.close]));})
    .attr("x", function (d) { return x(d.date)  })
    .attr("height", function(d) { 
      return Math.abs(y(d.open) - y(d.close))})
    .classed("rise", function(d) { return (d.open < d.close); })
    .classed("fall", function(d) { return (d.open > d.close); })
    svg.append('g')
    .selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr('width', `${lineWidth}px`)
    .attr("y", function(d) { return y(d.high); })
    .attr("x", function (d) { return x(d.date) + lineWidth /2 })
      .attr("height", function(d) { return Math.abs(y(d.high) - y(d.low)) })
      .classed("rise", function(d) { return (d.close>d.open); })
      .classed("fall", function(d) { return (d.open>d.close); })
  }
  const renderChart = () => {
    clearChart()
    let svg = createSvg()
    const [x, xAxis] = addXAxis(svg, data)
    const [y, yAxis] = addYAxis(svg, data)
    const [gX,gY] = addGridLines(svg,x,y, xAxis,yAxis)
    svg = svg.append('g')
    .attr('class','toZoom')
    if(graphType === 'candlesticks') {
      createCandlesticks(svg,data, x,y)

    }
    if(graphType === 'line') {
      let Tooltip = createToolTip()
      createMainLine(svg, data, x, y)
      createIndividualPoints(svg, data, x, y, Tooltip)
    }
    appendAverageLine(svg, data, x, y)
    
    function zoomed () {
      d3.select('.toZoom')
      .attr('transform', d3.event.transform)
      gX.call(xAxis.scale(d3.event.transform.rescaleX(x)))
      gY.call(yAxis.scale(d3.event.transform.rescaleY(y)))
      d3.selectAll('circle')
      .attr('stroke-width', 8/d3.event.scale)
    }
    let zoom = d3.zoom()
    .scaleExtent([1,40])
    .translateExtent([[0,0],[width , height]])
    .on('zoom', zoomed)
    d3.select('#d3chart').call(zoom)
  }
  useEffect(() => {
    renderChart()
  }, [showAverage, data, averageData])

  return (
    <>
      <div id="d3charttooltip" style={{ position: 'absolute' }}  />
      <Wrapper id="d3chart" style={{ height: svgHeight, width: svgWidth }}/>
      <ScrollIndicator style={{width:svgWidth}}>
        <img src={scroll}/>
      </ScrollIndicator>
    </>
  );
}
export default D3Stock