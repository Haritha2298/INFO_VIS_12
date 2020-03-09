// Import polygon data form amsterdam.js
//import { drawPolygonData } from './amsterdam.js'
if ( localStorage.getItem("completePolygonData") != null) {
    //typeof completePolygonData !== 'undefined'){
    //localStorage.getItem("polygonData") != null){    
    var datasets = localStorage.getItem("polygonData");
    console.log("DATASETS");
    console.log(datasets);
    var dataset1 = datasets[0];
    var dataset2 = datasets[1];
    update(dataset1)
} else {
    console.log("DATA is null")
}

var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = d3.select("#polygonBody")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

// datasets
// var dataset1 = [
//     {"marker": "solar", "score": 80},
//     {"marker": "metro", "score": 74},
//     {"marker": "tree", "score": 50},
//     {"marker": "train", "score": 60},
// ];
// var dataset2 = [
//     {"marker": "solar", "score": 60},
//     {"marker": "metro", "score": 90},
//     {"marker": "tree", "score": 20},
//     {"marker": "train", "score": 80},
// ];
var barWidth = 20;
var svgHeight = 300;
var barPadding = 1;

// get data from other file
// var dataset1 = datasets[0]
// var dataset2 = datasets[1]

// // Bar Char With Update Function
// // create x_axis
// var x_axis = d3.scaleBand()
//     .range([0, width])
//     .domain(["solar", "metro", "tree", "train"])
//     .padding(0.2);

// svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x_axis))
//     .selectAll("text")
//         .attr("transform", "translate(-10,0)rotate(-45)")
//         .style("text-anchor", "end");

// // create y_axis
// var y_axis = d3.scaleLinear()
//     .domain([0, 100])
//     .range([height, 0]);

// svg.append("g")
//     .call(d3.axisLeft(y_axis));

// // add bars
// // svg.selectAll("bars")
// //     .data(dataset)
// //     .enter()
// //     .append("rect")
// //         .attr("x", function(d) { return x_axis(d.marker); })
// //         .attr("y", function(d) { return y_axis(d.score); })
// //         .attr("width", x_axis.bandwidth())
// //         //width / dataset.length - barPadding)
// //         .attr("height", function(d) {return height - y_axis(d.score); })
// //         .attr("fill", "#69b3a2");

// // function to update the data
// function update(data) {
//     var u = svg.selectAll("rect")
//             .data(data)
    
//     u.enter()
//         .append("rect")
//         .merge(u)
//         .transition(1500)
//             .attr("x", function(d) {return x_axis(d.marker); })
//             .attr("y", function(d) {return y_axis(d.score); })
//             .attr("width", x_axis.bandwidth())
//             .attr("height", function(d) {return height - y_axis(d.score); })
//         .attr("fill", "#69b3a2");
// }

// //initialize plot with first dataset
// update(dataset1)


// Lollipop chart with update

// Create X Axis
var x_axis = d3.scaleBand()
    .range([0, width])
    .domain(["metro_stops", "solarPanels"])
    .padding(1);

svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_axis))
    .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");


// create y_axis
var y_axis = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);

svg.append("g")
    .call(d3.axisLeft(y_axis));

// update function
function update(dataset) {


    // variable j to update the lines
    var j = svg.selectAll(".myLine")
        .data(dataset)

    j.enter()
        .append("line")
        .attr("class", "myLine")
        .merge(j)
        .transition()
        .duration(1000)
            .attr("x1", function(d) { return x_axis(d.marker); })
            .attr("x2", function(d) { return x_axis(d.marker); })
            .attr("y1", function(d) { return y_axis(d.count); })
            .attr("y2", y_axis(0))
            .attr("stroke", "grey")

    // variabl u to update the circles
    var u = svg.selectAll("circle")
        .data(dataset)

    u.enter()
        .append("circle")
        .merge(u)
        .transition()
        .duration(1000)
            .attr("cx", function(d) { return x_axis(d.marker); })
            .attr("cy", function(d) { return y_axis(d.count); })
            .attr("r", 8)
            .attr("fill", "#69b3a2")

}

// initialize plot
//update(dataset1)
