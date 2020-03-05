

//MAPBOX.JS
mapboxgl.accessToken = 'pk.eyJ1Ijoibmlsc2xlaCIsImEiOiJjazczNHVscGwwOG12M3BqdDZieHJhMW82In0.c-i1H2T6u3vjmj4WY_D2mA'
    
//Setup mapbox-gl map
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [4.89, 52.366],
    //-0.1,51.5119112],
  zoom: 13.5,   
});

var draw = new MapboxDraw({ 
  displayControlsDefault: false,
  controls: {
    polygon: true,
    trash: true
  }
});

map.addControl(draw, 'top-left');

var turf_points = turf.points([
  [4.887, 52.3726],
  [4.892, 52.3722],
  [4.891, 52.3726],
  [4.889, 52.3722],
  [4.89, 52.3726]
]);

//try the addLayer method from mapbox
map.on('load', function() {

  // solar panels
  map.addSource('solarPoints', {
    'type': 'geojson',
    'data': 'static/data/solarPanels.json',
  });
  map.addLayer({
  'id': 'solarPoints',
  'type': 'symbol',
  'source': 'solarPoints',
  'layout': {
    'visibility': 'none',
    'icon-image': 'rocket-15',
    'icon-allow-overlap': true
  },
  });

  //Metro Stops
  map.addSource('metroStops', {
    'type': 'geojson',
    'data': 'static/data/metro_stops.json',
  });
  map.addLayer({
  'id': 'metroStops',
  'type': 'circle',
  'source': 'metroStops',
  'layout': {
    'visibility': 'none',
    //'icon-image': 'marker-15',
    //'icon-allow-overlap': true
  },
  'paint': {
    'circle-radius': 5,
    'circle-color': 'red',
    'circle-opacity': 1
  }
  });



  // Draw all points 
  map.addLayer({
    'id': 'turf_points',
    'type': 'symbol',
    'source': {
      'type': 'geojson',
      'data': turf_points
    },
    'layout': {
      //'icon-image': 'monument-15',
      'visibility': 'none',
      'icon-image': 'bicycle-15',
      'icon-allow-overlap': true
    }
    // ,
    // 'paint': {
    //   'circle-radius': 5,
    //   'circle-color': 'red',
    //   'circle-opacity': 1
    // }
  });

});



map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.disable();

// gget draw features to find the coordinates of the drawn polygon
map.on('draw.create', find_coordinates);

function find_coordinates() {
  var data = draw.getAll();
  console.log("Coordinates of drawn box are")
  console.log(data.features[0].geometry.coordinates[0]);
  var polygonCoord = data.features[0].geometry.coordinates[0];
  var polygon = turf.polygon(
    [polygonCoord]
  );
  d3.json('/static/data/solarPanels.json').then(function(data) {
    var solarCoord = data;
  
  console.log(solarCoord);
  var markerWithin = turf.pointsWithinPolygon(solarCoord, polygon);

  console.log("Found: " + markerWithin.features.length + " points");
  });
}

// gets the values from the dropdown menu
console.log("Before select vlaue function");
function getSelectValues(select) {
  console.log("Select Function called");
  console.log(select);
  var result = [];
  var options = select && select.options;
  console.log(options);
  var opt;
  for (var i=0, iLen=options.length; i<iLen; i++ ) {
    opt = options[i];
    if ( opt.selected ) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
};

// adjusts the layers specified in the dropdown
const availableOptions = ["turf_points", "solarPoints", "metroStops"];

function displayLayers (datasetList){
  let difference = availableOptions.filter(x => !datasetList.includes(x));

  console.log(datasetList)

  // visibility for selected Layers
  for (var i=0; i < datasetList.length; i++)
  {
    selected_visible = datasetList[i];
    //var visibility = map.getLayoutProperty(selected_visible, 'visibility');
    map.setLayoutProperty(selected_visible, 'visibility', 'visible');
    // if(visibility === 'visible') {
    //   map.setLayoutProperty(selected_id, 'visibility', 'none');
    // }
    //  else {
    //   map.setLayoutProperty(selected_id, 'visibility', 'visible')
    // }
  };

  // all nont selected layers are set to none
  for (var j=0; j < difference.length; j++)
  {
    selected_not_visible = difference[j];
    map.setLayoutProperty(selected_not_visible, 'visibility', 'none');
  }
  console.log("Finished Display Layers");
};













// Display coordinates with mouse hover
map.on('mousemove', function(e) {
  document.getElementById('cordInfo').innerHTML =
    JSON.stringify(e.point) + 
    '<br />' +
    JSON.stringify(e.lngLat.wrap());
});











/////// Load data from csv file /////
// // Setup our svg layer that we can manipulate with d3
// var container = map.getCanvasContainer()
// var svg = d3.select(container).append("svg").attr("width", 700).attr("height", 600)

// function project(d) {
//   console.log("project function is called");
//   return map.project(getLL(d));
// }
// function getLL(d) {
//   return new mapboxgl.LngLat(+d.lon, +d.lat);
// }


// // 522, 353
// // var single_dot = svg.selectAll("circle").attr("r", 20).attr("cx", 522).attr("cy", 353).style({
// //   fill: "#0082a3"
// //   });

// // "/static/testDots.csv"
// d3.csv("/static/testDots.csv").then(function(data) {
//   console.log("File is found")
//   console.log(data)
//   console.log("File should have been found")
//   var dots = svg.selectAll("circle");

//   dots = dots.data(data).enter().append("circle").attr("class", "dot")
//   dots
//   .attr("r", 10)
//   .style({
//     fill: "#0082a3"
//     });

//     function render() {
//       console.log("Render function is called");
//       dots
//       .attr("cx", function(d) {
//         var x = project(d).x;
//         console.log(x)
//         return x
//       })
//       .attr("cy", function(d) {
//         var y = project(d).y;
//         console.log(y)
//         return y
//       })
//     }

//     // re-render viz when view changes
//     map.on("viewreset", function() {
//       render()
//     })
//     map.on("move", function() {
//       render()
//     })

//     // render initial viz
//     render()
//   })
//   .catch(function(error){
//     // handle error if it is caught
//     if (error){
//       console.log(error)  
//     }  
//   })





  // if(data.length === 0){
  //   console.log("File empty")
  // }
  //console.log("error:", error)
  
//var marker = new mapboxgl.Marker().setLngLat([4.8950, 52.37]).addTo(map);

// // add svg element to leaflet overlay pane
// var svg = d3.select(map.getPanes().overlayPane).append("svg");

// var g = svg.append("g").attr("class", "leaflet-zoom-hide");

// // attempt to put a layer on the map with amsterdam geo json file
// // // put geoJson of Amsterdam over it
// // d3.json("amsterdam.json", function(error, collection) {
// //     if (error) throw error;
// // })

// // // function to render d3 polygon to leaflet polygon
// // function projectPoint(x, y) {
// //     var point = map.latLngToLayerPoint(new L.LatLng(y, x));
// //     this.stream.point(point.x, point.y);
// // }

// // // convert geoJSON to svg
// // var transform = d3.geo.transform({point, projectPoint}),
// //     path = d3.geo.path().projection(transform);

// // var feature = g.selectAll("path")
// //     .data(collection.features)
// //     .enter().append("path");

// // feature.attr("d", path);

// // var bounds = path.bounds(collection),
// //     topLeft = bounds[0],
// //     bottomRight = bounds[1];

// // // set dimension of svg
// // svg.attr("width", bottomRight[0] - topLeft[0])
// //    .attr("height", bottomRight[1] - topLeft[1])
// //    .style("left", topLeft[0] + "px")
// //    .style("top", topLeft[1] + "px");

// // g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

// // create a fisheye distortion as magnifying glass
// var fisheye = d3.fisheye.circular()
//     .radius(100)
//     .distortion(5);

// var lens = svg.append('circle')
//     .attr('class', 'lens')
//     .attr('fill-opacity', 0.1)
//     .attr('r', fisheye.radius());

// // set bounds of svg
// svg .attr("width", 1300)
//     .attr("height", 650)
//     //.style("left", topLeft[0] + "px")
//     //.style("top", topLeft[1] + "px");

// g   .attr("transform", "translate(" + 650 + "," + 1108 + ")");



// // on mousemove move the fisheye over map
// svg.on('mousemove', function() {
//     fisheye.focus(d3.mouse(this));

//     const mouseX = d3.mouse(this)[0];
//     const mouseY = d3.mouse(this)[1];
//     const r = fisheye.radius();

//     lens.attr('cx', mouseX)
//         .attr('cy', mouseY)
// });


