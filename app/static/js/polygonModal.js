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

// function getData (){
//     return requestAnimationFrame('./amsterdam').polyData
// }

var draw = new MapboxDraw({ 
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true
    }
  });

map.addControl(draw, 'top-right');

var polygonCollection_absolute = [];
var polygonCollection_relative = [];

function openPolygonPanel() {
    document.getElementById("polygonPanel").style.width = "300px";
    //close neighborhood Panel
    document.getElementById("neighborhoodPanel").style.width = "0";
    //polygonCounting();
    
    //Collect the total amount of stuff inside the polygon
    var dropdownMenu = document.getElementById('dropdown-menu');
    var selectedDropdownFeatures = getSelectValues(dropdownMenu);


    var dataArrayPoly = [];
    dataArrayPoly.length = 0;
    var figLabelsPoly = [];
    selectedDropdownFeatures.forEach(function(listItem) {
        dataArrayPoly.push(dataMapping[listItem]);
        figLabelsPoly.push(labels[listItem]);
    });
    

    //var polygonCollection = [];

    var drawnPolygons = draw.getAll();
    
    polygonCollection_absolute.length = 0;
    polygonCollection_relative.length = 0;
    

    for(m=0; m<drawnPolygons.features.length; m++){
        var polygonCoord = drawnPolygons.features[m].geometry.coordinates[0];
        var polygon = turf.polygon(
            [polygonCoord]
        );
        
        
        // reset polygon count array
        var singlePolygonCount = [];
        var singlePolyRelative = [];
        //singlePolygonCount.length = 0;

        for(k=0; k<dataArrayPoly.length ; k++){
        //dataArrayPoly.forEach(function(listItem, index){
            
            var polygonMarkers = turf.pointsWithinPolygon(dataArrayPoly[k], polygon);
            var single_marker = {};
            
            single_marker['marker'] = figLabelsPoly[k];
            single_marker['count'] = polygonMarkers.features.length;
        
            singlePolygonCount.push(single_marker);
            
            var single_marker_relative = {};
            single_marker_relative['marker'] = figLabelsPoly[k];
            single_marker_relative['value'] = (polygonMarkers.features.length / absolute_counts[figLabelsPoly[k]]);
            singlePolyRelative.push(single_marker_relative);
            

          
        };

        console.log("Single Polygon Count");
        console.log(singlePolygonCount); 

        polygonCollection_absolute.push(singlePolygonCount);
        console.log("Final Polygon Collection");
        console.log(polygonCollection_absolute);

        polygonCollection_relative.push(singlePolyRelative);
        //polygonCollection.push(singlePolygonCount);

    };
    datasetButtons(polygonCollection_absolute.length);
    updateLollipopChart(polygonCollection_absolute[0]);
    updateBarChart(polygonCollection_relative[0]);
};
  
  /* Set the width of the sidebar to 0 (hide it) */
function closePolygonPanel() {
    document.getElementById("polygonPanel").style.width = "0";
}




// function polygonCounting(){
// var drawnPolygons = draw.getAll();
// for(m=0; m<drawnPolygons.features.length; m++){
//     var polygonCoord = drawnPolygons.features[m].geometry.coordinates[0];
//     var polygon = turf.polygon(
//         [polygonCoord]
//     );
//     var singlePolygonCount = [];
//     dataArrayPoly.forEach(function(listItem, index){
//         var polygonMarkers = turf.pointsWithinPolygon(listItem, polygon);
//         var single_marker = {};
//         single_marker['marker'] = figLables[index];
//         single_marker['count'] = polygonMarkers.features.length;
//         console.log("Single Marker");
//         console.log(single_marker);
//         singlePolygonCount.push(single_marker);
//     });
//     console.log("Single Polygon Count");
//     console.log(singlePolygonCount);
//     polygonCollection.push(singlePolygonCount);
// };
// //initialize first plot
// updateLollipopChart(polygonCollection[0]); 
// return polygonCollection.length;

// };



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
    // remove previous buttons
    var buttonNode = document.getElementById("button-polygon");
    while (buttonNode.firstChild) {
        buttonNode.removeChild(buttonNode.lastChild);
    };

    // add new buttons
    for(i=0; i<num; i++){
        // create a button
        var iButton = document.createElement('input');
        iButton.setAttribute( "onClick", "javascript: updateLollipopChart(polygonCollection_absolute[" + i + "]); updateBarChart(polygonCollection_relative[" + i + "]);");
        iButton.setAttribute( "value", "Polygon " + (i+1).toString());
        iButton.type = "button";
        iButton.style.height = 40;
        iButton.style.width = 100;
        iButton.className = "polygonButtons";

        //append to the modal
        document.getElementById("button-polygon").appendChild(iButton);
    }
};

//datasetButtons(completeData[0].length);

var margin_poly = {top: 60, right: 10, bottom: 60, left: 25},
    width_poly = 280 - margin_poly.left - margin_poly.right,
    height_poly = 300 - margin_poly.top - margin_poly.bottom;


var lolliSVG = d3.select("#lollipopChart")
        .append("svg")
        .attr("width", width_poly + margin_poly.left + margin_poly.right)
        .attr("height", height_poly + margin_poly.top + margin_poly.bottom)
        .append("g")
        .attr("transform",
                "translate(" + margin_poly.left + "," + margin_poly.top + ")");


// Lollipop chart with update

// Initialize X axis
var x_poly = d3.scaleBand()
    .range([0, width_poly])
    .padding(1);

var x_axis_poly = lolliSVG.append("g")
    .attr("transform", "translate(0," + height_poly + ")");

// Initialize y_axis
var y_poly = d3.scaleLinear()
    .range([height_poly, 0]);

var y_axis_poly = lolliSVG.append("g")
    .attr("class", "myYaxis");

// Add Title
lolliSVG.append("text")
        .attr("x", (width_poly / 2))             
        .attr("y", 0 - (margin_poly.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")  
        .text("Absolute Count");

// update function 
function updateLollipopChart(data) {
    console.log("updating lollipop");
    console.log(data);
    // update X axis
    x_poly.domain(data.map(function(d) { return d.marker ;}));
    x_axis_poly.transition().duration(1000).call(d3.axisBottom(x_poly));

    // update Y axis
    y_poly.domain([0, d3.max(data, function(d) { return d.count + 2 ;})]);
    y_axis_poly.transition().duration(1000).call(d3.axisLeft(y_poly));

    // variable j to update the lines
    var l = lolliSVG.selectAll(".myLine")
        .data(data)

    l.enter()
        .append("line")
        .attr("class", "myLine")
        .merge(l)
        .transition()
        .duration(1000)
            .attr("x1", function(d) { return x_poly(d.marker); })
            .attr("x2", function(d) { return x_poly(d.marker); })
            .attr("y1", function(d) { return y_poly(d.count); })
            .attr("y2", y_poly(0))
            .attr("stroke", "grey")
    
    l.exit().remove();

    // variabl u to update the circles
    var c = lolliSVG.selectAll("circle")
        .data(data)

    c.enter()
        .append("circle")
        .merge(c)
        .transition()
        .duration(1000)
            .attr("cx", function(d) { return x_poly(d.marker); })
            .attr("cy", function(d) { return y_poly(d.count); })
            .attr("r", 8)
            .attr("fill", "#69b3a2")

    c.exit().remove();

};

// initialize plot
//updateLollipopChart(completeData[0], 0);


///// Horizontal Bar Chart /////

var margin2_poly = {top: 40, right: 30, bottom: 70, left: 60},
    width2_poly = 280 - margin2_poly.left - margin2_poly.right,
    height2_poly = 300 - margin2_poly.top - margin2_poly.bottom;


// Setup SVG
var barSVG_poly = d3.select("#barChart").append("svg")
    .attr("width", width2_poly + margin2_poly.left + margin2_poly.right)
    .attr("height", height2_poly + margin2_poly.top + margin2_poly.bottom)
    .append("g")
    //.attr("transform", "translate(500, 30)")
    .attr("transform", "translate(" + margin_poly.right + "," + margin_poly.top + ")");

// Initialize X Axis
var barX_poly = d3.scaleLinear()
    .range([0, width2])

var barXaxis_poly = barSVG_poly.append("g")
    .attr("class", "myXaxis_poly")

// initialize Y axis

var barY_poly = d3.scaleBand()
    .range([0, width2])
    .padding(0.1);

var barYaxis_poly = barSVG_poly.append("g")
    .attr("class", "myYaxis_poly")

barSVG_poly.append("text")
    .attr("x", (width2_poly / 2))             
    .attr("y", 0 - (margin2_poly.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px")  
    .text("Relative to Total");
    

function updateBarChart(barData) {
    console.log("Inside BarChart Update")
    barData = barData.sort(function(a, b) {
        return d3.descending(a.value, b.value);
    });

    // update x axis
    barX_poly.domain([0, d3.max(barData, function(d) { return d.value ;})]);
    barXaxis_poly.transition().duration(1000).call(d3.axisTop(barX_poly));

    // Update yaxis
    barY_poly.domain(barData.map(function(d) { return d.marker; }));
    barYaxis_poly.transition().duration(1000).call(d3.axisLeft(barY_poly));


    // variable to update the lines
    var l2_poly = barSVG_poly.selectAll(".lines_poly")
        .data(barData)

    l2_poly.enter()
        .append("line")
        .attr("class", "lines_poly")
        //.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")")
        .merge(l2_poly)
        .transition()
        .duration(1000)
        .attr("x1", function(d) { return barX_poly(d.value);})
        .attr("x2", barX_poly(0))
        .attr("y1", function(d) {return barY_poly(d.marker);})
        .attr("y2", function(d) {return barY_poly(d.marker);})
        .attr("stroke", "grey");

    l2_poly.exit().remove();


    var c2_poly = barSVG_poly.selectAll("circle")
        .data(barData)

    c2_poly.enter()
        .append("circle")
        //.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")")
        .merge(c2_poly)
        .transition()
        .duration(1000)
            .attr("cx", function(d) {return barX_poly(d.value);})
            .attr("cy", function(d) {return barY_poly(d.marker);})
            .attr("r", 8)
            .attr("fill", "#69b3a2")

    c2_poly.exit().remove();
    // // update bars with variable b
    // var b2 = barSVG.selectAll("rect")
    //     .data(barData)

    // b2.enter()
    //     .append("rect")
    //     .merge(b2)
    //     .transition()
    //     .duration(1000)
    //     .attr("width", function(d) { return barX_poly(d.value); })
    //     .attr("y", function(d) {return barY_poly(d.marker); })
    //     .attr("height", barY_poly.bandwidth())
    //     .attr("fill", "#69b3a2");

};

//Initally display first bar chart
//updateBarChart(completeData, 0);

// Initialize both charts 
//updateCharts(completeData, 2);

// function to update all charts
function updateCharts(completeData) {
    updateLollipopChart(completeData);
    updateBarChart(completeData);
};





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
