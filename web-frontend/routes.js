// refresh map to allow new layers to be loaded

function refreshMap() {
          // Creating map options
          var mapOptions = {
            center: [38.710905, -9.150467],
            zoom: 12
        }
        // Creating a map object
        var map = new L.map('map', mapOptions);
        
        // Creating a Layer object
        var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
        
        // Adding layer to the map
        map.addLayer(layer);      
}

// set clours of geometries according to the vehicle

function route_colours(feature) {
  switch (feature.properties.vehicle) {
    case 0: return {color: "#ff0000"};
    case 1: return {color: "#0000ff"};
    case 2: return {color: "#00ff00"};
    case 3: return {color: "#00ffff"};
    case 4: return {color: "#ffff00"}
 }
}

// load jobs from the DB according to the search date

function loadJobs() {
  const xhttp = new XMLHttpRequest();
  var date = document.getElementById("SearchByDate").value;
  
xhttp.open("GET", "http://localhost:3080/jobs/"+date, "_self");
xhttp.send();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
const objects = JSON.parse(this.responseText);
for (let object of objects) {
  var ft = L.geoJson(object,{
         pointToLayer: function(object, latlng){
           return L.circleMarker(latlng,{ 
         radius: 8,
         stroke: true,
         fillColor: route_colours(object)['color'],
         fillOpacity: 0.5})}
           });
           
  var strPopup = "<h5><b>ID: "+object.properties.id+"</b></h5><hr>";
              strPopup += "<h6><b>Vehicle:</b> "+object.properties.vehicle+"</h6>";
              strPopup += "<h6><b>Client Name:</b> "+object.properties.client_name+"</h6>";
              strPopup += "<h6><b>Address:</b> "+object.properties.address+"</h6>";
              strPopup += "<h6><b>Quantity:</b> "+object.properties.quantity+"</h6>";
              strPopup += "<h6><b>Date:</b> "+object.properties.delivery_date+"</h6>";
              strPopup += "<h6><b>Status:</b> "+object.properties.status+"</h6>";
  ft.addTo(map);
  ft.bindPopup(strPopup)};
}}
};

// load jobs from the DB according to the search date

function loadRoutes() {
    const xhttp = new XMLHttpRequest();
    var filter = document.getElementById("SearchByDate").value;
    
xhttp.open("GET", "http://localhost:3080/routes/"+filter, "_self");
xhttp.send();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
  const objects = JSON.parse(this.responseText);
  for (let object of objects) {
    var ft = L.geoJson(object, 
            route_colours(object)
     );
    var strPopup = "<h5><b>ID: "+object.properties.id+"</b></h5><hr>";
                strPopup += "<h6><b>Vehicle:</b> "+object.properties.vehicle+"</h6>";
                strPopup += "<h6><b>Capacity:</b> "+object.properties.capacity+"</h6>";
                strPopup += "<h6><b>Stops:</b> "+object.properties.stops+"</h6>";
                strPopup += "<h6><b>Packages:</b> "+object.properties.packages+"</h6>";
                strPopup += "<h6><b>Duration (sec):</b> "+object.properties.duration+"</h6>";
                strPopup += "<h6><b>Distance (m):</b> "+object.properties.distance+"</h6>";
                strPopup += "<h6><b>Date:</b> "+object.properties.delivery_date+"</h6>";
    ft.addTo(map);
    ft.bindPopup(strPopup);
    loadJobs()};
  }
}
};