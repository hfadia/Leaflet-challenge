// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

let myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3,
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// base layer
let baseMaps = {
    Topography: topo
};

// Add the layer control to the map.
L.control.layers(baseMaps).addTo(myMap);

// create a marker
let marker = L.marker([15.5994, -28.6731], {
    draggable: true,
    title: "earthquake"
}).addTo(myMap);

// Binding a popup to marker
marker.bindPopup("Earthquake");

function styleInfo(feature) {
        return {
            color: "red",
            fillOpacity: 0.5,
            radius: getRadius(feature.properties.mag),
            weight: 1.5,
            fillColor: getColor(feature.geometry.coordinates[2])
        };  

}

function getColor(depth) {
    if (depth > 10.0) return "red"
    if (depth > 7.5) return "yellow"
    if (depth > 5) return "blue"
    return "green"

}

function getRadius(mag) {
    if (mag > 10.0) return 50
    if (mag > 7.5) return 30
    if (mag > 5) return 10
    return 7


}

// Use this link to get the GeoJSON data.
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// Getting our GeoJSON data
d3.json(link).then(function (data) {
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
        style: styleInfo,
        

        pointToLayer: function (feature, latlng) { return L.circleMarker(latlng) },


        // on each feature
        onEachFeature: function (feature, layer) {

            // Giving each feature a popup with information that’s relevant to it
            layer.bindPopup("<h1>" + feature.properties.place);
        }
    }).addTo(myMap);
});

// Loop through the cities array, and create one marker for each city object.
// for (let i = 0; i < features.length; i++) {

//     // Conditionals for country gdp_pc
//     let color = "";
//     if (features.mag > 10.0) {
//       color = "red";
//     }
//     else if (features.mag > 7.5) {
//       color = "yellow";
//     }
//     else if (features.mag > 5.0) {
//       color = "blue";
//     }
//     else {
//       color = "green";
//     }

//     // Add circles to the map.
//     L.circle(features[i].places, {
//       fillOpacity: 0.75,
//       color: "white",
//       fillColor: color,
//       // Adjust the radius.
//       radius: Math.sqrt(features.mag) * 500
//     }).bindPopup(`<h1>${features.mag}</h1> <hr> <h3>mag of Earthquake: ${features.mag}</h3>`).addTo(myMap);
//   }
