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
        trHTML += '<td>'+object['client_name']+'</td>';
        trHTML += '<td>'+object['quantity']+'</td>';
        trHTML += '<td>'+object['status']+'</td>';
        trHTML += '<td>'+object['delivery_date']+'</td>';
        trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox('+object['id']+')">Edit</button>';
        trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete('+object['id']+')">Del</button></td>';
        trHTML += "</tr>";
      }
      document.getElementById("OrdersTable").innerHTML = trHTML;
    }
  };
}

loadTable();

function SearchFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("SearchByDate"); // Get what we search from what we write in the search bar
  filter = input.value.toUpperCase(); // To avoid upper-lower case problems
  table = document.getElementById("OrdersTable"); // Specify the table
  tr = table.getElementsByTagName("tr"); // Get elements from each row

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[4]; // Specify the column in wich we want to search
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


function showUserCreateBox() {
  Swal.fire({
    title: 'Create order',
    html:
      '<input id="id" type="hidden">' +
      '<input id="client_id" class="swal2-input" placeholder="Client ID">' +
      '<input id="quantity" class="swal2-input" placeholder="Quantity (in boxes)">' +
      '<input id="delivery_date" class="swal2-input" placeholder="Delivery date">' ,
    focusConfirm: false,
    preConfirm: () => {
      userCreate();
    }
  })
}

function userCreate() {
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
    
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3080/orders");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    "fname": fname, "lname": lname, "username": username, "email": email, 
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

function userDelete(id) {
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

function showUserEditBox(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3080/orders"+id);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      const user = objects['user'];
      console.log(user);
      Swal.fire({
        title: 'Edit User',
        html:
          '<input id="id" type="hidden" value='+user['id']+'>' +
          '<input id="fname" class="swal2-input" placeholder="First" value="'+user['fname']+'">' +
          '<input id="lname" class="swal2-input" placeholder="Last" value="'+user['lname']+'">' +
          '<input id="username" class="swal2-input" placeholder="Username" value="'+user['username']+'">' +
          '<input id="email" class="swal2-input" placeholder="Email" value="'+user['email']+'">',
        focusConfirm: false,
        preConfirm: () => {
          userEdit();
        }
      })
    }
  };
}

function userEdit() {
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