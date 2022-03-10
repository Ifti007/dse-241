import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bubble-graph',
  templateUrl: './bubble-graph.component.html',
  styleUrls: ['./bubble-graph.component.css']
})
export class BubbleGraphComponent implements OnInit {

private data = [
  {"Name": "Manuel Neuer", "Nationality": "Germany", "Club": "FC Bayern", "Club_Position": "GK", "Rating": "92" },
  {"Name": "Jérôme Boateng", "Nationality": "Germany", "Club": "FC Bayern", "Club_Position": "RCB", "Rating": "89" },
  {"Name": "Mesut Özil", "Nationality": "Germany", "Club": "Arsenal", "Club_Position": "CAM", "Rating": "89" },
  {"Name": "Marco Reus", "Nationality": "Germany", "Club": "Bor. Dortmund", "Club_Position": "LW", "Rating": "88" },
  {"Name": "Toni Kroos", "Nationality": "Germany", "Club": "Real Madrid", "Club_Position": "LCM", "Rating": "88" },


];
private svg: any;
private margin = 50;
private width = 750 - (this.margin * 2);
private height = 400 - (this.margin * 2);
constructor() { }


ngOnInit(): void {
  this.createSvg();
  this.drawBars(this.data);

}

private createSvg(): void {
  this.svg = d3.select("figure#bubble")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}
private drawBars(data: any[]): void {
  // Create the X-axis band scale
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(data.map(d => d.Name));
  // .padding(0.2);

//   // Draw the X-axis on the DOM
  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

//   // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([0, 100])
  .range([this.height, 0]);

//   // Draw the Y-axis on the DOM
  this.svg.append("g")
  .call(d3.axisLeft(y));

//   // Create and fill the bars
//count of players per club 
  let countPerClub = d3.rollup(data, v => v.length, d => d.Club)
  // let temp = countPerClub.values
  console.log('countPerClub', countPerClub)
  // console.log('temp', temp)

  this.svg.selectAll("bars")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d: any) => x(d.Name))
  .attr("y", (d: any) => y(d.Rating))
  .attr("width", x.bandwidth())
  .attr("height", (d: { Rating: d3.NumberValue; }) => this.height - y(d.Rating))
  .attr("fill", "#d04a35");
}
}