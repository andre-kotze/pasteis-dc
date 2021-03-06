// The GET function to get the table jobs from the DB via the flask
function loadTable() {
  const xhttp = new XMLHttpRequest(); // The request
  xhttp.open("GET", "http://localhost:3080/vehicles"); // Gets the information from this port
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
        trHTML += '<td>'+object['capacity']+'</td>';
        trHTML += '<td>'+object['location']+'</td>';
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
      '<input id="create0" type="text" class="swal2-input" placeholder="Capacity">' +
      '<input id="create1" type="text" class="swal2-input" placeholder="Location">',
    focusConfirm: false,
    preConfirm: () => {
      Create();
    }
  })
}

// Gets the values introducted previously in the popup and posts them to the DB through the flask.
function Create() {
  // Constants for each value typed in the popup
  const capacity = document.getElementById("create0").value;
  const location = document.getElementById("create1").value;
  
  // The request
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3080/vehicles");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); //Specifies the format of the post
  xhttp.send(JSON.stringify([{ //The format of the JSON sended
    capacity:capacity, location:location,
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
        title: 'Select the vehicle to delete:',
        html:
          '<input id="delete_id" placeholder="Vehicle ID">' ,
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
  xhttp.open("DELETE", "http://localhost:3080/vehicles/"+id_to_delete, "_self"); // Adds the ID to the port link
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
      '<input id="edit_id" placeholder="Vehicle ID">' ,
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
  xhttp.open("GET", "http://localhost:3080/vehicles/"+id_to_edit, "_self");
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const object = JSON.parse(this.responseText);
     
        Swal.fire({
          width: 800,
          title: 'Edit order '+id_to_edit,
          html:
            '<div class="me-auto p-0 bd-highlight"><h5>Client ID:</div><input id="capacity" class="swal2-input half" value="'+object.capacity+'">' +
            '<div class="me-auto p-0 bd-highlight"><h5>Quantity:</div><input id="location" class="swal2-input half"value="'+object.location+'">' ,
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
  const capacity = document.getElementById("capacity").value;
  const location = document.getElementById("location").value;
    
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:3080/orders");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    id:id, capacity:capacity, location:location,
  }));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    }
  };
}