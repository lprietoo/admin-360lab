
//---------------------Variable------------------//
var token;
const userAuth = firebase.auth().currentUser; 

//----------------Autenticacion-------------------//

function crearUsuario(){
  var email = $('#usuarioEmail').val()
  var password = $('#usuarioContraseña').val()
  var rol = $('.form-check-input').val()
  console.log(rol)
  firebase.auth().createUserWithEmailAndPassword(email, password)

  .then((userCredential) => {
    var user = userCredential.user;
        
    db.collection("usuarios").doc(user.uid).set({

       email: user.email,
       rol: rol,
       laboratorio: lab,
      
    }).catch((error) => {
      console.error("no se pudo guardar el usuario en la bd", error);
    });

    alert("Usuario creado")

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("Error en la creación de usuario")
  });
}

// Muestra los usuarios en la tabla
// db.collection("usuarios").onSnapshot((querySnapshot)=> {
//   tableBody.innerHTML='';
//   querySnapshot.forEach((doc) => {
//     tableUser.innerHTML+=`
//     <tr>
//       <td>${doc.id}</td>
//       <td>${doc.data().email}</td>
//       <td>${doc.data().rol}</td>
//       <td>${doc.data().laboratorio}</td>
//       <td><button class="btn btn-danger" onclick="gestionarLab('${doc.id}')">Laboratorios</button></td>
//       <td><button class="btn btn-danger" onclick="editarUser('${doc.id}')">Editar Usuario</button></td>
//       <td><button class="btn btn-danger" onclick="eliminarUser('${doc.id}')">Eliminar Usuario</button></td>

//     </tr>`;
//   });
  
// });

// Elimina el token seleccionado en la tabla

// function eliminarUser(id){
//   userAuth.delete().then(() => {
//     db.collection("tokens").doc(id).delete().then(function() {
//       alert(`Usuario eliminado`)
//     }).catch(function(error){
//       alert(`No se pudo eliminar el usuario`)
//     });
//   })
 
// }



// Inicio de sesión admin

function signIn(){
  var email = $('#usuarioLogin').val()
  var password = $('#contraseñaLogin').val()
  firebase.auth().signInWithEmailAndPassword(email, password)

  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    location.href="/admin-360lab"
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    $("#loginError").removeClass("d-none")
  });
}

// Cierre de sesión admin

function logOut(){
  firebase.auth().signOut()
  .then( () => {
    location.href="/admin-360lab/login.html"
  }).catch((error) => {
    // var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
  });
}

// Verifica el estado de autenticación del usuario
// Si esta logueado ingresa de lo contrario solo mostrara el login
function observador() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        location.href="/admin-360lab/login.html"
      }
  });
}


// obtener información de usuario

// const user = firebase.auth().currentUser;
// if (user !== null){
//   console.log()
//   tableUser.innerHTML+=`
//     <tr>
//       <td>${user.email}</td>
//       <td>${user.password}</td>
//       <td><button class="btn btn-danger" onclick="eliminarUser('${user.uid}')">Eliminar</button></td>
//       <td><button class="btn btn-danger" onclick="eliminarUser('${user.uid}')">Eliminar</button></td>
//       <td><button class="btn btn-danger" onclick="eliminarUser('${user.uid}')">Eliminar</button></td>
//     </tr>`;

//     console.log(user.email)
// }



//-----------------Firestore---------------------//

// Guardar tokens en las colecciones "laboratorios" y "tokens"
function guardarToken() {

  var fechaCreacion = moment().format('YYYY/MM/DD hh:mm') // guarda fecha de creación
  var fechaExp = $('#datetime').val() // guarda fecha de expiración
  
  
  db.collection("tokens").doc(token).set({

      fechaCreacion: fechaCreacion,
      fechaExp: fechaExp,
      laboratorio: lab,
      
    }).then(function() {
      $("#btnGuardarToken").addClass("d-none")
      $("#tokenSucces").removeClass("d-none")
    })  
    .catch((error) => {
      console.error("Error ", error);
    });
}

// Muestra los tokens en la tabla
db.collection("tokens").onSnapshot((querySnapshot)=> {
  tableBody.innerHTML='';
  querySnapshot.forEach((doc) => {
    tableBody.innerHTML+=`
    <tr>
      <td>${doc.id}</td>
      <td>${doc.data().fechaCreacion}</td>
      <td>${doc.data().fechaExp}</td>
      <td>${doc.data().laboratorio}</td>
      <td><button class="btn btn-danger" onclick="eliminarToken('${doc.id}')">Eliminar</button></td>
    </tr>`;
  });
  
});

// Elimina el token seleccionado en la tabla

function eliminarToken(id){
  db.collection("tokens").doc(id).delete().then(function() {
    alert(`Token ${id} eliminado`)
  }).catch(function(error){
    alert(`No se pudo eliminar el token ${id}`)
  });
}