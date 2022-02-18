function loadTable() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3080/jobs");
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var trHTML = ''; 
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        trHTML += '<tr>'; 
        trHTML += '<td>'+object['id']+'</td>';
        trHTML += '<td>'+object['client_id']+'</td>';
        trHTML += '<td>'+object['client_name']+'</td>';
        trHTML += '<td>'+object['quantity']+'</td>';
        trHTML += '<td>'+object['status']+'</td>';
        trHTML += '<td>'+object['delivery_date']+'</td>';
        trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showEditBox()">Edit</button>';
        trHTML += '<button type="button" class="btn btn-outline-danger" onclick="Delete('+object['id']+')">Del</button></td>';
        trHTML += "</tr>";
      }
      document.getElementById("Table").innerHTML = trHTML;
    }
  };
}

loadTable();

function OrderIdSearch() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("SearchByID"); // Get what we search from what we write in the search bar
  filter = input.value.toUpperCase(); // To avoid upper-lower case problems
  table = document.getElementById("Table"); // Specify the table
  tr = table.getElementsByTagName("tr"); // Get elements from each row

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0]; // Specify the column in wich we want to search
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

function filterClick() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("SearchByID"); // Get what we search from what we write in the search bar
  filter = input.value.toUpperCase(); // To avoid upper-lower case problems
  table = document.getElementById("Table"); // Specify the table
  var subjects = document.getElementById("subjects");
  var subject = subjects.options[subjects.selectedIndex].value;
  var colValue;
  if (subject == 'English') {
      colValue = 2;
  } else if (subject == 'Maths') {
      colValue = 3;
  } else if (subject == 'Science') {
      colValue = 4;
  } else if (subject == 'Social Science') {
      colValue = 5;
  }

  var modes = document.getElementsByName('mode');
  var mode;
  for (var i = 0; i < modes.length; i++) {
      if (modes[i].checked) {
          mode = modes[i].value;
          break;
      }
  }

  table = document.getElementById("StudentTable");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[colValue];
      tr[i].style.display = "none";
      var cellValue = parseInt(td.innerHTML);
      if (mode == 'above') {
          if (cellValue > parseInt(filter)) {
              tr[i].style.display = "";
          }
      } else if (mode == 'below') {
          if (cellValue < parseInt(filter)) {
              tr[i].style.display = "";
          }
      } else if (mode == 'between') {
          if (cellValue == parseInt(filter)) {
              tr[i].style.display = "";
          }
      }
  }
}

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

function Create() {
  const client_id = document.getElementById("create0").value;
  const quantity = document.getElementById("create1").value;
  const delivery_date = document.getElementById("create2").value;
    
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3080/orders");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify([{ 
    client_id:client_id, quantity:quantity, delivery_date:delivery_date
  }]));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    }
  };
}

function Delete(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:3080/orders");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    "id": id
  }));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    } 
  };
}

function showEditBox(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3080/jobs");
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      const user = objects['id'];
      Swal.fire({
        title: 'Edit Order',
        html:
          '<input id="id" value='+user['id']+'>' +
          '<input id="client_id" class="swal2-input" placeholder="Client ID" value="'+user['client_id']+'">' +
          '<input id="quantity" class="swal2-input" placeholder="Quantity" value="'+user['quantity']+'">' +
          '<input id="status" class="swal2-input" placeholder="Status" value="'+user['status']+'">' +
          '<input id="delivery_date" class="swal2-input" placeholder="Delivery Date" value="'+user['delivery_date']+'">',
        focusConfirm: false,
        preConfirm: () => {
          Edit();
        }
      })
    }
  };
}

function Edit() {
  const id = document.getElementById("id").value;
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
    
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:3080/orders");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    "id": id, "fname": fname, "lname": lname, "username": username, "email": email, 
    "avatar": "https://www.mecallapi.com/users/cat.png"
  }));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    }
  };
}