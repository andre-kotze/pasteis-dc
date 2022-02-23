// The GET function to get the table jobs from the DB via the flask
function loadTable() {
  const xhttp = new XMLHttpRequest(); // The request
  xhttp.open("GET", "http://localhost:3080/jobs"); // Gets the information from this port
  xhttp.send(); // Sends nothing back
  xhttp.onreadystatechange = function() { // Activtes every time the status of the request changes
    if (this.readyState == 4 && this.status == 200) { // Ready state 4 = done, request status 200 = success
      console.log(this.responseText); // Output a message to the web console, containing the text recieved from the request
      var trHTML = ''; // Defines the variable trHTML
      const objects = JSON.parse(this.responseText); // Constant that analyzes JSON objects, in this case our response
      for (let object of objects) {
        // For each row get all the columns
        trHTML += '<tr>'; 
        trHTML += '<td>'+object.properties['id']+'</td>';
        trHTML += '<td>'+object.properties['client_id']+'</td>';
        trHTML += '<td>'+object.properties['client_name']+'</td>';
        trHTML += '<td>'+object.properties['quantity']+'</td>';
        trHTML += '<td>'+object.properties['status']+'</td>';
        trHTML += '<td>'+object.properties['delivery_date']+'</td>';
        trHTML += "</tr>";
      }
      document.getElementById("Table").innerHTML = trHTML; // Place the values into the table so called Table
    }
  };
}

// Load the table :)
loadTable();

/*
// I'm still not working :(
  function myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("SearchByID");
    filter = input.value.toUpperCase();
    table = document.getElementById("Table");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

function SearchOrders() {

  const table = document.getElementById("Table");
  // save all tr
  const tr = table.getElementsByTagName("tr");

  var searchID = document.getElementById("SearchByID").value.toUpperCase();
  var searchCID = document.getElementById("SearchByCID").value.toUpperCase();
  var searchCN = document.getElementById("SearchByCN").value.toUpperCase();
  var searchD = document.getElementById("SearchByD").value.toUpperCase();
  var selectS = document.getElementById("selectST").value.toUpperCase();

  for (i = 1; i < tr.length; i++) {

    var rowID = tr[i].getElementsByTagName("Table")[0].textContent.toUpperCase();
    var rowCID = tr[i].getElementsByTagName("Table")[1].textContent.toUpperCase();
    var rowCN = tr[i].getElementsByTagName("Table")[2].textContent.toUpperCase();
    var rowQ = tr[i].getElementsByTagName("Table")[3].textContent.toUpperCase();
    var rowS = tr[i].getElementsByTagName("Table")[4].textContent.toUpperCase();
    var rowD = tr[i].getElementsByTagName("Table")[5].textContent.toUpperCase();

    var isDiplay = true;

    if (searchID != 'ALL' && rowID != searchID) {
      isDiplay = false;
    }
    if (searchCID != 'ALL' && rowCID != searchCID) {
      isDiplay = false;
    }
    if (searchCN != 'ALL' && rowCN != searchCN) {
      isDiplay = false;
    }
    if (searchD != 'ALL' && rowD != searchD) {
      isDiplay = false;
    }
    if (selectS != 'ALL' && rowS != selectS) {
      isDiplay = false;
    }
    
    if (isDiplay) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }

  }
}
*/
// Displays a popup with swal (sweet alert).
// When pressing the button it runs the create function.
function showCreateBox() {
  Swal.fire({
    title: 'Create order',
    html:
      '<input id="create0" type="number" class="swal2-input" placeholder="Client ID">' +
      '<input id="create1" type="number" class="swal2-input" placeholder="Quantity (in boxes)">' +
      '<input id="create2" type="date" class="swal2-input" placeholder="Delivery date">' ,
    focusConfirm: false,
    preConfirm: () => {
      Create();
    }
  })
}

// Gets the values introducted previously in the popup and posts them to the DB through the flask.
function Create() {
  // Constants for each value typed in the popup
  const client_id = document.getElementById("create0").value;
  const quantity = document.getElementById("create1").value;
  const delivery_date = document.getElementById("create2").value;
  
  // The request
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3080/orders");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); //Specifies the format of the post
  xhttp.send(JSON.stringify([{ //The format of the JSON sended
    client_id:client_id, quantity:quantity, delivery_date:delivery_date
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
        title: 'Select the order to delete:',
        html:
          '<input id="delete_id" placeholder="Order ID">' ,
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
  xhttp.open("DELETE", "http://localhost:3080/orders/"+id_to_delete, "_self"); // Adds the ID to the port link
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
      '<input id="edit_id" placeholder="Order ID">' ,
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
            '<div class="me-auto p-0 bd-highlight"><h2>Edit order: </div>' +
            '<div id="edit_id" class="me-auto p-0 bd-highlight"><h2>'+object.id+'</div>'+
            '<div class="me-auto p-0 bd-highlight"><h5>Client ID:</div>'+
            '<input id="client_id" class="swal2-input half" value="'+object.client_id+'">' +
            '<div class="me-auto p-0 bd-highlight"><h5>Quantity:</div>'+
            '<input id="quantity" class="swal2-input half"value="'+object.quantity+'">' +
            '<div class="me-auto p-0 bd-highlight"><h5>Date:</div> <input id="delivery_date" class="swal2-input half" value="'+object.delivery_date+'">',
        focusConfirm: false,
        preConfirm: () => {
          Edit();
        }
        })
      
    }
  };
}

// Posts the edited order to the database
function Edit(id) {
  const or_id = document.getElementById("edit_id").value;
  const client_id = document.getElementById("client_id").value;
  const quantity = document.getElementById("quantity").value;
  const delivery_date = document.getElementById("delivery_date").value;
    
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:3080/orders/"+or_id, "_self");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    client_id:client_id,quantity:quantity,delivery_date:delivery_date
  }));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    }
  };
}