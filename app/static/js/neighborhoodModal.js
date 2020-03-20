// object to map dropdown features to data
const dataMapping = {
    "tram_stop": tram_stop_data,
    "tree": tree_data,
    "trash": trash_data,
    "sports_field": sports_field_data,
    "metro_stops": metro_stops_data,
    "solarPanels": solaPanels_data,  
    "playground": playground_data  
};

const labels = {
    "tram_stop": "Tram Stops",
    "tree": "Tree",
    "trash": "Trash Disposal",
    "sports_field": "Sports Field",
    "metro_stops": "Metro Station",
    "solarPanels": "Solar Panel",
    "playground": "Playground"  
};

const absolute_counts = {
    "Tram Stops": 100,
    "Tree": 100,
    "Trash Disposal": 100,
    "Sports Field": 100,
    "Metro Station": 58,
    "Solar Panel": 1200 ,
    "Playground": 100
}

function openNeighborhoodPanel() {
    document.getElementById("neighborhoodPanel").style.width = "350px";
    // close the polygon Panel
    document.getElementById("polygonPanel").style.width = "0";
};

  function closeNeighborhoodPanel() {
    document.getElementById("neighborhoodPanel").style.width = "0";
}
    // when neighborhoodPanel is opened start the popup features
map.on('click', 'amsterdam-layer', function(e) {
        var clickCoordinates = e.features[0].geometry.coordinates;
        var neighborhoodPolygon = turf.polygon([clickCoordinates[0]]);
        var description = e.features[0].properties.name;

        //set name in panel
        var title = document.createElement("p");
        var nameDiv = document.getElementById("neighborhoodName");
        title.innerHTML = description;
        // remove previous names
        while (nameDiv.firstChild) {
            nameDiv.removeChild(nameDiv.lastChild);
        };

        // add new name
        nameDiv.appendChild(title);
        

    
    //Collect the total amount of stuff inside the polygon
    var dropdownMenu = document.getElementById('dropdown-menu');
    var selectedDropdownFeatures = getSelectValues(dropdownMenu);
    
    
    var dataArray = [];
    var figLabels = [];
    selectedDropdownFeatures.forEach(function(listItem) {
        dataArray.push(dataMapping[listItem]);
        figLabels.push(labels[listItem]);
    });
        


    var myData = [tram_stop_data, metro_stops_data, tree_data, trash_data, sports_field_data];
    var counts_array = [];
    var proportion_total = [];
    
        dataArray.forEach(function(listItem, index){

                var neighborhoodMarkers = turf.pointsWithinPolygon(listItem, neighborhoodPolygon);
                var single_marker_count = {};
                var proportional_count = {};
                single_marker_count['marker'] = figLabels[index];
                single_marker_count['count'] = neighborhoodMarkers.features.length;
                counts_array.push(single_marker_count);

                proportional_count['marker'] = figLabels[index];
                proportional_count['value'] = (neighborhoodMarkers.features.length / absolute_counts[figLabels[index]]) * 100;
                proportion_total.push(proportional_count);
        });
    updateLollipopChart2(counts_array);
    updateBarChart2(proportion_total);
        
    });
    
    

map.addControl(new mapboxgl.NavigationControl());
map.doubleClickZoom.disable();
map.scrollZoom.disable();

var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
}); 


var margin = {top: 60, right: 10, bottom: 60, left:50},
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
    // incoming data
    console.log("incoming data to update call");
    console.log(data);
    console.log(data[0]);
    console.log(data[1]);
    // update X axis
    x.domain(data.map(function(d) { return d.marker ;}));
    x_axis.transition().duration(1000).call(d3.axisBottom(x));

    //update text
    x_axis.selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-35)");

    // update Y axis
    y.domain([0, d3.max(data, function(d) { return d.count + 5 ;})]);
    y_axis.transition().duration(1000).call(d3.axisLeft(y));

    //transition for updates
    const t = lolliSVG2.transition().duration(750);

    // variable j to update the lines
    var j = lolliSVG2.selectAll(".lolliLine")
        .data(data)

    j.enter()
        .append("line")
        .attr("class", "lolliLine")
        .merge(j)
        .transition()
        .duration(750)
        .attr("x1", function(d) { return x(d.marker); })
        .attr("x2", function(d) { return x(d.marker); })
        .attr("y1", function(d) { return y(d.count); })
        .attr("y2", y(0))
        .attr("stroke", "grey");

    j.exit().remove();

    // variabl u to update the circles
    var u = lolliSVG2.selectAll(".lolliCircle")
        .data(data)

    u.enter()
        .append("circle")
        .attr("class", "lolliCircle")
        .merge(u)
        .transition()
        .duration(750)
        .attr("cx", function(d) { return x(d.marker); })
        .attr("cy", function(d) { return y(d.count); })
        .attr("r", 8)
        .attr("fill", "#69b3a2")

    u.exit().remove();
};


///// Horizontal Lolli Chart /////

var margin2 = {top: 80, right: 10, bottom: 60, left:75},
    width2 = 280 - margin2.left - margin2.right,
    height2 = 300 - margin2.top - margin2.bottom;


// Setup SVG
var barSVG2 = d3.select("#barChart-hood").append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
    //.attr("transform", "translate(500, 30)")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

// Initialize X Axis
var barX = d3.scaleLinear()
    .range([0, width2]);

var barXaxis = barSVG2.append("g")
    .attr("class", "myXaxis");

// initialize Y axis

var barY = d3.scaleBand()
    .range([0, width2])
    .padding(1);

var barYaxis = barSVG2.append("g")
    .attr("class", "myYaxis")

barSVG2.append("text")
    .attr("x", (width2 / 2))             
    .attr("y", 0 - (margin2.top / 2))
    //.attr("transform", "translate(0," + margin2.top + ")")
    .attr("text-anchor", "middle")  
    .style("font-size", "16px")  
    .text("Relative to Total");
    

function updateBarChart2(barData) {
    barData = barData.sort(function(a, b) {
        return d3.descending(a.value, b.value);
    });

    // update x axis
    barX.domain([0, d3.max(barData, function(d) { return d.value ;})]);
    barXaxis.transition().duration(1000).call(d3.axisTop(barX));

    // Update yaxis
    barY.domain(barData.map(function(d) { return d.marker; }));
    barYaxis.transition().duration(1000).call(d3.axisLeft(barY));

    //
    barXaxis.selectAll("text")
        .style("text-anchor", "start")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-35)");

    // variable to update the lines
    var l2 = barSVG2.selectAll(".lines_hood")
        .data(barData)

    l2.enter()
        .append("line")
        .attr("class", "lines_hood")
        .merge(l2)
        .transition()
        .duration(1000)
        .attr("x1", function(d) { return barX(d.value);})
        .attr("x2", barX(0))
        .attr("y1", function(d) {return barY(d.marker);})
        .attr("y2", function(d) {return barY(d.marker);})
        .attr("stroke", "grey")

    l2.exit().remove();

    var c2 = barSVG2.selectAll("circle")
        .data(barData)

    c2.enter()
        .append("circle")
        .merge(c2)
        .transition()
        .duration(1000)
            .attr("cx", function(d) {return barX(d.value);})
            .attr("cy", function(d) {return barY(d.marker);})
            .attr("r", 8)
            .attr("fill", "#69b3a2")

    c2.exit().remove();

};


