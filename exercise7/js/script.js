
function init() {

    setMap();
    // animateMap();
    setSlider();

}

function setMap() {

    width = 960, height = 580;  // map width and height, matches 

    projection = d3.geoMercator()   // define our projection with parameters
        .scale([width * 3.3])
        .center([-120, 37])
        .translate([width / 2, height / 2])
        .precision(.1);

    path = d3.geoPath()  // create path generator function
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

    loadData();  // let's load our data next

}

function loadData() {
    var jsonFile = "https://raw.githubusercontent.com/Ifti007/dse-241/main/exercise7/data/cb_2014_us_county_5m.json";
    var csvFile = "https://mas-dse.github.io/DSE241/data/West_Nile_Virus_by_County.csv";

    Promise.all([
        d3.json(jsonFile),
        d3.csv(csvFile)
    ]).then(function (loadData) {
        console.debug('loadData', loadData);
        topo = loadData[0];
        countyData = loadData[1];
        let minYear = +countyData.reduce((prev, curr) => prev.Year < curr.Year ? prev : curr).Year;
        let maxYear = +countyData.reduce((prev, curr) => prev.Year > curr.Year ? prev : curr).Year;
        currentYear = currentYear || minYear;
        processData(topo, countyData, currentYear);
        animateMap(topo, countyData, minYear, maxYear);
        setSlider(minYear, maxYear)

    });
}

function processData(topo, countyData, year) {
    // Draw the map


    d3.select('#clock').html(year);
    $("#year").text(year);

    svg.selectAll(".county")   // select country objects (which don't exist yet)
        .data(topo.features)  // bind data to these non-existent objects
        // .enter()
        // .append("path") // prepare data to be appended to paths
        .join('path')
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        .attr("class", "county") // give them a class for styling and access later
        .attr("id", function (d) { return "code_" + d.properties.GEOID; }, true)  // give each a unique id for access later
        .attr("d", path) // create them using the svg path generator defined above
        .attr("fill", function (d) {

            // d.total = data.get(d.id) || 0;
            d.year = year;
            d.total = getCasesPerCountyPerYear(countyData, d.properties.GEOID, year)

            return colorScale(d.total);
        })
        .on("mouseover", function (ev, d) {
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



    createLegend();


}


function createLegend() {
    //Define default colorbrewer scheme

    //Define quantile scale to sort data values into buckets of color
    var color = colorScale;


    var legend = svg.selectAll('g.legendEntry')
        .data(color.range().reverse())
        // .data(d3.schemeBlues[7])
        .enter()
        .append('g').attr('class', 'legendEntry');

    legend
        .append('rect')
        .attr("x", width - 780)
        .attr("y", function (d, i) {
            return i * 20;
        })
        .attr("width", 10)
        .attr("height", 10)
        .style("stroke", "black")
        .style("stroke-width", 1)
        .style("fill", function (d) { return d; });
    //the data objects are the fill colors

    legend
        .append('text')
        .attr("x", width - 765) //leave 5 pixel space after the <rect>
        .attr("y", function (d, i) {
            return i * 20;
        })
        .attr("dy", "0.8em") //place text one line *below* the x,y point
        .text(function (d, i) {
            // console.debug(d)
            var extent = color.invertExtent(d);
            //extent will be a two-element array, format it however you want:
            var format = d3.format("0.1f");
            return format(+extent[0]) + " - " + format(+extent[1]);
        });
}

function getCasesPerCountyPerYear(countyData = [], countyCode, year) {
    let filtered = countyData.filter(d => +d.Year == +year && +d.id == +countyCode);
    let sum = 0;
    filtered.forEach(d => sum += +d.Positive_Cases);
    return sum;

}


function animateMap(topo, countyData, minYear, maxYear) {

    var timer;  // create timer object
    let currentYear = minYear;
    d3.select('#play')
        .on('click', function () {  // when user clicks the play button
            if (playing == false) {  // if the map is currently playing
                timer = setInterval(function () {   // set a JS interval
                    if (currentYear <= maxYear) {

                        processData(topo, countyData, currentYear);
                        currentYear += 1;  // increment the current attribute counter
                    }
                    else {
                        currentYear = minYear;
                    }

                    // sequenceMap();  // update the representation of the map 

                }, 500);

                d3.select(this).html('stop');  // change the button label to stop
                playing = true;   // change the status of the animation
            } else {    // else if is currently playing
                clearInterval(timer);   // stop the animation by clearing the interval
                d3.select(this).html('play');   // change the button label to play
                playing = false;   // change the status again
            }
        });
}

function setSlider(minYear, maxYear) {
    // $("#yearRange").slider({'option': { min: minYear, max: maxYear }});
    // $("#yearRange").slider({'value': currentYear || minYear});
    $("#year").text(currentYear || minYear);
    $("#yearRange").change((e) => {
        let year = parseInt(e.target.value);
        currentYear = year;
        processData(topo, countyData, currentYear);
    });



}

var width, height, projection, path, graticule, svg, topo = [], countyData = [], currentYear, playing = false;

const colorScale = d3.scaleThreshold()
    .domain([0, 5, 10, 25, 50, 100, 250, 500])
    .range(d3.schemeBlues[6]);

window.onload = init();
