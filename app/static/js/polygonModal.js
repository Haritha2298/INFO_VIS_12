// Import polygon data form amsterdam.js
//import { drawPolygonData } from './amsterdam.js'
// if ( localStorage.getItem("completePolygonData") != null) {
//     //typeof completePolygonData !== 'undefined'){
//     //localStorage.getItem("polygonData") != null){    
//     var datasets = localStorage.getItem("polygonData");
//     console.log("DATASETS");
//     console.log(datasets);
//     var dataset1 = datasets[0];
//     var dataset2 = datasets[1];
//     update(dataset1)
// } else {
//     console.log("DATA is null")
// }

// var margin = {top: 30, right: 30, bottom: 70, left: 60},
//     width = 460 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;

// datasets for lollipop chart
var dataset1 = [
    {"marker": "solar", "count": 80},
    {"marker": "metro", "count": 74},
    {"marker": "tree", "count": 50},
    {"marker": "train", "count": 60},
];

var dataset2 = [
    {"marker": "solar", "count": 60},
    {"marker": "metro", "count": 90},
    {"marker": "tree", "count": 20},
    {"marker": "train", "count": 80},
];

var dataset3 = [
    {"marker": "solar", "count": 55},
    {"marker": "metro", "count": 20},
    {"marker": "tree", "count": 75},
    {"marker": "train", "count": 20},
];


// datasets for barChart
var barData1 = [
    {"marker": "solar", "value": 30},
    {"marker": "metro", "value": 50},
    {"marker": "tree", "value": 80},
    {"marker": "train", "value": 17},
];

var barData2 = [
    {"marker": "solar", "value": 80},
    {"marker": "metro", "value": 60},
    {"marker": "tree", "value": 40},
    {"marker": "train", "value": 60},
];

var barData3 = [
    {"marker": "solar", "value": 75},
    {"marker": "metro", "value": 80},
    {"marker": "tree", "value": 55},
    {"marker": "train", "value": 30},
];



var completeLolliDatasets = [dataset1, dataset2, dataset3];
var completeBarDatasets = [barData1, barData2, barData3];
var completeData = [completeLolliDatasets, completeBarDatasets];

// function to dynamically create buttons for each dataset
function datasetButtons(num) {
    for(i=0; i<num; i++){
        // create a button
        var iButton = document.createElement('input');
        iButton.setAttribute( "onClick", "javascript: updateCharts(completeData, " + i + ")");
        iButton.setAttribute( "value", "Polygon " + (i+1).toString());
        iButton.type = "button";
        iButton.style.height = 40;
        iButton.style.width = 100;
        iButton.className = "polyonButtons";

        //append to the modal
        document.getElementById("button-polygon").appendChild(iButton);
    }
};

datasetButtons(completeData[0].length);

var margin = {top: 60, right: 10, bottom: 60, left: 25},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


var svg1 = d3.select("#polygonBody")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


// Lollipop chart with update

// Initialize X axis
var x = d3.scaleBand()
    .range([0, width])
    .padding(1);

var x_axis = svg1.append("g")
    .attr("transform", "translate(0," + height + ")");

// Initialize y_axis
var y = d3.scaleLinear()
    .range([height, 0]);

var y_axis = svg1.append("g")
    .attr("class", "myYaxis");

// Add Title
svg1.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")  
        .text("Absolute Count");

// update function 
function updateLollipopChart(data) {

    // update X axis
    x.domain(data.map(function(d) { return d.marker ;}));
    x_axis.transition().duration(1000).call(d3.axisBottom(x));

    // update Y axis
    y.domain([0, d3.max(data, function(d) { return d.count ;})]);
    y_axis.transition().duration(1000).call(d3.axisLeft(y));

    // variable j to update the lines
    var j = svg1.selectAll(".myLine")
        .data(data)

    j.enter()
        .append("line")
        .attr("class", "myLine")
        .merge(j)
        .transition()
        .duration(1000)
            .attr("x1", function(d) { return x(d.marker); })
            .attr("x2", function(d) { return x(d.marker); })
            .attr("y1", function(d) { return y(d.count); })
            .attr("y2", y(0))
            .attr("stroke", "grey")

    // variabl u to update the circles
    var u = svg1.selectAll("circle")
        .data(data)

    u.enter()
        .append("circle")
        .merge(u)
        .transition()
        .duration(1000)
            .attr("cx", function(d) { return x(d.marker); })
            .attr("cy", function(d) { return y(d.count); })
            .attr("r", 8)
            .attr("fill", "#69b3a2")

};

// initialize plot
//updateLollipopChart(completeData[0], 0);


///// Horizontal Bar Chart /////

var margin2 = {top: 40, right: 30, bottom: 70, left: 60},
    width2 = 460 - margin2.left - margin2.right,
    height2 = 400 - margin2.top - margin2.bottom;


// Setup SVG
var barSVG = d3.select("#barChart").append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
    .attr("transform", "translate(500, 30)")
    //.attr("transform", "translate(" + margin.right + "," + margin.top + ")");

// Initialize X Axis
var barX = d3.scaleLinear()
    .range([0, width2])
    .domain([0, 100]);

var barXaxis = barSVG.append("g")
    .call(d3.axisTop(barX));

// initialize Y axis

var barY = d3.scaleBand()
    .range([0, width2])
    .padding(0.1);

var barYaxis = barSVG.append("g")
    .attr("class", "myYaxis")

barSVG.append("text")
    .attr("x", (width2 / 2))             
    .attr("y", 0 - (margin2.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px")  
    .text("Relative to Total");
    

function updateBarChart(barData) {
    barData = barData.sort(function(a, b) {
        return d3.descending(a.value, b.value);
    });

    // Update yaxis
    barY.domain(barData.map(function(d) { return d.marker; }));
    barYaxis.transition().duration(1000).call(d3.axisLeft(barY));

    // update bars with variable b
    var b = barSVG.selectAll("rect")
        .data(barData)

    b.enter()
        .append("rect")
        .merge(b)
        .transition()
        .duration(1000)
        .attr("width", function(d) {return barX(d.value); })
        .attr("y", function(d) {return barY(d.marker); })
        .attr("height", barY.bandwidth())
        .attr("fill", "#69b3a2");

};

//Initally display first bar chart
//updateBarChart(completeData, 0);

// Initialize both charts 
updateCharts(completeData, 0);

// function to update all charts
function updateCharts(completeData, tracker) {
    updateLollipopChart(completeData[0][tracker]);
    updateBarChart(completeData[1][tracker]);
}





/// Bar Chart instead of lollipop chart
// var barWidth = 20;
// var svgHeight = 300;
// var barPadding = 1;

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

