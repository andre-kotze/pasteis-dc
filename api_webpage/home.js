
function ClientCreateBox() {
    Swal.fire({
      title: 'New Client',
      html:
        '<input id="id" type="hidden">' +
        '<input id="client_name" class="swal2-input" placeholder="Name of the Padaria">' +
        '<input id="adressline1" class="swal2-input" placeholder="Adress">' +
        '<input id="adressline2" class="swal2-input" placeholder="Adress">' +
        '<input id="city" class="swal2-input" placeholder="City">' +
        '<input id="postalcode" class="swal2-input" placeholder="Postal Code">' +
        '<input id="country" class="swal2-input" placeholder="Country">' +
        '<input id="password" class="swal2-input" placeholder="Password">' ,
      focusConfirm: false,
      preConfirm: () => {
        userCreate();
      }
    })
}
  
function saveUser() {
    const client_name = document.getElementById("client_name").value;
    const adressline1 = document.getElementById("adressline1").value;
    const adressline2 = document.getElementById("adressline2").value;
    const city = document.getElementById("city").value;
    const postalcode = document.getElementById("postalcode").value;
    const country = document.getElementById("country").value;
    const password = document.getElementById("password").value;
      
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3080/clients");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "id": id, "client_name": client_name, "adressline1": adressline1, "adressline2": adressline2, "city": city, 
      "postalcode": postalcode, "country": country, "nif": nif 
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      }
    };

    const yhttp = new XMLHttpRequest();
    yhttp.open("POST", "http://localhost:3080/pwdclients");
    yhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    yhttp.send(JSON.stringify({ 
      "password": password
    }));
    yhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      }
    };
}

function ClientLogInBox() {
  Swal.fire({
    title: 'Client Log In',
    html:
      '<input id="client_mail" class="swal2-input" placeholder="Email">' +
      '<input id="password" class="swal2-input" placeholder="Password">' ,
    focusConfirm: false,
    preConfirm: () => {
      userCreate();
    }
  })
}

function ClientLogIn(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3080/clients"+id);
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
          '<input id="email" class="swal2-input" placeholder="Email" value="'+user['email']+'">',
        focusConfirm: false,
        preConfirm: () => {
          userEdit();
        }
      })
    }
  };
  console.log(id);
  const yhttp = new XMLHttpRequest();
  yhttp.open("GET", "http://localhost:3080/pwdclients"+id);
  yhttp.send();
  yhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      const user = objects['user'];
      console.log(user);
      Swal.fire({
        title: 'Edit User',
        html:
          '<input id="id" type="hidden" value='+user['id']+'>' +
          '<input id="password" class="swal2-input" placeholder="Password" value="'+user['email']+'">',
        focusConfirm: false,
        preConfirm: () => {
          userEdit();
        }
      })
    }
  };
}

function ManagerLogInBox() {
  Swal.fire({
    title: 'Manager Log In',
    html:
      '<input id="master" class="swal2-input" placeholder="Master ID">' +
      '<input id="password" class="swal2-input" placeholder="Password">' ,
    focusConfirm: false,
    preConfirm: () => {
      userCreate();
    }
  })
}

function DelivererLogInBox() {
  Swal.fire({
    title: 'Deliverer Log In',
    html:
      '<input id="vehicleid" class="swal2-input" placeholder="Vehicle ID">' +
      '<input id="password" class="swal2-input" placeholder="Password">' ,
    focusConfirm: false,
    preConfirm: () => {
      userCreate();
    }
  })
}