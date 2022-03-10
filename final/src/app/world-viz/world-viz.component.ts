import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'world-viz',
  templateUrl: './world-viz.component.html',
  styleUrls: ['./world-viz.component.css']
})
export class WorldVizComponent implements OnInit {

  private svg: any;
  private width:any = 960;
  private height = 580;

  private projection:any = d3.geoMercator()   // define our projection with parameters
  .scale((this.width * 3.3))
  .center([-120, 37])
  .translate([this.width / 2, this.height / 2])
  .precision(.1);

  private path = d3.geoPath()  // create path generator function
  .projection(this.projection);  // add our define projection to it

  // private colorScale = d3.scaleThreshold()
  //   .domain([0, 5, 10, 25, 50, 100, 250, 500])
  //   .range(d3.schemeBlues[0]);

  private colorScale = d3.scaleOrdinal()
    .domain(["0", "5", "10", "25", "50", "100", "250", "500"])
    .range(d3.schemeBlues[6]);

  // private colors:any;
  // private createColors(): void {
  //     this.colors = d3.scaleOrdinal()
  //     .domain(this.data.map(d => d.Stars.toString()))
  //     .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
  // }

  constructor() { }

  ngOnInit(): void {
    this.setMap();
    this.loadData();
  }

  setMap() {
    let svg = this.svg;

    let width = 960, height = 580;  // map width and height, matches 

    let projection = d3.geoMercator()   // define our projection with parameters
        .scale(width * 3.3)
        .center([-120, 37])
        .translate([width / 2, height / 2])
        .precision(.1);

    let path = d3.geoPath()  // create path generator function
        .projection(projection);  // add our define projection to it


    svg = d3.select("#map").append("svg")   // append a svg to our html div to hold our map
        .attr("width", width)
        .attr("height", height);

    svg.append("defs").append("path")   // prepare some svg for outer container of svg elements
        .datum({ type: "Sphere" })
        .attr("id", "sphere")
        .attr("d", path);

    svg.append("use")   // use that svg to style with css
        .attr("class", "stroke")
        .attr("xlink:href", "#sphere");
    
   this.svg = svg;

}


  private loadData(): void {
    let jsonFile = "https://raw.githubusercontent.com/Ifti007/dse-241/main/exercise7/data/cb_2014_us_county_5m.json";
    let csvFile = "https://mas-dse.github.io/DSE241/data/West_Nile_Virus_by_County.csv";

    console.debug('in Load Data');




    Promise.all([
      d3.json(jsonFile),
      d3.csv(csvFile)
    ]).then((loadedData) => {
      console.debug('loadData', loadedData);
      let topo = loadedData[0];
      let countyData: any[] = loadedData[1] || [];
      let currentYear = 2004;

      let minYear = +countyData.reduce((prev, curr) => prev.Year < curr.Year ? prev : curr).Year;
      let maxYear = +countyData.reduce((prev, curr) => prev.Year > curr.Year ? prev : curr).Year;
      const newLocal = this;
      //this.currentYear || minYear;
      this.processData(topo, countyData, currentYear);
      // animateMap(topo, countyData, minYear, maxYear);
      // setSlider(minYear, maxYear)

    });

  }
  private processData(topo: any, countyData: any[], year: any) {
    // Draw the map



    this.svg.selectAll(".county")   // select country objects (which don't exist yet)
      .data(topo.features)  // bind data to these non-existent objects
      // .enter()
      // .append("path") // prepare data to be appended to paths
      .join('path')
      .attr("d", d3.geoPath()
        .projection(this.projection)
      )
      .attr("class", "county") // give them a class for styling and access later
      .attr("id", function (d: any) { return "code_" + d.properties.GEOID; }, true)  // give each a unique id for access later
      .attr("d", this.path) // create them using the svg path generator defined above
      .attr("fill", (d: any) => {

        // d.total = data.get(d.id) || 0;
        d.year = year;
        d.total = getCasesPerCountyPerYear(countyData, d.properties.GEOID, year)

        return this.colorScale(d.total);
      })
      .on("mouseover", (ev: any, d: any) => {
        var xPosition = ev.pageX;
        var yPosition = ev.pageY;
        d3.select("#tooltip")
          .style("left", xPosition + "px")
          .style("top", yPosition + "px");
        d3.select("#county")
          .text(d.properties.NAME);
        d3.select("#countyTotal")
          .text(d.total);

        d3.select("#tooltip")
          .classed("hidden", false);
      })
      .on("mouseout", function () {
        d3.select("#tooltip").classed("hidden", true);
      });



    // createLegend();


  }


}
function getCasesPerCountyPerYear(countyData: any[], countyCode: any, year: string): any {
  let filtered = countyData.filter((d: any) => +d.Year == +year && +d.id == +countyCode);
  let sum = 0;
  filtered.forEach((d: any) => sum += +d.Positive_Cases);
  return sum;

}


