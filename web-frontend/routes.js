function loadRoutes() {
    const xhttp = new XMLHttpRequest();
xhttp.open("GET", "http://localhost:3080/routes");
xhttp.send();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
  const objects = JSON.parse(this.responseText);
  for (let object of objects) {
    var ft = L.geoJson(object, {
            style: function(feature) {
              switch (feature.properties.vehicle) {
                case 0: return {color: "#ff0000"};
                case 1: return {color: "#0000ff"};
                case 2: return {color: "#00ff00"};
                case 3: return {color: "#0000f0"};
                case 4: return {color: "#f00000"}
             }
           }
     });
    var strPopup = "<h5><b>ID: "+object.properties.id+"</b></h5><hr>";
                strPopup += "<h6><b>Vehicle:</b> "+object.properties.vehicle+"</h6>";
                strPopup += "<h6><b>Capacity:</b> "+object.properties.capacity+"</h6>";
                strPopup += "<h6><b>Stops:</b> "+object.properties.stops+"</h6>";
                strPopup += "<h6><b>Packages:</b> "+object.properties.packages+"</h6>";
                strPopup += "<h6><b>Duration (sec):</b> "+object.properties.duration+"</h6>";
                strPopup += "<h6><b>Distance (m):</b> "+object.properties.distance+"</h6>";
                strPopup += "<h6><b>Date:</b> "+object.properties.to_limit+"</h6>";
    ft.addTo(map);
    ft.bindPopup(strPopup)};
  }
}
};