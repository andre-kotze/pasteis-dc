// The GET function to get the table jobs from the DB via the flask
function loadTable() {
  const xhttp = new XMLHttpRequest(); // The request
  xhttp.open("GET", "http://localhost:3080/warehouses"); // Gets the information from this port
  xhttp.send(); // Sends nothing back
  xhttp.onreadystatechange = function() { // Activtes every time the status of the request changes
    if (this.readyState == 4 && this.status == 200) { // Ready state 4 = done, request status 200 = success
      console.log(this.responseText); // Output a message to the web console, containing the text recieved from the request
      var trHTML = ''; // Defines the variable trHTML
      const objects = JSON.parse(this.responseText); // Constant that analyzes JSON objects, in this case our response
      for (let object of objects) {
        // For each row get all the columns
        trHTML += '<tr>'; 
        trHTML += '<td>'+object['id']+'</td>';
        trHTML += '<td>'+object['name']+'</td>';
        trHTML += '<td>'+object['stock']+'</td>';
        trHTML += '<td>'+object['addressline1']+', '+object['addressline2']+'</td>';
        trHTML += '<td>'+object['postalcode']+'</td>';
        trHTML += "</tr>";
      }
      document.getElementById("Table").innerHTML = trHTML; // Place the values into the table so called Table
    }
  };
}

// Load the table :)
loadTable();


// I'm still not working :(
function SearchOrders() {

  var searchID = document.getElementById("SearchByID").value.toUpperCase();
  var searchCID = document.getElementById("SearchByCID").value.toUpperCase();
  var searchCN = document.getElementById("SearchByCN").value.toUpperCase();
  var searchD = document.getElementById("SearchByD").value.toUpperCase();
  var selectS = document.getElementById("SelectST").value.toUpperCase();

  for (i = 1; i < tr.length; i++) {

    var rowID = tr[i].getElementsByTagName("Table")[0].textContent.toUpperCase();
    var rowCID = tr[i].getElementsByTagName("Table")[1].textContent.toUpperCase();
    var rowCN = tr[i].getElementsByTagName("Table")[2].textContent.toUpperCase();
    var rowQ = tr[i].getElementsByTagName("Table")[3].textContent.toUpperCase();
    var rowS = tr[i].getElementsByTagName("Table")[4].textContent.toUpperCase();
    var rowD = tr[i].getElementsByTagName("Table")[5].textContent.toUpperCase();

    var isDiplay = true;

    if ((searchID != 'ALL' && rowID != searchID) || (searchID == null)) {
      isDiplay = false;
    }
    if ((searchCID != 'ALL' && rowCID != searchCID) || (searchCID == null)) {
      isDiplay = false;
    }
    if ((searchCN != 'ALL' && rowCN != searchCN) || (searchCN == null)) {
      isDiplay = false;
    }
    if ((searchD != 'ALL' && rowD != searchD) || (searchD == null)) {
      isDiplay = false;
    }
    if ((selectS != 'ALL' && rowS != selectS) || (selectS == null)) {
      isDiplay = false;
    }
    
    if (isDiplay) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }

  }
}

// Displays a popup with swal (sweet alert).
// When pressing the button it runs the create function.
function showCreateBox() {
  Swal.fire({
    title: 'Create a new client',
    html:
      '<input id="create0" type="text" class="swal2-input" placeholder="Warehouse Name">' +
      '<input id="create1" type="text" class="swal2-input" placeholder="Adress">' +
      '<input id="create2" type="text" class="swal2-input" placeholder="Adress">' +
      '<input id="create3" type="text" class="swal2-input" placeholder="Postal code">' +
      '<input id="create4" type="text" class="swal2-input" placeholder="City">' +
      '<input id="create5" type="text" class="swal2-input" placeholder="Country">' +
      '<input id="create6" type="text" class="swal2-input" placeholder="Geometry (encoded polyline 5)">' +
      '<input id="create7" type="text" class="swal2-input" placeholder="Initial stock">' ,
    focusConfirm: false,
    preConfirm: () => {
      Create();
    }
  })
}

// Gets the values introducted previously in the popup and posts them to the DB through the flask.
function Create() {
  // Constants for each value typed in the popup
  const name = document.getElementById("create0").value;
  const addressline1 = document.getElementById("create1").value;
  const addressline2 = document.getElementById("create2").value;
  const postalcode = document.getElementById("create3").value;
  const city = document.getElementById("create4").value;
  const country = document.getElementById("create5").value;
  const geom = document.getElementById("create6").value;
  const stock = document.getElementById("create7").value;
  
  // The request
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3080/clients");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); //Specifies the format of the post
  xhttp.send(JSON.stringify([{ //The format of the JSON sended
    client_name:client_name, addressline1:addressline1, addressline2:addressline2, city:city, country:country, postalcode:postalcode, geom:geom, stock:stock
  }]));
  // When the request and the function succeed, it stops.
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
    }
  };
}

// Displays the popup asking for the order ID to delete
function showDeleteBox() {
      Swal.fire({
        title: 'Select the warehouse to delete:',
        html:
          '<input id="delete_id" placeholder="Warehouse ID">' ,
        focusConfirm: false,
        preConfirm: () => {
          Delete();
        }
      })
  
}

// Gets the ID specified previously and deletes it from the DB
function Delete(id) {
  var id_to_delete = document.getElementById("delete_id").value;
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:3080/warehouses/"+id_to_delete, "_self"); // Adds the ID to the port link
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({}));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    } 
  };
}

// Displays the popup asking for the order ID to edit
function showEditBox() {
  Swal.fire({
    title: 'Select the order to edit:',
    html:
      '<input id="edit_id" placeholder="Client ID">' ,
    focusConfirm: false,
    preConfirm: () => {
      SecondEditBox();
    }
  })

}

// Gets the values attached to the selected order
// Shows them in editable boxes for us to edit them
function SecondEditBox(id) {
  var id_to_edit = document.getElementById("edit_id").value;
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3080/orders/"+id_to_edit, "_self");
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const object = JSON.parse(this.responseText);
     
        Swal.fire({
          width: 800,
          title: 'Edit order '+id_to_edit,
          html:
            '<div class="me-auto p-0 bd-highlight"><h5>Client ID:</div><input id="client_name" class="swal2-input half" value="'+object.client_name+'">' +
            '<div class="me-auto p-0 bd-highlight"><h5>Quantity:</div><input id="adline1" class="swal2-input half"value="'+object.addressline1+'">' +
            '<div class="me-auto p-0 bd-highlight"><h5>Date:</div> <input id="adline2" class="swal2-input half" value="'+object.addressline2+'">'+
            '<div class="me-auto p-0 bd-highlight"><h5>Client ID:</div><input id="city" class="swal2-input half" value="'+object.city+'">' +
            '<div class="me-auto p-0 bd-highlight"><h5>Quantity:</div><input id="pcode" class="swal2-input half"value="'+object.postalcode+'">' +
            '<div class="me-auto p-0 bd-highlight"><h5>Quantity:</div><input id="country" class="swal2-input half"value="'+object.country+'">' +
            '<div class="me-auto p-0 bd-highlight"><h5>Date:</div> <input id="geom" class="swal2-input half" value="'+object.geom+'">',
        focusConfirm: false,
        preConfirm: () => {
          Edit();
        }
        })
      
    }
  };
}

// Puts the edited order to the database
function Edit(client) {
  const id = document.getElementById("edit_id").value;
  const client_name = document.getElementById("client_name").value;
  const addressline1 = document.getElementById("adline1").value;
  const addressline2 = document.getElementById("adline2").value;
  const city = document.getElementById("city").value;
  const postalcode = document.getElementById("pcode").value;
  const country = document.getElementById("country").value;
  const geom = document.getElementById("geom").value;
    
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:3080/orders");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    id:id, client_name:client_name, addressline1:addressline1, addressline2:addressline2, postalcode:postalcode, city:city, country:country, geom:geom,
  }));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    }
  };
}