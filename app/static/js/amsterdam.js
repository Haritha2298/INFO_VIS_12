//MAPBOX TOKEN
mapboxgl.accessToken = 'pk.eyJ1Ijoibmlsc2xlaCIsImEiOiJjazczNHVscGwwOG12M3BqdDZieHJhMW82In0.c-i1H2T6u3vjmj4WY_D2mA'
    
//Setup mapbox-gl map
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [4.89, 52.366],
    //-0.1,51.5119112],
  zoom: 12,   
});

// function to add all the markers images
function loadIcons() {
  var icon_list = ['rail-11.png', 'metro-11.png', 'solar-11.png', 'trash-11.png', 'camera-15.png'];
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
      'fill-color': 'rgba(173,216,230, 0.4)',
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
        '#1f78b4',
        10,
        '#1f78b4',
        50,
        '#1f78b4'
      ],
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        10,10,
        14,50,
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
        '#fb9a99',10,
        '#fb9a99',50,
        '#fb9a99'
      ],
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        10,10,
        14,50,
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
        '#a6cee3',10,
        '#a6cee3',50,
        '#a6cee3'
      ],
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        10,10,
        14,50,
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

   // clusters for tree
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
        '#33a02c',10,
        '#33a02c',50,
        '#33a02c'
      ],
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        10,10,
        14,50,
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


  ///// Playgrounds /////
  map.addSource('playground', {
    'type': 'geojson',
    'data': 'static/data/playground.json',
    'cluster': true,
    'clusterMaxZoom': 14,
    'clusterRadius': 50,
  });
  map.addLayer({
    id: 'cluster-playground',
    type: 'circle',
    source: 'playground',
    filter: ['has', 'point_count'],
    layout: {
      'visibility': 'none'
    },
    paint: {
      'circle-color': [
        'step',
        ['get', 'point_count'],
        '#fdbf6f',
        5,
        '#fdbf6f',
        25,
        '#fdbf6f'
      ],
      'circle-radius':[
        'step',
        ['get', 'point_count'],
        10,5,
        14,25,
        20
      ]

    }
  });

  map.addLayer({
    id: 'cluster-count-playground',
    type: 'symbol',
    source: 'playground',
    filter: ['has', 'point_count'],
    layout: {
      'visibility': 'none',
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 10
    }
  });

  map.addLayer({
    'id': 'playground',
    'type': 'symbol',
    'source': 'playground',
    'layout': {
      'visibility': 'none',
      'icon-image': 'playground-15',
      'icon-allow-overlap': true
    },
  });

  ///// Panorama Pictures ////
  map.addSource('panoramas', {
    'type': 'geojson',
    'data': 'static/data/panoramas.json',
    'cluster': false,
    'clusterMaxZoom': 14,
    'clusterRadius': 50,
  });

  // clusteer for pictures
  map.addLayer({
    id: 'cluster-panoramas',
    type: 'circle',
    source: 'panoramas',
    filter: ['has', 'point_count'],
    layout: {
      'visibility': 'none',
    },
    paint: {
      'circle-color': [
        'step',
        ['get', 'point_count'],
        '#898B8F',
        10,
        '#898B8F',
        50,
        '#898B8F'
      ],
      'circle-radius':[
        'step',
        ['get', 'point_count'],
        10,10,
        14,50,
        20
      ]
    }
  });

  // cluster count number panoramas
  map.addLayer({
    id: 'cluster-count-panoramas',
    type: 'symbol',
    source: 'panoramas',
    filter: ['has', 'point_count'],
    layout: {
      'visibility': 'none',
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 10
    }
  });

  map.addLayer({
    'id': 'panoramas',
    'type': 'symbol',
    'source': 'panoramas',
    'filter': ['!', ['has', 'point_count']],
    'layout':  {
      'visibility': 'none',
      'icon-image': 'camera-15',
      'icon-allow-overlap': true
    },
  })

});

// change cursor when hovering over amsterdam neighborhoods
map.on('mouseenter', 'amsterdam-layer', function() {
  map.getCanvas().style.cursor = 'pointer';
});

// change cursor back to normal when not hovering over amsterdam neighborhoods
map.on('mouseleave', 'amsterdam-layer', function() {
  map.getCanvas().style.cursor = '';
}) ;

var complete_polygon_data = [];
// when dropdown selection is made, this function creates an object which contains counts per selection from dropdown
function createDrawnPolygon(dropdownSelection) {
  var data = draw.getAll();
  var complete_count = {};
  //var complete_polygon_data = [];
  complete_polygon_data.length = 0;
  for (m=0; m<data.features.length; m++) {
    var polygonCoord = data.features[m].geometry.coordinates[0];
    var polygon = turf.polygon(
      [polygonCoord]
    );
    // console.log('Polygon'+ m.toString());
    // complete_count['Polygon' + m.toString()] = countFeatures(polygon, dropdownSelection);
    complete_polygon_data.push(countFeatures(polygon, dropdownSelection));
    console.log(complete_polygon_data);
  };
  console.log(complete_polygon_data);
  //return complete_polygon_data;
  return 0;
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
      var single_marker_count = {};
      single_marker_count['marker'] = listItem;
      single_marker_count['count'] = markerWithin.features.length;
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
const availableOptions = ["solarPanels", "metro_stops", "sports_field", "trash", "tree", "tram_stop", "playground"];
const markersWithClusters = ["solarPanels","sports_field", "trash", "tree"]

function displayLayers (datasetList){
  let difference = availableOptions.filter(x => !datasetList.includes(x));

  // visibility for selected Layers
  for (var n=0; n < datasetList.length; n++)
  {
    selected_visible = datasetList[n];

    // set the markers themselves to visible
    console.log(selected_visible);
    map.setLayoutProperty(selected_visible, 'visibility', 'visible');

    // set the cluster layers to visible for markers that have layers
    if (markersWithClusters.includes(selected_visible)){
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
    if (markersWithClusters.includes(selected_not_visible)){
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
    map.setLayoutProperty("panoramas", 'visibility', 'none');
    map.setLayoutProperty("cluster-panoramas", 'visibility', 'none');
    map.setLayoutProperty("cluster-count-panoramas", 'visibility', 'none');
  } else {
    showHideButton.setAttribute("data-text-original", showHideButton.innerHTML);
    showHideButton.innerHTML = showHideButton.getAttribute("data-text-swap");
    showHideLayers(dropdownDatasets, false);
    map.setLayoutProperty("panoramas", 'visibility', 'visible');
    map.setLayoutProperty("cluster-panoramas", 'visibility', 'visible');
    map.setLayoutProperty("cluster-count-panoramas", 'visibility', 'visible');
  }
}, false);

// make marker layers visible or invisible
function showHideLayers (datasetList, addOrRemove){

  if (addOrRemove === true){
    var visibility = 'visible';
  } else {
    var visibility = 'none';
  }

  for (var n=0; n < datasetList.length; n++)
  {
    selected_visible = datasetList[n];

    // set the markers themselves to visible
    map.setLayoutProperty(selected_visible, 'visibility', visibility);

    // set the cluster layers to visible
    if (markersWithClusters.includes(selected_visible)){
      var cluster_count_visible = "cluster-count-" + selected_visible;
      var cluster_visible = "cluster-" + selected_visible;
      map.setLayoutProperty(cluster_count_visible, 'visibility', visibility);
      map.setLayoutProperty(cluster_visible, 'visibility', visibility);
    };

  };

}

// open up panorama picture on clicking the camera icon
map.on('click', 'panoramas', function(e) {
  var panoCoords = e.features[0].geometry.coordinates.slice();
  var panoURL = e.features[0].properties['img_url'];
  var panoDescription = e.features[0].properties['neighbourhood'];

  var panoModal = document.getElementById("panoModal");
  var span = document.getElementById("panoClose");

  // set the title of the box
  document.getElementById("panoTitle").innerHTML = "Neighborhood: " + panoDescription;

  // set the picture
  document.getElementById("panoUrl").src = panoURL;

  // open the modal on click
  panoModal.style.display = "block";

  // When clicking x close the box
  span.onclick = function() {
    panoModal.style.display = "none";
  }

  // when clicking anywhere outside the box close it
  window.onclick = function(event) {
    if(event.target == panoModal) {
      panoModal.style.display = "none";
    }
  }

});



