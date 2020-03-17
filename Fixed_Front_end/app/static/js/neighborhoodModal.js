function openNeighborhoodPanel() {
    document.getElementById("neighborhoodPanel").style.width = "300px";
    // close the polygon Panel
    document.getElementById("polygonPanel").style.width = "0";
    
    // when neighborhoodPanel is opened start the popup features
    map.on('click', 'amsterdam-layer', function(e) {
        var clickCoordinates = e.features[0].geometry.coordinates;
        var description = e.features[0].properties.name;
        
        popup.setLngLat(e.lngLat)
            .setHTML(description)
            .addTo(map);

    
    //Collect the total amount of stuff inside the polygon
    var dropdownMenu = document.getElementById('dropdown-menu');
    var selectedDropdownFeatures = getSelectValues(dropdownMenu);
    
    const arr = [...Array(100)].map((_, i) => i);
    //var counts_array = [];
    var test_array = [];
    //.map((_,i) => i);
    // selectedDropdownFeatures.forEach(function(listItem, index){
    //     console.log("In For Each");
        
    //     d3.json("/static/data/" + listItem + ".json").then(function(data){
    //     // JSON.parse("/static/data/" + listItem + ".json", function(data) {

        
    //         var single_marker_count = {};
    //         var neighborhoodPolygon = turf.polygon([clickCoordinates[0]]);
    //         var markersInNeighborhood = turf.pointsWithinPolygon(data, neighborhoodPolygon);
    //         single_marker_count['marker'] = listItem;
    //         single_marker_count['count'] = markersInNeighborhood.features.length;
            
    //         counts_array.push(single_marker_count);
    //       //counts_array[index] = single_marker_count;
        
    //     });
    var test_array = ['metro_stops.json', 'trash.json'];

    Promise.all(test_array.map(d3.json)).then( counts_array => {
        //var counts_array = [];
        var single_marker_count = {};
        var neighborhoodPolygon = turf.polygon([clickCoordinates[0]]);
        var markersInNeighborhood = turf.pointsWithinPolygon(data, neighborhoodPolygon);
        single_marker_count['marker'] = listItem;
        single_marker_count['count'] = markersInNeighborhood.features.length;
        counts_array.push(single_marker_count);
    });
        
    

    console.log("Counts array on click");
    console.log(counts_array);
    console.log(counts_array[0]);
        
    });
    
    
};
  
  /* Set the width of the sidebar to 0 (hide it) */
function closeNeighborhoodPanel() {
    document.getElementById("neighborhoodPanel").style.width = "0";
}

map.addControl(new mapboxgl.NavigationControl());
map.doubleClickZoom.disable();
map.scrollZoom.disable();

var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

// get data from hover over states

// datasets for lollipop chart
var dataset1 = [
    {"marker": "solar", "count": 80},
    {"marker": "metro", "count": 74},
    {"marker": "tree", "count": 50},
    {"marker": "train", "count": 60},
];


// datasets for barChart
var barData1 = [
    {"marker": "solar", "value": 30},
    {"marker": "metro", "value": 50},
    {"marker": "tree", "value": 80},
    {"marker": "train", "value": 17},
];
 


var margin = {top: 50, right: 10, bottom: 60, left: 25},
    width = 280 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;


var lolliSVG2 = d3.select("#lollipopChart-hood")
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

var x_axis = lolliSVG2.append("g")
    .attr("transform", "translate(0," + height + ")");

// Initialize y_axis
var y = d3.scaleLinear()
    .range([height, 0]);

var y_axis = lolliSVG2.append("g")
    .attr("class", "myYaxis");

// Add Title
lolliSVG2.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")  
        .text("Absolute Count");

// update function 
function updateLollipopChart2(data) {

    // update X axis
    x.domain(data.map(function(d) { return d.marker ;}));
    x_axis.transition().duration(1000).call(d3.axisBottom(x));

    // update Y axis
    y.domain([0, d3.max(data, function(d) { return d.count ;})]);
    y_axis.transition().duration(1000).call(d3.axisLeft(y));

    // variable j to update the lines
    var j = lolliSVG2.selectAll(".myLine")
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
    var u = lolliSVG2.selectAll("circle")
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
updateLollipopChart2(dataset1);


///// Horizontal Bar Chart /////

var margin2 = {top: 300, right: 30, bottom: 70, left: 60},
    width2 = 280 - margin2.left - margin2.right,
    height2 = 300 - margin2.top - margin2.bottom;


// Setup SVG
var barSVG2 = d3.select("#barChart-hood").append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
    //.attr("transform", "translate(500, 30)")
    .attr("transform", "translate(" + margin.right + "," + margin.top + ")");

// Initialize X Axis
var barX = d3.scaleLinear()
    .range([0, width2])
    .domain([0, 100]);

var barXaxis = barSVG2.append("g")
    .call(d3.axisTop(barX));

// initialize Y axis

var barY = d3.scaleBand()
    .range([0, width2])
    .padding(0.1);

var barYaxis = barSVG2.append("g")
    .attr("class", "myYaxis")

barSVG2.append("text")
    .attr("x", (width2 / 2))             
    .attr("y", 0 - (margin2.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px")  
    .text("Relative to Total");
    

function updateBarChart2(barData) {
    barData = barData.sort(function(a, b) {
        return d3.descending(a.value, b.value);
    });

    // Update yaxis
    barY.domain(barData.map(function(d) { return d.marker; }));
    barYaxis.transition().duration(1000).call(d3.axisLeft(barY));

    // update bars with variable b
    var b = barSVG2.selectAll("rect")
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
updateBarChart2(barData1);