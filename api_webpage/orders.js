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
        trHTML += "</tr>";
      }
      document.getElementById("Table").innerHTML = trHTML;
    }
  };
}

loadTable();

function SearchOrders() {

  var searchID = document.getElementById("SearchByID").value.toUpperCase();
  var searchCID = document.getElementById("SearchByCID").value.toUpperCase();
  var searchCN = document.getElementById("SearchByCN").value.toUpperCase();
  var searchD = document.getElementById("SearchByD").value.toUpperCase();
  var selectS = document.getElementById("SelectST").value.toUpperCase();
  var quanlow = document.getElementById("LowTreshold").value.toUpperCase();
  var quanhigh = document.getElementById("HighTreshold").value.toUpperCase();

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

function Delete(id) {
  var id_to_delete = document.getElementById("delete_id").value;
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:3080/orders/"+id_to_delete, "_self");
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

function SecondEditBox(id) {
  var id_to_edit = document.getElementById("edit_id").value;
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3080/orders/"+id_to_edit, "_self");
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      const user = objects['id'];
      Swal.fire({
        title: 'Edit order '+id_to_edit,
        html:
          '<input id="client_id" class="swal2-input" value="'+id_to_edit,'">' +
          '<input id="client_id" class="swal2-input" value="'+user['client_id']+'">' +
          '<input id="quantity" class="swal2-input"value="'+user['quantity']+'">' +
          '<input id="delivery_date" class="swal2-input" value="'+user['delivery_date']+'">',
        focusConfirm: false,
        preConfirm: () => {
          Edit();
        }
      })
    }
  };
}

function Edit() {
  const or_id = document.getElementById("client_id").value;
  const cl_id = document.getElementById("order_id").value;
  const stat = document.getElementById("quantity").value;
  const date = document.getElementById("delivery_date").value;
    
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:3080/orders");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    or_id:or_id,cl_id:cl_id,stat:stat,date:date
  }));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    }
  };
}