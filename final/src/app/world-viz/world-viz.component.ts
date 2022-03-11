import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'world-viz',
  templateUrl: './world-viz.component.html',
  styleUrls: ['./world-viz.component.css']
})
export class WorldVizComponent implements OnInit {

  private svg: any;
  private width: any = 960;
  private height = 580;

  private projection: any = d3.geoMercator()   // define our projection with parameters
    // .scale((this.width/8 ))
    // .center([-120, 37])
    .translate([this.width / 2, this.height / 2])
    .precision(.1);


  private path = d3.geoPath()  // create path generator function
    .projection(this.projection);  // add our define projection to it

  private colorScale = d3.scaleThreshold<number, string>()
    .domain([10, 50, 100, 250, 500, 750, 1000])
    .range(d3.schemeBlues[7]);

  constructor() { }

  ngOnInit(): void {
    this.setMap();
    this.loadData();
  }

  setMap() {
    let svg = this.svg;

    let width = 960, height = 580;  // map width and height, matches 

    let projection = d3.geoMercator()   // define our projection with parameters
      // .scale(width * 3.3)
      // .center([-120, 37])
      .translate([width / 2, height / 2])
      .precision(.1);

    let path = d3.geoPath()  // create path generator function
      .projection(projection);  // add our define projection to it


    svg = d3.select("#map").append("svg")   // append a svg to our html div to hold our map
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "transparent");

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
    let jsonFile = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";
    let csvFile = "https://raw.githubusercontent.com/Ifti007/dse-241/main/data/soccer.csv";


    Promise.all([
      d3.json(jsonFile),
      d3.csv(csvFile)
    ]).then((loadedData) => {
      console.debug('loadData', loadedData);
      let topo = loadedData[0];
      let countyData: any[] = loadedData[1] || [];

      let minYear = +countyData.reduce((prev, curr) => prev.Year < curr.Year ? prev : curr).Year;
      let maxYear = +countyData.reduce((prev, curr) => prev.Year > curr.Year ? prev : curr).Year;
      const newLocal = this;
      this.processData(topo, countyData);
      // animateMap(topo, countyData, minYear, maxYear);
      // setSlider(minYear, maxYear)

    });

  }
  private processData(topo: any, countyData: any[]) {
    // Draw the map



    this.svg.selectAll(".country")   // select country objects (which don't exist yet)
      .data(topo.features)  // bind data to these non-existent objects
      // .enter()
      // .append("path") // prepare data to be appended to paths
      .join('path')
      .attr("d", d3.geoPath()
        .projection(this.projection)
      )
      .attr("class", "country") // give them a class for styling and access later
      .attr("id", function (d: any) { return "code_" + d.properties.name; }, true)  // give each a unique id for access later
      .attr("d", this.path) // create them using the svg path generator defined above
      .style("stroke", "black")
      .style("stroke-width", "0.5px")
      .attr("fill", (d: any) => {

        // d.total = data.get(d.id) || 0;

        d.total = getPlayersPerCountry(countyData, d.properties.name)
        if (d.total > 0) {
          return this.colorScale(d.total);
        } else {
          return '#FFFF';
        }

      })
      .on("mouseover", (ev: any, d: any) => {
        var xPosition = ev.pageX;
        var yPosition = ev.pageY;
        d3.select("#tooltip")
          .style("left", xPosition + "px")
          .style("top", yPosition + "px");
        d3.select("#country")
          .text(d.properties.name);
        d3.select("#countryTotal")
          .text(d.total);

        d3.select("#tooltip")
          .classed("hidden", false);
      })
      .on("mouseout", function () {
        d3.select("#tooltip").classed("hidden", true);
      });
    this.createLegend();
  }

  private createLegend() {
    //Define default colorbrewer scheme

    //Define quantile scale to sort data values into buckets of color
    let color = this.colorScale;

    // let legend = d3.select("#legend").append("svg").selectAll('g.legendEntry')

    let legend = this.svg.selectAll('g.legendEntry')
      .data(color.range().reverse())
      // .data(d3.schemeBlues[7])
      .enter()
      .append('g').attr('class', 'legendEntry');

    legend
      .append('rect')
      .attr("x", 20)
      .attr("y", (d: any, i: any) => {
        return (this.height - 200) - (i * 15);
      })
      .attr("width", 10)
      .attr("height", 10)
      .style("stroke", "black")
      .style("stroke-width", 1)
      .style("fill", function (d: any) { return d; });
    //the data objects are the fill colors

    legend
      .append('text')
      .attr("x", 35) //leave 5 pixel space after the <rect>
      .attr("y", (d: any, i: any) => {
        // console.debug(d,i);
        return (this.height - 200) - (i * 15)
      })
      .attr("dy", "0.8em") //place text one line *below* the x,y point
      .style("fill", "black")
      .attr("class", "mat-caption")
      // .style("stroke-width", 1)

      .text((d: any, i: any) => {
        // console.debug(d)
        var extent = color.invertExtent(d);
        //extent will be a two-element array, format it however you want:
        var format = d3.format("0.1f");
        return format(extent[0] || 0) + " - " + format(extent[1] || 0);
      });
  }

}
function getPlayersPerCountry(countryData: any[], countryName: any): any {
  if (countryName == 'United States of America' || countryName == 'USA') {
    countryName = 'United States';
  }
  let filtered = countryData.filter((d: any) => d.Nationality == countryName);
  return filtered.length || 0;

}


