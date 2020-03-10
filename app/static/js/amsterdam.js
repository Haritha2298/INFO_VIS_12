

//MAPBOX.JS
mapboxgl.accessToken = 'pk.eyJ1Ijoibmlsc2xlaCIsImEiOiJjazczNHVscGwwOG12M3BqdDZieHJhMW82In0.c-i1H2T6u3vjmj4WY_D2mA'
    
//Setup mapbox-gl map
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [4.89, 52.366],
    //-0.1,51.5119112],
  zoom: 12,   
});

var draw = new MapboxDraw({ 
  displayControlsDefault: false,
  controls: {
    polygon: true,
    trash: true
  }
});

map.addControl(draw, 'top-left');

// function to add all the markers images
function loadIcons() {
  var icon_list = ['rail-11.png', 'metro-11.png', 'solar-11.png', 'trash-11.png'];
  icon_list.forEach(function(listItem){
    map.loadImage("/static/icons/" + listItem, function(error, image){
      if (error) throw error;
      var tag = listItem.replace('.png', '');
      map.addImage(tag, image);
    }
    );
  });
};

// when map loads add layers
map.on('load', function() {

  // Load missing marker images
  loadIcons();

  // add polygon neighborhoods outlines
  map.addSource('amsterdam-layer', {
    'type': 'geojson',
    'data': 'static/data/amsterdam.json',
  });
  map.addLayer({
    'id': 'amsterdam-layer',
    'type': 'fill',
    'source': 'amsterdam-layer',
    'layout': {
      'visibility': 'visible'
    },
    'paint': {
      'fill-color': 'rgba(3, 157, 252, 0.2)',
      'fill-outline-color': 'rgba(0, 0, 0, 1)'
    }
  });

  ///// Solar Panels //
  map.addSource('solarPoints', {
    'type': 'geojson',
    'data': 'static/data/solarPanels.json',
    'cluster': true,
    'clusterMaxZoom': 14,
    'clusterRadius': 50,
  });

  // clusters for solar points 
  map.addLayer({
    id: 'cluster-solarPanels',
    type: 'circle',
    source: 'solarPoints',
    filter: ['has', 'point_count'],
    layout: {
      'visibility': 'none',
    },
    paint:{
      'circle-color': [
        'step',
        ['get', 'point_count'],
        '#6C96F9',
        10,
        '#6C96F9',
        50,
        '#6C96F9'
      ],
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        5,10,
        10,50,
        20
      ]
    }
  });

  // cluster count number solar points
  map.addLayer({
    id: 'cluster-count-solarPanels',
    type: 'symbol',
    source: 'solarPoints',
    filter: ['has', 'point_count'],
    layout: {
      'visibility': 'none',
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 10
    }
  });

  // solar panels symbol itself
  map.addLayer({
  'id': 'solarPanels',
  'type': 'symbol',
  'source': 'solarPoints',
  'filter': ['!', ['has', 'point_count']],
  'layout': {
    'visibility': 'none',
    'icon-image': 'solar-11',
    'icon-allow-overlap': true
  },
  });

  ///// Metro Stops /////
  map.addSource('metroStops', {
    'type': 'geojson',
    'data': 'static/data/metro_stops.json',
  });
  map.addLayer({
  'id': 'metro_stops',
  'type': 'symbol',
  'source': 'metroStops',
  'layout': {
    'visibility': 'none',
    'icon-image': 'metro-11',
    'icon-allow-overlap': true
  },
  });

  ///// Sports Fields //////
  map.addSource('sports_field', {
    'type': 'geojson',
    'data': 'static/data/sports_field.json',
    'cluster': true,
    'clusterMaxZoom': 14,
    'clusterRadius': 100,
  });

  // clusters for sports fields
  map.addLayer({
    id: 'cluster-sports_field',
    type: 'circle',
    source: 'sports_field',
    layout: {
      'visibility': 'none',
    },
    paint: {
      'circle-color': [
        'step',
        ['get', 'point_count'],
        '#F99736',10,
        '#F99736',50,
        '#F99736'
      ],
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        5,10,
        10,50,
        20
      ]
    }
  });

  // cluster count number on sports fields
  map.addLayer({
    id: 'cluster-count-sports_field',
    type: 'symbol',
    source: 'sports_field',
    filter: ['has', 'point_count'],
    layout: {
      'visibility': 'none',
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 10
    }
  })

  // sports_field marker itself
  map.addLayer({
    'id': 'sports_field',
    'type': 'symbol',
    'source': 'sports_field',
    'filter': ['!', ['has', 'point_count']],
    'layout': {
      'visibility': 'none',
      'icon-image': 'basketball-11',
      'icon-allow-overlap': true
    },
  });

  ///// Trash Disposal /////
  map.addSource('trash', {
    'type': 'geojson',
    'data': 'static/data/trash.json',
    'cluster': true,
    'clusterMaxZoom': 14,
    'clusterRadius': 75,
  });

   // clusters for trash disposal
   map.addLayer({
    id: 'cluster-trash',
    type: 'circle',
    source: 'trash',
    layout: {
      'visibility': 'none',
    },
    paint: {
      'circle-color': [
        'step',
        ['get', 'point_count'],
        '#A4A7AA',10,
        '#A4A7AA',50,
        '#A4A7AA'
      ],
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        5,10,
        10,50,
        20
      ]
    }
  });

  // cluster count number on trash
  map.addLayer({
    id: 'cluster-count-trash',
    type: 'symbol',
    source: 'trash',
    filter: ['has', 'point_count'],
    layout: {
      'visibility': 'none',
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 10
    }
  })

  // trash marker itself
  map.addLayer({
    'id': 'trash',
    'type': 'symbol',
    'source': 'trash',
    'filter': ['!', ['has', 'point_count']],
    'layout': {
      'visibility': 'none',
      'icon-image': 'trash-11',
      'icon-allow-overlap': true
    },
  });

  ///// Trees /////
  map.addSource('tree', {
    'type': 'geojson',
    'data': 'static/data/tree.json',
    'cluster': true,
    'clusterMaxZoom': 14,
    'clusterRadius': 50,
  });

   // clusters for tree disposal
   map.addLayer({
    id: 'cluster-tree',
    type: 'circle',
    source: 'tree',
    layout: {
      'visibility': 'none',
    },
    paint: {
      'circle-color': [
        'step',
        ['get', 'point_count'],
        '#0CA21D',10,
        '#0CA21D',50,
        '#0CA21D'
      ],
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        5,10,
        10,50,
        20
      ]
    }
  });

  // cluster count number on tree
  map.addLayer({
    id: 'cluster-count-tree',
    type: 'symbol',
    source: 'tree',
    filter: ['has', 'point_count'],
    layout: {
      'visibility': 'none',
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 10
    }
  })

  // tree marker itself
  map.addLayer({
    'id': 'tree',
    'type': 'symbol',
    'source': 'tree',
    'filter': ['!', ['has', 'point_count']],
    'layout': {
      'visibility': 'none',
      'icon-image': 'park-11',
      'icon-allow-overlap': true
    },
  });

  ///// Tram Stops /////
  map.addSource('tram_stop', {
    'type': 'geojson',
    'data': 'static/data/tram_stop.json',
  });
  map.addLayer({
    'id': 'tram_stop',
    'type': 'symbol',
    'source': 'tram_stop',
    'layout': {
      'visibility': 'none',
      'icon-image': 'rail-11',
      'icon-allow-overlap': true
    },
  });

});


// add zooming controls
map.addControl(new mapboxgl.NavigationControl());
map.doubleClickZoom.disable();
map.scrollZoom.disable();

// change cursor when hovering over amsterdam neighborhoods
map.on('mouseenter', 'amsterdam-layer', function() {
  map.getCanvas().style.cursor = 'pointer';
});

// change cursor back to normal when not hovering over amsterdam neighborhoods
map.on('mouseleave', 'amsterdam-layer', function() {
  map.getCanvas().style.cursor = '';
}) ;

// Display coordinates with mouse hover
map.on('mousemove', function(e) {
  document.getElementById('cordInfo').innerHTML =
    JSON.stringify(e.point) + 
    '<br />' +
    JSON.stringify(e.lngLat.wrap());
});


// when dropdown selection is made, this function creates an object which contains counts per selection from dropdown
function createDrawnPolygon(dropdownSelection) {
  var data = draw.getAll();
  var complete_count = {};
  var complete_polygon_data = [];
  for (m=0; m<data.features.length; m++) {
    var polygonCoord = data.features[m].geometry.coordinates[0];
    var polygon = turf.polygon(
      [polygonCoord]
    );
    console.log('Polygon'+ m.toString());
    //complete_count['Polygon' + m.toString()] = countFeatures(polygon, dropdownSelection);
    complete_polygon_data.push(countFeatures(polygon, dropdownSelection));
  };
  console.log(complete_polygon_data);
  return complete_polygon_data;
};

// when neighborhood is clicked, this function creates and object containing the count for the neighborhood
function neighborhoodPolygon(coordinates, dropdownSelection, neighborhoodName) {
  console.log("Coordinates in neighborhood polygon");
  console.log(coordinates[0]);
  var complete_count = {};
  var hoodPolygon = turf.polygon(
    [coordinates[0]]
  );
  complete_count[neighborhoodName] = countFeatures(hoodPolygon, dropdownSelection);
  return complete_count;
};

// function to do the actual counting for neighborhoods and self drawn polygons
function countFeatures(polygon, selectedFeatures) {
  var key = selectedFeatures;
  var counts_array = [];
  var counts_object = {};
  selectedFeatures.forEach(function(listItem){
    d3.json("/static/data/" + listItem + ".json").then(function(data) {
      var markerWithin = turf.pointsWithinPolygon(data, polygon);
      //var item = {};
      var single_marker_count = {}
      single_marker_count['marker'] = listItem;
      single_marker_count['count'] = markerWithin.features.length;
      //counts_object[listItem] = markerWithin.features.length;
      //counts_array.push(markerWithin.features.length);
      counts_array.push(single_marker_count);  
    });
  });
  return counts_array
};


// gets the values from the dropdown menu
function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  console.log(options);
  var opt;
  for (var i=0; i<options.length; i++ ) {
    opt = options[i];
    if ( opt.selected ) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
};

// adjusts the layers specified in the dropdown
const availableOptions = ["solarPanels", "metro_stops", "sports_field", "trash", "tree", "tram_stop"];
const markersWithLayers = ["solarPanels","sports_field", "trash", "tree"]

function displayLayers (datasetList){
  let difference = availableOptions.filter(x => !datasetList.includes(x));

  // visibility for selected Layers
  for (var n=0; n < datasetList.length; n++)
  {
    selected_visible = datasetList[n];
    //var visibility = map.getLayoutProperty(selected_visible, 'visibility');

    // set the markers themselves to visible
    map.setLayoutProperty(selected_visible, 'visibility', 'visible');

    // set the cluster layers to visible for markers that have layers
    if (markersWithLayers.includes(selected_visible)){
      var cluster_count_visible = "cluster-count-" + selected_visible;
      var cluster_visible = "cluster-" + selected_visible;
      map.setLayoutProperty(cluster_count_visible, 'visibility', 'visible');
      map.setLayoutProperty(cluster_visible, 'visibility', 'visible');
    };
    
  };

  // all nont selected layers are set to none
  for (var j=0; j < difference.length; j++)
  {
    selected_not_visible = difference[j];

    // set the markers themselves to not visible
    map.setLayoutProperty(selected_not_visible, 'visibility', 'none');

    // set the cluster layers to not visible
    if (markersWithLayers.includes(selected_not_visible)){
      var cluster_count_not_visible = "cluster-count-" + selected_not_visible;
      var cluster_not_visible = "cluster-" + selected_not_visible;
      map.setLayoutProperty(cluster_count_not_visible, 'visibility', 'none');
      map.setLayoutProperty(cluster_not_visible, 'visibility', 'none');
    };

  }
};

/// function to remove all markers on click ///
// and function to change the text
var showHideButton = document.getElementById("showHideMarkers")
showHideButton.addEventListener('click', function() {
  var dropdownValues = document.getElementById('dropdown-menu');
  var dropdownDatasets = getSelectValues(dropdownValues);

  if (showHideButton.getAttribute("data-text-swap") == showHideButton.innerHTML){
    showHideButton.innerHTML = showHideButton.getAttribute("data-text-original");
    showHideLayers(dropdownDatasets, true);
  } else {
    showHideButton.setAttribute("data-text-original", showHideButton.innerHTML);
    showHideButton.innerHTML = showHideButton.getAttribute("data-text-swap");
    showHideLayers(dropdownDatasets, false);
  }
}, false);

function showHideLayers (datasetList, addOrRemove){

  if (addOrRemove === true){
    var visibility = 'visible';
  } else {
    var visibility = 'none';
  }

  for (var n=0; n < datasetList.length; n++)
  {
    selected_visible = datasetList[n];
    //var visibility = map.getLayoutProperty(selected_visible, 'visibility');

    // set the markers themselves to visible
    map.setLayoutProperty(selected_visible, 'visibility', visibility);

    // set the cluster layers to visible
    if (markersWithLayers.includes(selected_visible)){
      var cluster_count_visible = "cluster-count-" + selected_visible;
      var cluster_visible = "cluster-" + selected_visible;
      map.setLayoutProperty(cluster_count_visible, 'visibility', visibility);
      map.setLayoutProperty(cluster_visible, 'visibility', visibility);
    };

  };

}



////// POPUP FOR THE NEIGHBORHOOD WITH MODAL///////

map.on('dblclick', 'amsterdam-layer', function(e) {

  var coordinates = e.features[0].geometry.coordinates;
  var neighborhoodName = e.features[0].properties.name;
  
  var hoodModal = document.getElementById("neighborhood-modal");
  var hoodSpan = document.getElementById("neighborhoodX");

  var el = document.getElementById('dropdown-menu');
  var datasets = getSelectValues(el);
  var neighborhoodData = neighborhoodPolygon(coordinates, datasets, neighborhoodName);
  console.log(neighborhoodName);
  console.log(neighborhoodData);
  var dataObject = neighborhoodData[0];
  console.log("neighborhood[0]");
  console.log(JSON.stringify(dataObject));
  console.log("neighborhood[name][0]");
  var modal_output = JSON.stringify(dataObject[0]);
  console.log(modal_output);
  //open the modal
  hoodModal.style.display = "block";
  document.getElementById("neighborhood-body").innerHTML = "<p>" + modal_output + "</p>";

  // when user clicks X close the modal
  hoodSpan.onclick = function() {
    hoodModal.style.display = "none";
  };
  
  // when user clicks outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == hoodModal) {
      hoodModal.style.display = "none";
    }
  };
  
  // 
});


////// POPUP FOR THE POLYGON WITH MODAL///////

function openPolygonModal() {
  var polyModal = document.getElementById("polygon-modal");
  var polySpan = document.getElementById("polygonX");
  
  var el = document.getElementById('dropdown-menu');
  var datasets = getSelectValues(el);
  var drawPolygonData = createDrawnPolygon(datasets);
  //var modal_output = JSON.stringify(drawPolygonData.Polygon0);

  //open the modal
  polyModal.style.display = "block";

  // when user clicks X close the modal
  polySpan.onclick = function() {
    polyModal.style.display = "none";
  };
  
  // when user clicks outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == polyModal) {
      polyModal.style.display = "none";
    }
  };
  
  // call to function to send data to polygonModal.js
  //export {drawPolygonData};
  //var dataset_for_module = localStorage.setItem("polygonData", drawPolygonData);
  //window.completePolygonData = drawPolygonData;
  //localStorage.setItem("completePolygonData", drawPolygonData);
}


